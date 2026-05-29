import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawn } from 'node:child_process';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9337;
const targetUrl = process.env.SITE_URL || 'http://127.0.0.1:5173/';
const outputDir = resolve('screenshots');

const viewports = [
  { name: 'home-desktop', width: 1440, height: 1000, mobile: false, deviceScaleFactor: 1 },
  { name: 'home-mobile', width: 390, height: 1200, mobile: true, deviceScaleFactor: 2 },
];

let browserProcess;
let profileDir;

try {
  await mkdir(outputDir, { recursive: true });
  profileDir = await mkdtemp(join(tmpdir(), 'aurelian-edge-'));
  browserProcess = spawn(edgePath, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profileDir}`,
    'about:blank',
  ], {
    stdio: 'ignore',
  });

  await waitForDebugger();

  for (const viewport of viewports) {
    const page = await createPage();
    const client = await connectCdp(page.webSocketDebuggerUrl);

    await client.send('Page.enable');
    await client.send('Runtime.enable');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: viewport.deviceScaleFactor,
      mobile: viewport.mobile,
    });
    await client.send('Page.navigate', { url: targetUrl });
    await client.waitFor('Page.loadEventFired', 15000);
    await sleep(800);

    const metrics = await client.send('Runtime.evaluate', {
      expression: `({
        width: window.innerWidth,
        height: window.innerHeight,
        scrollWidth: document.documentElement.scrollWidth,
        title: document.title
      })`,
      returnByValue: true,
    });

    const screenshot = await client.send('Page.captureScreenshot', {
      format: 'png',
      fromSurface: true,
      captureBeyondViewport: false,
    });

    const filePath = join(outputDir, `${viewport.name}.png`);
    await writeFile(filePath, Buffer.from(screenshot.data, 'base64'));
    console.log(`${viewport.name}: ${filePath}`);
    console.log(JSON.stringify(metrics.result.value));
    client.close();
  }
} finally {
  if (browserProcess) {
    browserProcess.kill();
  }
  if (profileDir) {
    await sleep(1000);
    await rm(profileDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 250 }).catch(() => {});
  }
}

async function waitForDebugger() {
  const started = Date.now();
  while (Date.now() - started < 15000) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return;
    } catch {
      await sleep(250);
    }
  }
  throw new Error('Timed out waiting for Edge debugging port.');
}

async function createPage() {
  const response = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' });
  if (!response.ok) {
    throw new Error(`Unable to create Edge tab: ${response.status}`);
  }
  return response.json();
}

function connectCdp(url) {
  const ws = new WebSocket(url);
  let id = 0;
  const callbacks = new Map();
  const waiters = new Map();

  ws.addEventListener('message', (event) => {
    const payload = JSON.parse(event.data);
    if (payload.id && callbacks.has(payload.id)) {
      const { resolve: done, reject } = callbacks.get(payload.id);
      callbacks.delete(payload.id);
      if (payload.error) {
        reject(new Error(payload.error.message));
      } else {
        done(payload.result || {});
      }
      return;
    }

    if (payload.method && waiters.has(payload.method)) {
      for (const waiter of waiters.get(payload.method)) {
        waiter(payload.params || {});
      }
      waiters.delete(payload.method);
    }
  });

  const ready = new Promise((resolveReady, rejectReady) => {
    ws.addEventListener('open', resolveReady, { once: true });
    ws.addEventListener('error', rejectReady, { once: true });
  });

  return ready.then(() => ({
    send(method, params = {}) {
      const messageId = ++id;
      ws.send(JSON.stringify({ id: messageId, method, params }));
      return new Promise((resolveSend, rejectSend) => {
        callbacks.set(messageId, { resolve: resolveSend, reject: rejectSend });
      });
    },
    waitFor(method, timeoutMs) {
      return new Promise((resolveWait, rejectWait) => {
        const timer = setTimeout(() => rejectWait(new Error(`Timed out waiting for ${method}`)), timeoutMs);
        const list = waiters.get(method) || [];
        list.push((params) => {
          clearTimeout(timer);
          resolveWait(params);
        });
        waiters.set(method, list);
      });
    },
    close() {
      ws.close();
    },
  }));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

import { cpSync, existsSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = resolve('.');
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function run(command, args, cwd) {
  if (process.platform === 'win32') {
    execFileSync('cmd.exe', ['/d', '/s', '/c', [command, ...args].join(' ')], { cwd, stdio: 'inherit' });
    return;
  }

  execFileSync(command, args, { cwd, stdio: 'inherit' });
}

function resetDist() {
  rmSync(join(root, 'dist'), { recursive: true, force: true });
}

function copyBuildOutput(fromDir) {
  resetDist();
  cpSync(fromDir, join(root, 'dist'), { recursive: true });
}

function targetFromRenderEnv() {
  const serviceName = process.env.RENDER_SERVICE_NAME || '';
  const externalHost = process.env.RENDER_EXTERNAL_HOSTNAME || process.env.RENDER_EXTERNAL_URL || '';
  const target = `${serviceName} ${externalHost}`.toLowerCase();

  if (target.includes('truetransitadmin')) return 'admin';
  if (target.includes('truetransit-2')) return 'client';
  return 'landing';
}

function buildClientPanel() {
  const cwd = join(root, 'client-panel');
  run(npm, ['install'], cwd);
  run(npm, ['run', 'build'], cwd);
  copyBuildOutput(join(cwd, 'dist'));
}

function buildAdminPanel() {
  const cwd = join(root, 'admin-panel');
  run(npm, ['install', '--legacy-peer-deps'], cwd);
  run(npm, ['run', 'build'], cwd);
  copyBuildOutput(join(cwd, 'build'));
}

function buildLanding() {
  resetDist();
  run(npm, ['run', 'build:landing'], root);
}

const target = targetFromRenderEnv();
console.log(`Render build target: ${target}`);

if (target === 'admin' && existsSync(join(root, 'admin-panel'))) {
  buildAdminPanel();
} else if (target === 'client' && existsSync(join(root, 'client-panel'))) {
  buildClientPanel();
} else {
  buildLanding();
}

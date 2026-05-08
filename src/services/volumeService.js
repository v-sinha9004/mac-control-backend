const { exec } = require('child_process');
const util = require('util');

const execPromise = util.promisify(exec);

// Helper to execute osascript
async function runOsascript(script) {
  try {
    const { stdout } = await execPromise(`osascript -e '${script}'`);
    return stdout.trim();
  } catch (error) {
    console.error('AppleScript Error:', error);
    throw new Error('Failed to execute macOS volume command');
  }
}

async function getVolumeInfo() {
  const volOutput = await runOsascript('output volume of (get volume settings)');
  const muteOutput = await runOsascript('output muted of (get volume settings)');
  
  return {
    volume: parseInt(volOutput, 10),
    muted: muteOutput === 'true'
  };
}

async function setVolume(level) {
  if (level < 0 || level > 100) {
    throw new Error('Volume level must be between 0 and 100');
  }
  await runOsascript(`set volume output volume ${level}`);
  return getVolumeInfo();
}

async function setMute(muted) {
  const mutedStr = muted ? 'true' : 'false';
  await runOsascript(`set volume output muted ${mutedStr}`);
  return getVolumeInfo();
}

async function changeVolumeBy(step) {
  const current = await getVolumeInfo();
  let newVolume = current.volume + step;
  if (newVolume < 0) newVolume = 0;
  if (newVolume > 100) newVolume = 100;
  
  await setVolume(newVolume);
  return getVolumeInfo();
}

module.exports = {
  getVolumeInfo,
  setVolume,
  setMute,
  changeVolumeBy
};

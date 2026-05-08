const volumeService = require('../services/volumeService');

async function getVolume(req, res, next) {
  try {
    const info = await volumeService.getVolumeInfo();
    res.json(info);
  } catch (error) {
    next(error);
  }
}

async function setVolume(req, res, next) {
  try {
    const { volume } = req.body;
    const info = await volumeService.setVolume(volume);
    res.json(info);
  } catch (error) {
    next(error);
  }
}

async function setMute(req, res, next) {
  try {
    const { muted } = req.body;
    const info = await volumeService.setMute(muted);
    res.json(info);
  } catch (error) {
    next(error);
  }
}

async function increaseVolume(req, res, next) {
  try {
    const info = await volumeService.changeVolumeBy(5);
    res.json(info);
  } catch (error) {
    next(error);
  }
}

async function decreaseVolume(req, res, next) {
  try {
    const info = await volumeService.changeVolumeBy(-5);
    res.json(info);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getVolume,
  setVolume,
  setMute,
  increaseVolume,
  decreaseVolume
};

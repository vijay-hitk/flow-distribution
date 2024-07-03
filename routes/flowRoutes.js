const express = require('express');
const { connectUser, toggleTopAstrologer } = require('../services/flowDistributionService');
const router = express.Router();

router.post('/connect-user/:userId', async (req, res) => {
  try {
    await connectUser(req.params.userId);
    res.status(200).send('User connected');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/toggle-top-astrologer/:astrologerId', async (req, res) => {
  try {
    await toggleTopAstrologer(req.params.astrologerId, req.body.topAstrologer, req.body.flowMultiplier);
    res.status(200).send('Astrologer toggled');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;

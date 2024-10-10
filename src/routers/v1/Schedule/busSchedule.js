const express = require('express');
const router = express.Router();
const BusScheduleController = require('../../../controllers/BusSchedule/busSchedule');

router.get('/schedule', async (req, res) => {
  try {
    const result = await BusScheduleController.getDoc({});
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
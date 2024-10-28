const express = require('express');
const router = express.Router();
const busScheduleController = require("../../../controllers/BusSchedule/busSchedule.js");

const BusSchedule = require('../../../models/BusSchedule/busSchedule.js');

router.get('/api/bus-schedule', busScheduleController);

module.exports = router;



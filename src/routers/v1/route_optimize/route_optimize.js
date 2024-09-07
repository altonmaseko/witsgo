const express = require("express");
const router = express.Router();

// Starts authentication process
router.get("/temp",(req,res)=>{
    res.send("temp");
});

module.exports = router;

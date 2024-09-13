const express = require("express");
const router = express.Router();


router.get("/get_data",async (req,res)=>{
    if (!req.body || !req.body["database"] || !req.body["table"] || !req.body["data"]) {
      res.status(400).send({ "message": "Missing required parameters" });
      return;
    }

    console.log(req.body);


});



router.post("/insert_data",async (req,res)=>{
    if (!req.body || !req.body["database"] || !req.body["table"] || !req.body["data"]) {
      res.status(400).send({ "message": "Missing required parameters" });
      return;
    }
});

router.post("/update_data",async (req,res)=>{
    if (!req.body || !req.body["database"] || !req.body["table"] || !req.body["data"]) {
      res.status(400).send({ "message": "Missing required parameters" });
      return;
    }
});

module.exports = router;

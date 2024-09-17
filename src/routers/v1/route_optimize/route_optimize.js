const express = require("express");
const router = express.Router();
const axios = require("axios");
// Base URL for Google Maps Directions API
const baseURL = "https://routes.googleapis.com/directions/v2:computeRoutes?key="


router.post("/route_optimize",async (req,res)=>{
    if (!req.body || !req.body["destination"] || !req.body["origin"] || !req.body["travelMode"]) {
      res.status(400).send({ "message": "Missing required parameters" });
      return;
    }

    let origin = req.body["origin"]
    let dest = req.body["destination"];
    let travel_mode = req.body["travelMode"];


    if (!origin["latitude"]||!origin["longitude"]||!dest["latitude"]||!dest["longitude"]){
      res.status(400).send({ "message": "Missing required parameters" });
      return;
    }
    
    
    const endpoint = baseURL+"AIzaSyCEbj6_WGhOUTbbDAVNw3BhOMnQ44yyXOo";
    
    const headers = {
        'Content-Type': 'application/json',
        'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline,routes.legs.steps.navigationInstruction,routes.legs.steps.localizedValues'
      }

    const data = {
        "origin": {
          "location": {
            "latLng": {
              "latitude": origin["latitude"],
              "longitude": origin["longitude"]
            }
          }
        },
        "destination": {
          "location": {
            "latLng": {
              "latitude": dest["latitude"],
              "longitude": dest["longitude"]
            }
          }
        },
        "travelMode": travel_mode,
        "computeAlternativeRoutes": false,
        "routeModifiers": {
          "avoidTolls": false,
          "avoidHighways": false,
          "avoidFerries": false
        },
        "languageCode": "en-US",
        "units": "METRIC"
      }


    try{  
        const APIresponse = await axios.post(endpoint,data,{headers:headers})
        const legs = APIresponse.data.routes[0].legs
        const encodedPolyline = APIresponse.data.routes[0].polyline.encodedPolyline;
        res.send(
            {"success":true,data:{
              "polyline":encodedPolyline,
              "legs":legs
            }
          }
        );

    }catch(error){
        res.status(400).send({ "message": error.message });
    }
});

module.exports = router;

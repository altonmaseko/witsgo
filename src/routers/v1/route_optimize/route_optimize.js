const express = require("express");
const router = express.Router();
const axios = require("axios");

const baseURL = "https://routes.googleapis.com/directions/v2:computeRoutes?key="


router.post("/route_optimize",async (req,res)=>{
    console.log(req.body);

    origin = req.body["origin"];
    dest = req.body["destination"];
    travel_mode = req.body["travelMode"];


    const endpoint = baseURL+process.env.GOOGLE_MAP_KEY;
    const headers = {
        'Content-Type': 'application/json',
        'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline'
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
        "routingPreference": "TRAFFIC_AWARE",
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

        const encodedPolyline = APIresponse.data.routes[0].polyline.encodedPolyline;

        res.send(
            {"success":true,data:encodedPolyline}
        );

    }catch(error){
        res.status(400).send({ "message": error.message });
    }
});

module.exports = router;

//attempt to get wheelcahir routes working..ignore for now
const express = require("express");
const router = express.Router();
const axios = require("axios");

const baseURL = "https://routes.googleapis.com/directions/v2:computeRoutes?key="

router.post("/route_optimize", async (req, res) => {
    if (!req.body || !req.body["destination"] || !req.body["origin"] || !req.body["travelMode"]) {
        res.status(400).send({ "message": "Missing required parameters" });
        return;
    }

    let origin = req.body["origin"]
    let dest = req.body["destination"];
    let travel_mode = req.body["travelMode"];
    let waypoints = req.body["waypoints"];

    if (!origin["latitude"] || !origin["longitude"] || !dest["latitude"] || !dest["longitude"]) {
        res.status(400).send({ "message": "Missing required parameters" });
        return;
    }

    // add the waypoints below to ramps array
    const ramps = [
        { latitude: -26.190993, longitude: 28.026560 },
        { latitude: -26.189926, longitude: 28.026249 },
        { latitude: -26.189083, longitude: 28.026486 },
        { latitude: -26.189319, longitude: 28.027031 },
        { latitude: -26.192093, longitude: 28.027439 },
        { latitude: -26.191646, longitude: 28.028547 },
        { latitude: -26.191638, longitude: 28.029805 },
        { latitude: -26.192449, longitude: 28.029910 },
        { latitude: -26.192348, longitude: 28.030961 },
        { latitude: -26.191554, longitude: 28.030768 },
        { latitude: -26.191492, longitude: 28.029934 },
        { latitude: -26.190840, longitude: 28.030164 },
    ];
   

    const endpoint = baseURL + process.env.GOOGLE_MAP_KEY;

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
        "waypoints": waypoints, // Add waypoints to the request
        "languageCode": "en-US",
        "units": "METRIC"
    }

    try {
        const APIresponse = await axios.post(endpoint, data, { headers: headers })
        const legs = APIresponse.data.routes[0].legs
        const encodedPolyline = APIresponse.data.routes[0].polyline.encodedPolyline;
        res.send(
            {
                "success": true, data: {
                    "polyline": encodedPolyline,
                    "legs": legs
                }
            }
        );

    } catch (error) {
        res.status(400).send({ "message": error.message });
    }
});

module.exports = router;

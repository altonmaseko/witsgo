const mongoose = require("mongoose");

require("dotenv").config()


// const connectionURI = "mongodb+srv://lucian:lucian-witsgo@hexacluster.sjjuf.mongodb.net/";
const connectionURI = process.env.CONNECTION_URI;

const userConnectionURI = connectionURI + "User"
const userConnection = mongoose.createConnection(userConnectionURI, {});

const accessibilityConnectionURI = connectionURI + "Accessibility"
const accessibilityConnection = mongoose.createConnection(accessibilityConnectionURI, {});

const mapConnectionURI = connectionURI + "Map"
const mapConnection = mongoose.createConnection(mapConnectionURI, {});

const userRoutesConnectionURI = connectionURI + "UserRoutes"
const userRoutesConnection = mongoose.createConnection(userRoutesConnectionURI, {});

const rentalConnectionURI = connectionURI + "RentalService"
const rentalConnection = mongoose.createConnection(rentalConnectionURI, {});

const transporationConnectionURI = connectionURI + "Transportation"
const transporationConnection = mongoose.createConnection(transporationConnectionURI, {});

const busScheduleConnectionURI = connectionURI + "BusSchedule"
const busScheduleConnection = mongoose.createConnection(busScheduleConnectionURI, {}); 

// CHECK CONNECTIONS =================================
// Successful connection
userConnection.once("connected", () => { console.log("Successfully connected to User Database"); })
transporationConnection.once("connected", () => { console.log("Successfully connected to Transportation Database"); })
rentalConnection.once("connected", () => { console.log("Successfully connected to Rental Database"); })
accessibilityConnection.once("connected", () => { console.log("Successfully connected to Accessibility Database"); })
mapConnection.once("connected", () => { console.log("Successfully connected to Map Database"); })
userRoutesConnection.once("connected", () => { console.log("Successfully connected to User Routes Database"); })
// Error connecting
userConnection.on("error", (error) => { console.error("Error connecting to User Database: ", error); })
transporationConnection.on("error", (error) => { console.error("Error connecting to Transportation Database: ", error); })
rentalConnection.on("error", (error) => { console.error("Error connecting to Rental Database: ", error); })
accessibilityConnection.on("error", (error) => { console.error("Error connecting to Accessibility Database: ", error); })
mapConnection.on("error", (error) => { console.error("Error connecting to Map Database: ", error); })
userRoutesConnection.on("error", (error) => { console.error("Error connecting to User Routes Database: ", error); })
// Disconnected
userConnection.on("disconnected", () => { console.log("User Database disconnected"); })
transporationConnection.on("disconnected", () => { console.log("Transportation Database disconnected"); })
rentalConnection.on("disconnected", () => { console.log("Rental Database disconnected"); })
accessibilityConnection.on("disconnected", () => { console.log("Accessibility Database disconnected"); })
mapConnection.on("disconnected", () => { console.log("Map Database disconnected"); })
userRoutesConnection.on("disconnected", () => { console.log("User Routes Database disconnected"); })
// END: CHECK CONNECTIONS =============================

module.exports = {
    // connectDB,
    userConnection,
    accessibilityConnection,
    mapConnection,
    userRoutesConnection,
    rentalConnection,
    transporationConnection,
    busScheduleConnection

}
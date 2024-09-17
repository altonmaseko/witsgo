const mongoose = require("mongoose");

const { 
    userConnection, 
    accessibilityConnection, 
    mapConnection, 
    userRoutesConnection, 
    rentalConnection, 
    transporationConnection 
} = require("../src/config/connectDB");

jest.mock("mongoose", () => {
    const mConnection = {
        once: jest.fn(),
        on: jest.fn(),
        createConnection: jest.fn().mockReturnThis(),
    };
    return {
        createConnection: jest.fn(() => mConnection),
        connection: mConnection,
    };
});

describe("Database Connections", () => {
    beforeAll(() => {
        CONNECTION_URI = "mongodb+srv://lucian:lucian-witsgo@hexacluster.sjjuf.mongodb.net/";
    });

    it("should create connections with the correct URIs", () => {
        expect(mongoose.createConnection).toHaveBeenCalledWith(CONNECTION_URI + "User", {});
        expect(mongoose.createConnection).toHaveBeenCalledWith(CONNECTION_URI + "Accessibility", {});
        expect(mongoose.createConnection).toHaveBeenCalledWith(CONNECTION_URI + "Map", {});
        expect(mongoose.createConnection).toHaveBeenCalledWith(CONNECTION_URI + "UserRoutes", {});
        expect(mongoose.createConnection).toHaveBeenCalledWith(CONNECTION_URI + "RentalService", {});
        expect(mongoose.createConnection).toHaveBeenCalledWith(CONNECTION_URI + "Transportation", {});
    });

    it("should set up event listeners for successful connections", () => {
        expect(userConnection.once).toHaveBeenCalledWith("connected", expect.any(Function));
        expect(accessibilityConnection.once).toHaveBeenCalledWith("connected", expect.any(Function));
        expect(mapConnection.once).toHaveBeenCalledWith("connected", expect.any(Function));
        expect(userRoutesConnection.once).toHaveBeenCalledWith("connected", expect.any(Function));
        expect(rentalConnection.once).toHaveBeenCalledWith("connected", expect.any(Function));
        expect(transporationConnection.once).toHaveBeenCalledWith("connected", expect.any(Function));
    });

    it("should set up event listeners for connection errors", () => {
        expect(userConnection.on).toHaveBeenCalledWith("error", expect.any(Function));
        expect(accessibilityConnection.on).toHaveBeenCalledWith("error", expect.any(Function));
        expect(mapConnection.on).toHaveBeenCalledWith("error", expect.any(Function));
        expect(userRoutesConnection.on).toHaveBeenCalledWith("error", expect.any(Function));
        expect(rentalConnection.on).toHaveBeenCalledWith("error", expect.any(Function));
        expect(transporationConnection.on).toHaveBeenCalledWith("error", expect.any(Function));
    });

    it("should set up event listeners for disconnections", () => {
        expect(userConnection.on).toHaveBeenCalledWith("disconnected", expect.any(Function));
        expect(accessibilityConnection.on).toHaveBeenCalledWith("disconnected", expect.any(Function));
        expect(mapConnection.on).toHaveBeenCalledWith("disconnected", expect.any(Function));
        expect(userRoutesConnection.on).toHaveBeenCalledWith("disconnected", expect.any(Function));
        expect(rentalConnection.on).toHaveBeenCalledWith("disconnected", expect.any(Function));
        expect(transporationConnection.on).toHaveBeenCalledWith("disconnected", expect.any(Function));
    });
});
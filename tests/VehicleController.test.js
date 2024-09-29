const Vehicle = require("../src/models/Rental/vehicle");
const VehicleController = require("../src/controllers/RentalService/VehicleController");

jest.mock("../src/models/Rental/vehicle");

describe("VehicleController", () => {
    describe("exists", () => {
        it("should return true if vehicle exists", async () => {
            Vehicle.exists.mockResolvedValue(true);

            const query = { name: "Test Vehicle" };
            const result = await VehicleController.exists(query);

            expect(result).toBe(true);
            expect(Vehicle.exists).toHaveBeenCalledWith(query);
        });

        it("should return false if vehicle does not exist", async () => {
            Vehicle.exists.mockResolvedValue(false);

            const query = { name: "Nonexistent Vehicle" };
            const result = await VehicleController.exists(query);

            expect(result).toBe(false);
            expect(Vehicle.exists).toHaveBeenCalledWith(query);
        });

        it("should return false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Vehicle.exists.mockRejectedValue(new Error("Test Error"));

            const query = { name: "Error Vehicle" };
            const result = await VehicleController.exists(query);

            expect(result).toBe(false);
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error checking if vehicle exists:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("getDoc", () => {
        it("should return document if it exists", async () => {
            const mockDoc = { name: "Test Vehicle" };
            Vehicle.find.mockResolvedValue(mockDoc);

            const query = { name: "Test Vehicle" };
            const result = await VehicleController.getDoc(query);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Vehicle.find).toHaveBeenCalledWith(query);
        });

        it("should return success false if document does not exist", async () => {
            Vehicle.find.mockResolvedValue(null);

            const query = { name: "Nonexistent Vehicle" };
            const result = await VehicleController.getDoc(query);

            expect(result).toEqual({ success: false, message: "Vehicle does not exist." });
            expect(Vehicle.find).toHaveBeenCalledWith(query);
        });

        it("should return success false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Vehicle.find.mockRejectedValue(new Error("Test Error"));

            const query = { name: "Error Vehicle" };
            const result = await VehicleController.getDoc(query);

            expect(result).toEqual({ success: false, message: "Error occurred." });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error getting vehicle:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("insertRecord", () => {
        it("should return success true if document is inserted", async () => {
            const mockDoc = { name: "New Vehicle" };
            Vehicle.create.mockResolvedValue(mockDoc);

            const obj = { name: "New Vehicle" };
            const result = await VehicleController.insertRecord(obj);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Vehicle.create).toHaveBeenCalledWith(obj);
        });

        it("should return success false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Vehicle.create.mockRejectedValue(new Error("Test Error"));

            const obj = { name: "New Vehicle" };
            const result = await VehicleController.insertRecord(obj);

            expect(result).toEqual({ success: false, message: "Error occurred." });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error inserting vehicle:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("edits", () => {
        it("should return success true if document is updated", async () => {
            const mockDoc = { name: "Updated Vehicle" };
            Vehicle.findOneAndUpdate.mockResolvedValue(mockDoc);

            const obj = { _id: 1, name: "Updated Vehicle" };
            const result = await VehicleController.edits(obj);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Vehicle.findOneAndUpdate).toHaveBeenCalledWith({ _id: obj._id }, obj, { new: true });
        });

        it("should return success false if document does not exist", async () => {
            Vehicle.findOneAndUpdate.mockResolvedValue(null);

            const obj = { _id: 1, name: "Updated Vehicle" };
            const result = await VehicleController.edits(obj);

            expect(result).toEqual({ success: false, message: "Vehicle does not exist." });
            expect(Vehicle.findOneAndUpdate).toHaveBeenCalledWith({ _id: obj._id }, obj, { new: true });
        });

        it("should return success false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Vehicle.findOneAndUpdate.mockRejectedValue(new Error("Test Error"));

            const obj = { _id: 1, name: "Updated Vehicle" };
            const result = await VehicleController.edits(obj);

            expect(result).toEqual({ success: false, message: "Error occurred." });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error updating vehicle:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });
});
const Station = require("../src/models/Rental/station");
const StationController = require("../src/controllers/RentalService/StationController");

jest.mock("../src/models/Rental/station");

describe("StationController", () => {
    describe("exists", () => {
        it("should return true if station exists", async () => {
            Station.exists.mockResolvedValue(true);

            const query = { name: "Test Station" };
            const result = await StationController.exists(query);

            expect(result).toBe(true);
            expect(Station.exists).toHaveBeenCalledWith(query);
        });

        it("should return false if station does not exist", async () => {
            Station.exists.mockResolvedValue(false);

            const query = { name: "Nonexistent Station" };
            const result = await StationController.exists(query);

            expect(result).toBe(false);
            expect(Station.exists).toHaveBeenCalledWith(query);
        });

        it("should return false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Station.exists.mockRejectedValue(new Error("Test Error"));

            const query = { name: "Error Station" };
            const result = await StationController.exists(query);

            expect(result).toBe(false);
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error checking if station exists:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("getDoc", () => {
        it("should return document if it exists", async () => {
            const mockDoc = { name: "Test Station" };
            Station.find.mockResolvedValue(mockDoc);

            const query = { name: "Test Station" };
            const result = await StationController.getDoc(query);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Station.find).toHaveBeenCalledWith(query);
        });

        it("should return success false if document does not exist", async () => {
            Station.find.mockResolvedValue(null);

            const query = { name: "Nonexistent Station" };
            const result = await StationController.getDoc(query);

            expect(result).toEqual({ success: false, message: "Station does not exist." });
            expect(Station.find).toHaveBeenCalledWith(query);
        });

        it("should return success false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Station.find.mockRejectedValue(new Error("Test Error"));

            const query = { name: "Error Station" };
            const result = await StationController.getDoc(query);

            expect(result).toEqual({ success: false, message: "Error occurred." });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error getting station:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("insertRecord", () => {
        it("should return success true if document is inserted", async () => {
            const mockDoc = { name: "New Station" };
            Station.create.mockResolvedValue(mockDoc);

            const obj = { name: "New Station" };
            const result = await StationController.insertRecord(obj);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Station.create).toHaveBeenCalledWith(obj);
        });

        it("should return success false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Station.create.mockRejectedValue(new Error("Test Error"));

            const obj = { name: "New Station" };
            const result = await StationController.insertRecord(obj);

            expect(result).toEqual({ success: false, message: "Error occurred." });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error inserting station:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("edits", () => {
        it("should return success true if document is updated", async () => {
            const mockDoc = { name: "Updated Station" };
            Station.findOneAndUpdate.mockResolvedValue(mockDoc);

            const obj = { _id: 1, name: "Updated Station" };
            const result = await StationController.edits(obj);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Station.findOneAndUpdate).toHaveBeenCalledWith({ _id: obj._id }, obj, { new: true });
        });

        it("should return success false if document does not exist", async () => {
            Station.findOneAndUpdate.mockResolvedValue(null);

            const obj = { _id: 1, name: "Updated Station" };
            const result = await StationController.edits(obj);

            expect(result).toEqual({ success: false, message: "Station does not exist." });
            expect(Station.findOneAndUpdate).toHaveBeenCalledWith({ _id: obj._id }, obj, { new: true });
        });

        it("should return success false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Station.findOneAndUpdate.mockRejectedValue(new Error("Test Error"));

            const obj = { _id: 1, name: "Updated Station" };
            const result = await StationController.edits(obj);

            expect(result).toEqual({ success: false, message: "Error occurred." });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error updating station:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });
});
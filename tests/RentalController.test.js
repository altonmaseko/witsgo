const Rental = require("../src/models/Rental/rental");
const RentalController = require("../src/controllers/RentalService/RentalController");

jest.mock("../src/models/Rental/rental");

describe("RentalController", () => {
    describe("exists", () => {
        it("should return true if rental exists", async () => {
            Rental.exists.mockResolvedValue(true);

            const query = { name: "Test Rental" };
            const result = await RentalController.exists(query);

            expect(result).toBe(true);
            expect(Rental.exists).toHaveBeenCalledWith(query);
        });

        it("should return false if rental does not exist", async () => {
            Rental.exists.mockResolvedValue(false);

            const query = { name: "Nonexistent Rental" };
            const result = await RentalController.exists(query);

            expect(result).toBe(false);
            expect(Rental.exists).toHaveBeenCalledWith(query);
        });

        it("should return false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Rental.exists.mockRejectedValue(new Error("Test Error"));

            const query = { name: "Error Rental" };
            const result = await RentalController.exists(query);

            expect(result).toBe(false);
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error checking if rental exists:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("getDoc", () => {
        it("should return document if it exists", async () => {
            const mockDoc = { name: "Test Rental" };
            Rental.find.mockResolvedValue(mockDoc);

            const query = { name: "Test Rental" };
            const result = await RentalController.getDoc(query);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Rental.find).toHaveBeenCalledWith(query);
        });

        it("should return success false if document does not exist", async () => {
            Rental.find.mockResolvedValue(null);

            const query = { name: "Nonexistent Rental" };
            const result = await RentalController.getDoc(query);

            expect(result).toEqual({ success: false, message: "Rental does not exist." });
            expect(Rental.find).toHaveBeenCalledWith(query);
        });

        it("should return success false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Rental.find.mockRejectedValue(new Error("Test Error"));

            const query = { name: "Error Rental" };
            const result = await RentalController.getDoc(query);

            expect(result).toEqual({ success: false, message: "Error occurred." });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error getting rental:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("insertRecord", () => {
        it("should return success true if document is inserted", async () => {
            const mockDoc = { name: "New Rental" };
            Rental.create.mockResolvedValue(mockDoc);

            const obj = { name: "New Rental" };
            const result = await RentalController.insertRecord(obj);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Rental.create).toHaveBeenCalledWith(obj);
        });

        it("should return success false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Rental.create.mockRejectedValue(new Error("Test Error"));

            const obj = { name: "New Rental" };
            const result = await RentalController.insertRecord(obj);

            expect(result).toEqual({ success: false, message: "Error occurred." });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error inserting rental:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("edits", () => {
        it("should return success true if document is updated", async () => {
            const mockDoc = { name: "Updated Rental" };
            Rental.findOneAndUpdate.mockResolvedValue(mockDoc);

            const obj = { _id: 1, name: "Updated Rental" };
            const result = await RentalController.edits(obj);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Rental.findOneAndUpdate).toHaveBeenCalledWith({ _id: obj._id }, obj, { new: true });
        });

        it("should return success false if document does not exist", async () => {
            Rental.findOneAndUpdate.mockResolvedValue(null);

            const obj = { _id: 1, name: "Updated Rental" };
            const result = await RentalController.edits(obj);

            expect(result).toEqual({ success: false, message: "Rental does not exist." });
            expect(Rental.findOneAndUpdate).toHaveBeenCalledWith({ _id: obj._id }, obj, { new: true });
        });

        it("should return success false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Rental.findOneAndUpdate.mockRejectedValue(new Error("Test Error"));

            const obj = { _id: 1, name: "Updated Rental" };
            const result = await RentalController.edits(obj);

            expect(result).toEqual({ success: false, message: "Error occurred." });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error updating rental:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });
});
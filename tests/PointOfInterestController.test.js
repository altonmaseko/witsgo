const PointOfInterest = require("../src/models/Map/poi");
const PointOfInterestController = require("../src/controllers/Map/PointOfInterestController");

jest.mock("../src/models/Map/poi");

describe("PointOfInterestController", () => {
    describe("exist", () => {
        it("should return true if document exists", async () => {
            PointOfInterest.exists.mockResolvedValue(true);

            const query = { name: "Test POI" };
            const result = await PointOfInterestController.exist(query);

            expect(result).toBe(true);
            expect(PointOfInterest.exists).toHaveBeenCalledWith(query);
        });

        it("should return false if document does not exist", async () => {
            PointOfInterest.exists.mockResolvedValue(false);

            const query = { name: "Nonexistent POI" };
            const result = await PointOfInterestController.exist(query);

            expect(result).toBe(false);
            expect(PointOfInterest.exists).toHaveBeenCalledWith(query);
        });

        it("should return false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            PointOfInterest.exists.mockRejectedValue(new Error("Test Error"));

            const query = { name: "Error POI" };
            const result = await PointOfInterestController.exist(query);

            expect(result).toBe(false);
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error checking if document exists:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("getDoc", () => {
        it("should return document if it exists", async () => {
            const mockDoc = { name: "Test POI" };
            PointOfInterest.find.mockResolvedValue(mockDoc);

            const query = { name: "Test POI" };
            const result = await PointOfInterestController.getDoc(query);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(PointOfInterest.find).toHaveBeenCalledWith(query);
        });

        it("should return success false if document does not exist", async () => {
            PointOfInterest.find.mockResolvedValue(null);

            const query = { name: "Nonexistent POI" };
            const result = await PointOfInterestController.getDoc(query);

            expect(result).toEqual({ success: false, message: "Document does not exist." });
            expect(PointOfInterest.find).toHaveBeenCalledWith(query);
        });

        it("should return success false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            PointOfInterest.find.mockRejectedValue(new Error("Test Error"));

            const query = { name: "Error POI" };
            const result = await PointOfInterestController.getDoc(query);

            expect(result).toEqual({ success: false, message: "Error occurred." });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error retrieving document:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("edits", () => {
        it("should return success true if document is updated", async () => {
            const mockDoc = { name: "Updated POI" };
            PointOfInterest.findOneAndUpdate.mockResolvedValue(mockDoc);

            const obj = { _id: 1, poi_name: "Updated POI", latitude: 10, longitude: 20 };
            const result = await PointOfInterestController.edits(obj);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(PointOfInterest.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: obj._id },
                {
                    poi_name: obj.poi_name,
                    latitude: obj.latitude,
                    longitude: obj.longitude,
                    created_at: expect.any(Number)
                },
                { new: true, upsert: true }
            );
        });

        it("should return success false if operation fails", async () => {
            PointOfInterest.findOneAndUpdate.mockResolvedValue(null);

            const obj = { _id: 1, poi_name: "Updated POI", latitude: 10, longitude: 20 };
            const result = await PointOfInterestController.edits(obj);

            expect(result).toEqual({ success: false, message: "Operation failed" });
            expect(PointOfInterest.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: obj._id },
                {
                    poi_name: obj.poi_name,
                    latitude: obj.latitude,
                    longitude: obj.longitude,
                    created_at: expect.any(Number)
                },
                { new: true, upsert: true }
            );
        });

        it("should return success false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            PointOfInterest.findOneAndUpdate.mockRejectedValue(new Error("Test Error"));

            const obj = { _id: 1, poi_name: "Updated POI", latitude: 10, longitude: 20 };
            const result = await PointOfInterestController.edits(obj);

            expect(result).toEqual({ success: false, message: "Error occurred" });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error updating or inserting document:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("insertRecord", () => {
        it("should return success true if document is inserted", async () => {
            const mockDoc = { name: "New POI" };
            PointOfInterest.prototype.save.mockResolvedValue(mockDoc);

            const obj = { name: "New POI", latitude: 10, longitude: 20 };
            const result = await PointOfInterestController.insertRecord(obj);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(PointOfInterest).toHaveBeenCalledWith(obj);
            expect(PointOfInterest.prototype.save).toHaveBeenCalled();
        });

        it("should return success false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            PointOfInterest.prototype.save.mockRejectedValue(new Error("Test Error"));

            const obj = { name: "New POI", latitude: 10, longitude: 20 };
            const result = await PointOfInterestController.insertRecord(obj);

            expect(result).toEqual({ success: false, message: "Error occurred" });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error inserting record:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });
});
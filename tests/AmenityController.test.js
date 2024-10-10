const Amenity = require("../src/models/Map/amenity");
const AmenityController = require("../src/controllers/Map/AmenityController");

jest.mock("../src/models/Map/amenity");

describe("AmenityController", () => {
    describe("exist", () => {
        it("should return true if document exists", async () => {
            Amenity.exists.mockResolvedValue(true);

            const query = { name: "Test Amenity" };
            const result = await AmenityController.exist(query);

            expect(result).toBe(true);
            expect(Amenity.exists).toHaveBeenCalledWith(query);
        });

        it("should return false if document does not exist", async () => {
            Amenity.exists.mockResolvedValue(false);

            const query = { name: "Nonexistent Amenity" };
            const result = await AmenityController.exist(query);

            expect(result).toBe(false);
            expect(Amenity.exists).toHaveBeenCalledWith(query);
        });

        it("should return false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Amenity.exists.mockRejectedValue(new Error("Test Error"));

            const query = { name: "Error Amenity" };
            const result = await AmenityController.exist(query);

            expect(result).toBe(false);
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error checking if document exists:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("getDoc", () => {
        it("should return document if it exists", async () => {
            const mockDoc = { name: "Test Amenity" };
            Amenity.find.mockResolvedValue(mockDoc);

            const query = { name: "Test Amenity" };
            const result = await AmenityController.getDoc(query);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Amenity.find).toHaveBeenCalledWith(query);
        });

        it("should return success false if document does not exist", async () => {
            Amenity.find.mockResolvedValue(null);

            const query = { name: "Nonexistent Amenity" };
            const result = await AmenityController.getDoc(query);

            expect(result).toEqual({ success: false, message: "Document does not exist." });
            expect(Amenity.find).toHaveBeenCalledWith(query);
        });

        it("should return success false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Amenity.find.mockRejectedValue(new Error("Test Error"));

            const query = { name: "Error Amenity" };
            const result = await AmenityController.getDoc(query);

            expect(result).toEqual({ success: false, message: "Error occurred." });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error retrieving document:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("edits", () => {
        it("should return success true if document is updated", async () => {
            const mockDoc = { name: "Updated Amenity" };
            Amenity.findOneAndUpdate.mockResolvedValue(mockDoc);

            const obj = { building_id: 1, amenity_type: "Type A", latitude: 10, longitude: 20 };
            const result = await AmenityController.edits(obj);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Amenity.findOneAndUpdate).toHaveBeenCalledWith(
                { building_id: obj.building_id, amenity_type: obj.amenity_type },
                {
                    amenity_type: obj.amenity_type,
                    latitude: obj.latitude,
                    longitude: obj.longitude,
                    created_at: expect.any(Number)
                },
                { new: true, upsert: true }
            );
        });

        it("should return success false if operation fails", async () => {
            Amenity.findOneAndUpdate.mockResolvedValue(null);

            const obj = { building_id: 1, amenity_type: "Type A", latitude: 10, longitude: 20 };
            const result = await AmenityController.edits(obj);

            expect(result).toEqual({ success: false, message: "Operation failed" });
            expect(Amenity.findOneAndUpdate).toHaveBeenCalledWith(
                { building_id: obj.building_id, amenity_type: obj.amenity_type },
                {
                    amenity_type: obj.amenity_type,
                    latitude: obj.latitude,
                    longitude: obj.longitude,
                    created_at: expect.any(Number)
                },
                { new: true, upsert: true }
            );
        });

        it("should return success false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Amenity.findOneAndUpdate.mockRejectedValue(new Error("Test Error"));

            const obj = { building_id: 1, amenity_type: "Type A", latitude: 10, longitude: 20 };
            const result = await AmenityController.edits(obj);

            expect(result).toEqual({ success: false, message: "Error occurred" });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error updating or inserting document:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("insertRecord", () => {
        it("should return success true if document is inserted", async () => {
            const mockDoc = { name: "New Amenity" };
            Amenity.prototype.save.mockResolvedValue(mockDoc);

            const obj = { name: "New Amenity", latitude: 10, longitude: 20 };
            const result = await AmenityController.insertRecord(obj);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Amenity).toHaveBeenCalledWith(obj);
            expect(Amenity.prototype.save).toHaveBeenCalled();
        });

        it("should return success false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Amenity.prototype.save.mockRejectedValue(new Error("Test Error"));

            const obj = { name: "New Amenity", latitude: 10, longitude: 20 };
            const result = await AmenityController.insertRecord(obj);

            expect(result).toEqual({ success: false, message: "Error occurred" });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error inserting record:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });
});
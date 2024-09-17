const BuildingController = require("../src/controllers/Map/BuildingController");
const Building = require("../src/models/Map/building");

jest.mock("../src/models/Map/building");

describe("BuildingController", () => {
    describe("exist", () => {
        it("should return true if document exists", async () => {
            Building.exists.mockResolvedValue(true);
            const result = await BuildingController.exist({ _id: "123" });
            expect(result).toBe(true);
        });

        it("should return false if document does not exist", async () => {
            Building.exists.mockResolvedValue(false);
            const result = await BuildingController.exist({ _id: "DOES_NOT_EXIST" });
            expect(result).toBe(false);
        });

        it("should return false if an error occurs", async () => {
            Building.exists.mockRejectedValue(new Error("Error"));
            const result = await BuildingController.exist({ _id: "123" });
            expect(result).toBe(false);
        });
    });

    describe("getDoc", () => {
        it("should return document if it exists", async () => {
            const doc = { _id: "123", name: "Building1" };
            Building.find.mockResolvedValue(doc);
            const result = await BuildingController.getDoc({ _id: "123" });
            expect(result).toEqual({ success: true, data: doc });
        });

        it("should return error message if document does not exist", async () => {
            Building.find.mockResolvedValue(null);
            const result = await BuildingController.getDoc({ _id: "123" });
            expect(result).toEqual({ success: false, message: "Document does not exist." });
        });

        it("should return error message if an error occurs", async () => {
            Building.find.mockRejectedValue(new Error("Error"));
            const result = await BuildingController.getDoc({ _id: "123" });
            expect(result).toEqual({ success: false, message: "Error occurred." });
        });
    });

    describe("edits", () => {
        it("should return updated document if operation is successful", async () => {
            const doc = { _id: "123", name: "Building1" };
            Building.findOneAndUpdate.mockResolvedValue(doc);
            const result = await BuildingController.edits({ _id: "123", building_name: "Building1" });
            expect(result).toEqual({ success: true, data: doc });
        });

        it("should return error message if operation fails", async () => {
            Building.findOneAndUpdate.mockResolvedValue(null);
            const result = await BuildingController.edits({ _id: "123", building_name: "Building1" });
            expect(result).toEqual({ success: false, message: "Operation failed" });
        });

        it("should return error message if an error occurs", async () => {
            Building.findOneAndUpdate.mockRejectedValue(new Error("Error"));
            const result = await BuildingController.edits({ _id: "123", building_name: "Building1" });
            expect(result).toEqual({ success: false, message: "Error occurred" });
        });
    });

    describe("insertRecord", () => {
        it("should return inserted document if operation is successful", async () => {
            const doc = { _id: "123", name: "Building1" };
            Building.prototype.save.mockResolvedValue(doc);
            const result = await BuildingController.insertRecord({ name: "Building1" });
            expect(result).toEqual({ success: true, data: doc });
        });

        it("should return error message if an error occurs", async () => {
            Building.prototype.save.mockRejectedValue(new Error("Error"));
            const result = await BuildingController.insertRecord({ name: "Building1" });
            expect(result).toEqual({ success: false, message: "Error occurred" });
        });
    });
});
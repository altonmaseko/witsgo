const Routes = require("../src/models/UserRoutes/Routes");
const RoutesController = require("../src/controllers/UserRoutes/RoutesController");

jest.mock("../src/models/UserRoutes/Routes");

describe("RoutesController", () => {
    describe("exist", () => {
        it("should return true if the document exists", async () => {
            const query = { route_id: "routeId1" };
            Routes.exists.mockResolvedValue(true);

            const result = await RoutesController.exist(query);

            expect(result).toBe(true);
            expect(Routes.exists).toHaveBeenCalledWith(query);
        });

        it("should return false if the document does not exist", async () => {
            const query = { route_id: "routeId1" };
            Routes.exists.mockResolvedValue(false);

            const result = await RoutesController.exist(query);

            expect(result).toBe(false);
            expect(Routes.exists).toHaveBeenCalledWith(query);
        });

        it("should return false and log error if an error occurs", async () => {
            const query = { route_id: "routeId1" };
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Routes.exists.mockRejectedValue(new Error("Test Error"));

            const result = await RoutesController.exist(query);

            expect(result).toBe(false);
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error checking if document exists:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("getDoc", () => {
        it("should return success true and data if a document is found", async () => {
            const query = { route_id: "routeId1" };
            const mockDoc = { route_id: "routeId1", user_id: "userId1" };
            Routes.findOne.mockResolvedValue(mockDoc);

            const result = await RoutesController.getDoc(query);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Routes.findOne).toHaveBeenCalledWith(query);
        });

        it("should return success false and message if no document is found", async () => {
            const query = { route_id: "routeId1" };
            Routes.findOne.mockResolvedValue(null);

            const result = await RoutesController.getDoc(query);

            expect(result).toEqual({ success: false, message: "Document does not exist." });
            expect(Routes.findOne).toHaveBeenCalledWith(query);
        });

        it("should return success false and log error if an error occurs", async () => {
            const query = { route_id: "routeId1" };
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Routes.findOne.mockRejectedValue(new Error("Test Error"));

            const result = await RoutesController.getDoc(query);

            expect(result).toEqual({ success: false, message: "Error occurred while retrieving document." });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error retrieving document:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("edits", () => {
        it("should return success true and data if the document is edited or added", async () => {
            const obj = { route_id: "routeId1", user_id: "userId1", start_location: { lat: 0, lng: 0 }, end_location: { lat: 1, lng: 1 }, route_data: "data" };
            const mockDoc = { route_id: "routeId1", user_id: "userId1", start_location: { lat: 0, lng: 0 }, end_location: { lat: 1, lng: 1 }, route_data: "data", created_at: new Date() };
            Routes.findOneAndUpdate.mockResolvedValue(mockDoc);

            const result = await RoutesController.edits(obj);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Routes.findOneAndUpdate).toHaveBeenCalledWith(
                { route_id: obj.route_id },
                {
                    user_id: obj.user_id,
                    start_location: obj.start_location,
                    end_location: obj.end_location,
                    route_data: obj.route_data,
                    created_at: expect.any(Date)
                },
                { new: true, upsert: true }
            );
        });

        it("should return success false and message if the operation failed", async () => {
            const obj = { route_id: "routeId1", user_id: "userId1", start_location: { lat: 0, lng: 0 }, end_location: { lat: 1, lng: 1 }, route_data: "data" };
            Routes.findOneAndUpdate.mockResolvedValue(null);

            const result = await RoutesController.edits(obj);

            expect(result).toEqual({ success: false, message: "Operation failed." });
            expect(Routes.findOneAndUpdate).toHaveBeenCalledWith(
                { route_id: obj.route_id },
                {
                    user_id: obj.user_id,
                    start_location: obj.start_location,
                    end_location: obj.end_location,
                    route_data: obj.route_data,
                    created_at: expect.any(Date)
                },
                { new: true, upsert: true }
            );
        });

        it("should return success false and log error if an error occurs", async () => {
            const obj = { route_id: "routeId1", user_id: "userId1", start_location: { lat: 0, lng: 0 }, end_location: { lat: 1, lng: 1 }, route_data: "data" };
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Routes.findOneAndUpdate.mockRejectedValue(new Error("Test Error"));

            const result = await RoutesController.edits(obj);

            expect(result).toEqual({ success: false, message: "Error occurred while processing request." });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error updating or creating record:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("insertRecord", () => {
        it("should return success true and data if the document is inserted", async () => {
            const obj = { user_id: "userId1", start_location: { lat: 0, lng: 0 }, end_location: { lat: 1, lng: 1 }, duration: 60, route_data: "data" };
            const mockDoc = { user_id: "userId1", start_location: { lat: 0, lng: 0 }, end_location: { lat: 1, lng: 1 }, duration: 60, route_data: "data", created_at: new Date() };
            Routes.prototype.save = jest.fn().mockResolvedValue(mockDoc);

            const result = await RoutesController.insertRecord(obj);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Routes.prototype.save).toHaveBeenCalled();
        });

        it("should return success false and log error if an error occurs", async () => {
            const obj = { user_id: "userId1", start_location: { lat: 0, lng: 0 }, end_location: { lat: 1, lng: 1 }, duration: 60, route_data: "data" };
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Routes.prototype.save = jest.fn().mockRejectedValue(new Error("Test Error"));

            const result = await RoutesController.insertRecord(obj);

            expect(result).toEqual({ success: false, message: "Error occurred while inserting record." });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error inserting record:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });
});
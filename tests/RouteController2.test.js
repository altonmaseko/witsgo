const Routes = require("../src/models/UserRoutes/Routes");
const RoutesController = require("../src/controllers/UserRoutes/RoutesController");

jest.mock("../src/models/UserRoutes/Routes");

describe("RoutesController", () => {
    describe("exist", () => {
        it("should return true if the record exists", async () => {
            Routes.exists.mockResolvedValue(true);

            const query = { route_id: "someRouteId" };
            const result = await RoutesController.exist(query);

            expect(result).toBe(true);
            expect(Routes.exists).toHaveBeenCalledWith(query);
        });

        it("should return false if the record does not exist", async () => {
            Routes.exists.mockResolvedValue(false);

            const query = { route_id: "nonexistentRouteId" };
            const result = await RoutesController.exist(query);

            expect(result).toBe(false);
            expect(Routes.exists).toHaveBeenCalledWith(query);
        });

        it("should return false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Routes.exists.mockRejectedValue(new Error("Test Error"));

            const query = { route_id: "errorRouteId" };
            const result = await RoutesController.exist(query);

            expect(result).toBe(false);
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error checking if document exists:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("getDoc", () => {
        it("should return success true if the document is found", async () => {
            const mockDoc = { route_id: "someRouteId", user_id: "someUserId" };
            Routes.findOne.mockResolvedValue(mockDoc);

            const query = { route_id: "someRouteId" };
            const result = await RoutesController.getDoc(query);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Routes.findOne).toHaveBeenCalledWith(query);
        });

        it("should return success false if the document is not found", async () => {
            Routes.findOne.mockResolvedValue(null);

            const query = { route_id: "nonexistentRouteId" };
            const result = await RoutesController.getDoc(query);

            expect(result).toEqual({ success: false, message: "Document does not exist." });
            expect(Routes.findOne).toHaveBeenCalledWith(query);
        });

        it("should return success false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Routes.findOne.mockRejectedValue(new Error("Test Error"));

            const query = { route_id: "errorRouteId" };
            const result = await RoutesController.getDoc(query);

            expect(result).toEqual({ success: false, message: "Error occurred while retrieving document." });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error retrieving document:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("edits", () => {
        it("should return success true if the document is updated or added successfully", async () => {
            const mockDoc = { route_id: "someRouteId", user_id: "someUserId" };
            Routes.findOneAndUpdate.mockResolvedValue(mockDoc);

            const obj = {
                route_id: "someRouteId",
                user_id: "someUserId",
                start_location: { latitude: 0, longitude: 0 },
                end_location: { latitude: 1, longitude: 1 },
                duration: 100,
                route_data: "someRouteData"
            };
            const result = await RoutesController.edits(obj);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Routes.findOneAndUpdate).toHaveBeenCalledWith(
                { route_id: obj.route_id },
                {
                    user_id: obj.user_id,
                    start_location: obj.start_location,
                    end_location: obj.end_location,
                    duration: obj.duration,
                    route_data: obj.route_data,
                    created_at: expect.any(Date)
                },
                { new: true, upsert: true }
            );
        });

        it("should return success false if the operation fails", async () => {
            Routes.findOneAndUpdate.mockResolvedValue(null);

            const obj = {
                route_id: "someRouteId",
                user_id: "someUserId",
                start_location: { latitude: 0, longitude: 0 },
                end_location: { latitude: 1, longitude: 1 },
                duration: 100,
                route_data: "someRouteData"
            };
            const result = await RoutesController.edits(obj);

            expect(result).toEqual({ success: false, message: "Operation failed." });
            expect(Routes.findOneAndUpdate).toHaveBeenCalledWith(
                { route_id: obj.route_id },
                {
                    user_id: obj.user_id,
                    start_location: obj.start_location,
                    end_location: obj.end_location,
                    duration: obj.duration,
                    route_data: obj.route_data,
                    created_at: expect.any(Date)
                },
                { new: true, upsert: true }
            );
        });

        it("should return success false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Routes.findOneAndUpdate.mockRejectedValue(new Error("Test Error"));

            const obj = {
                route_id: "errorRouteId",
                user_id: "errorUserId",
                start_location: { latitude: 0, longitude: 0 },
                end_location: { latitude: 1, longitude: 1 },
                duration: 100,
                route_data: "errorRouteData"
            };
            const result = await RoutesController.edits(obj);

            expect(result).toEqual({ success: false, message: "Error occurred while processing request." });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error updating or creating record:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("insertRecord", () => {
        it("should return success true if the record is inserted successfully", async () => {
            const mockDoc = { route_id: "someRouteId", user_id: "someUserId" };
            Routes.mockImplementation(() => ({
                save: jest.fn().mockResolvedValue(mockDoc)
            }));

            const obj = {
                route_id: "someRouteId",
                user_id: "someUserId",
                start_location: { latitude: 0, longitude: 0 },
                end_location: { latitude: 1, longitude: 1 },
                duration: 100,
                route_data: "someRouteData"
            };
            const result = await RoutesController.insertRecord(obj);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Routes).toHaveBeenCalledWith({
                route_id: obj.route_id,
                user_id: obj.user_id,
                start_location: obj.start_location,
                end_location: obj.end_location,
                duration: obj.duration,
                route_data: obj.route_data,
                created_at: expect.any(Date)
            });
        });

        it("should return success false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Routes.mockImplementation(() => ({
                save: jest.fn().mockRejectedValue(new Error("Test Error"))
            }));

            const obj = {
                route_id: "errorRouteId",
                user_id: "errorUserId",
                start_location: { latitude: 0, longitude: 0 },
                end_location: { latitude: 1, longitude: 1 },
                duration: 100,
                route_data: "errorRouteData"
            };
            const result = await RoutesController.insertRecord(obj);

            expect(result).toEqual({ success: false, message: "Error occurred while inserting record." });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error inserting record:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });
});
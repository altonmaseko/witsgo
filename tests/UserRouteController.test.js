const UserRoute = require("../src/models/Map/route");
const UserRouteController = require("../src/controllers/Map/UserRouteController");

jest.mock("../src/models/Map/route");

describe("UserRouteController", () => {
    describe("exist", () => {
        it("should return true if the document exists", async () => {
            const query = { route_name: "Test Route" };
            UserRoute.exists.mockResolvedValue(true);

            const result = await UserRouteController.exist(query);

            expect(result).toBe(true);
            expect(UserRoute.exists).toHaveBeenCalledWith(query);
        });

        it("should return false if the document does not exist", async () => {
            const query = { route_name: "Test Route" };
            UserRoute.exists.mockResolvedValue(false);

            const result = await UserRouteController.exist(query);

            expect(result).toBe(false);
            expect(UserRoute.exists).toHaveBeenCalledWith(query);
        });

        it("should return false and log error if an error occurs", async () => {
            const query = { route_name: "Test Route" };
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            UserRoute.exists.mockRejectedValue(new Error("Test Error"));

            const result = await UserRouteController.exist(query);

            expect(result).toBe(false);
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error checking if document exists:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("getDoc", () => {
        it("should return success true and data if a document is found", async () => {
            const query = { route_name: "Test Route" };
            const mockDoc = [{ route_name: "Test Route", distance: 10 }];
            UserRoute.find.mockResolvedValue(mockDoc);

            const result = await UserRouteController.getDoc(query);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(UserRoute.find).toHaveBeenCalledWith(query);
        });

        it("should return success false and message if no document is found", async () => {
            const query = { route_name: "Test Route" };
            UserRoute.find.mockResolvedValue(null);

            const result = await UserRouteController.getDoc(query);

            expect(result).toEqual({ success: false, message: "Document does not exist." });
            expect(UserRoute.find).toHaveBeenCalledWith(query);
        });

        it("should return success false and log error if an error occurs", async () => {
            const query = { route_name: "Test Route" };
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            UserRoute.find.mockRejectedValue(new Error("Test Error"));

            const result = await UserRouteController.getDoc(query);

            expect(result).toEqual({ success: false, message: "Error occurred." });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error retrieving document:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("edits", () => {
        it("should return success true and data if the document is edited or added", async () => {
            const obj = { _id: "1", route_name: "Test Route", distance: 10, estimated_time: 20 };
            const mockDoc = { _id: "1", route_name: "Test Route", distance: 10, estimated_time: 20, created_at: Date.now() };
            UserRoute.findOneAndUpdate.mockResolvedValue(mockDoc);

            const result = await UserRouteController.edits(obj);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(UserRoute.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: obj._id },
                {
                    route_name: obj.route_name,
                    distance: obj.distance,
                    estimated_time: obj.estimated_time,
                    created_at: expect.any(Number)
                },
                { new: true, upsert: true }
            );
        });

        it("should return success false and message if the operation failed", async () => {
            const obj = { _id: "1", route_name: "Test Route", distance: 10, estimated_time: 20 };
            UserRoute.findOneAndUpdate.mockResolvedValue(null);

            const result = await UserRouteController.edits(obj);

            expect(result).toEqual({ success: false, message: "Operation failed" });
            expect(UserRoute.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: obj._id },
                {
                    route_name: obj.route_name,
                    distance: obj.distance,
                    estimated_time: obj.estimated_time,
                    created_at: expect.any(Number)
                },
                { new: true, upsert: true }
            );
        });

        it("should return success false and log error if an error occurs", async () => {
            const obj = { _id: "1", route_name: "Test Route", distance: 10, estimated_time: 20 };
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            UserRoute.findOneAndUpdate.mockRejectedValue(new Error("Test Error"));

            const result = await UserRouteController.edits(obj);

            expect(result).toEqual({ success: false, message: "Error occurred" });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error updating or inserting document:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("insertRecord", () => {
        it("should return success true and data if the document is inserted", async () => {
            const obj = { route_name: "Test Route", distance: 10, estimated_time: 20 };
            const mockDoc = { route_name: "Test Route", distance: 10, estimated_time: 20, created_at: Date.now() };
            UserRoute.prototype.save = jest.fn().mockResolvedValue(mockDoc);

            const result = await UserRouteController.insertRecord(obj);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(UserRoute.prototype.save).toHaveBeenCalled();
        });

        it("should return success false and log error if an error occurs", async () => {
            const obj = { route_name: "Test Route", distance: 10, estimated_time: 20 };
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            UserRoute.prototype.save = jest.fn().mockRejectedValue(new Error("Test Error"));

            const result = await UserRouteController.insertRecord(obj);

            expect(result).toEqual({ success: false, message: "Error occurred" });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error inserting record:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });
});
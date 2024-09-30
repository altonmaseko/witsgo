const UserRoute = require("../src/models/Map/route");
const UserRouteController = require("../src/controllers/Map/UserRouteController");

jest.mock("../src/models/Map/route");

describe("UserRouteController", () => {
    describe("exist", () => {
        it("should return true if document exists", async () => {
            UserRoute.exists.mockResolvedValue(true);

            const query = { name: "Test Route" };
            const result = await UserRouteController.exist(query);

            expect(result).toBe(true);
            expect(UserRoute.exists).toHaveBeenCalledWith(query);
        });

        it("should return false if document does not exist", async () => {
            UserRoute.exists.mockResolvedValue(false);

            const query = { name: "Nonexistent Route" };
            const result = await UserRouteController.exist(query);

            expect(result).toBe(false);
            expect(UserRoute.exists).toHaveBeenCalledWith(query);
        });

        it("should return false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            UserRoute.exists.mockRejectedValue(new Error("Test Error"));

            const query = { name: "Error Route" };
            const result = await UserRouteController.exist(query);

            expect(result).toBe(false);
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error checking if document exists:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("getDoc", () => {
        it("should return document if it exists", async () => {
            const mockDoc = { name: "Test Route" };
            UserRoute.find.mockResolvedValue(mockDoc);

            const query = { name: "Test Route" };
            const result = await UserRouteController.getDoc(query);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(UserRoute.find).toHaveBeenCalledWith(query);
        });

        it("should return success false if document does not exist", async () => {
            UserRoute.find.mockResolvedValue(null);

            const query = { name: "Nonexistent Route" };
            const result = await UserRouteController.getDoc(query);

            expect(result).toEqual({ success: false, message: "Document does not exist." });
            expect(UserRoute.find).toHaveBeenCalledWith(query);
        });

        it("should return success false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            UserRoute.find.mockRejectedValue(new Error("Test Error"));

            const query = { name: "Error Route" };
            const result = await UserRouteController.getDoc(query);

            expect(result).toEqual({ success: false, message: "Error occurred." });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error retrieving document:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("edits", () => {
        it("should return success true if document is updated", async () => {
            const mockDoc = { name: "Updated Route" };
            UserRoute.findOneAndUpdate.mockResolvedValue(mockDoc);

            const obj = { _id: 1, route_name: "Updated Route", distance: 10, estimated_time: 20 };
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

        it("should return success false if operation fails", async () => {
            UserRoute.findOneAndUpdate.mockResolvedValue(null);

            const obj = { _id: 1, route_name: "Updated Route", distance: 10, estimated_time: 20 };
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
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            UserRoute.findOneAndUpdate.mockRejectedValue(new Error("Test Error"));

            const obj = { _id: 1, route_name: "Updated Route", distance: 10, estimated_time: 20 };
            const result = await UserRouteController.edits(obj);

            expect(result).toEqual({ success: false, message: "Error occurred" });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error updating or inserting document:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("insertRecord", () => {
        it("should return success true if document is inserted", async () => {
            const mockDoc = { name: "New Route" };
            UserRoute.prototype.save.mockResolvedValue(mockDoc);

            const obj = { name: "New Route", distance: 10, estimated_time: 20 };
            const result = await UserRouteController.insertRecord(obj);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(UserRoute).toHaveBeenCalledWith(obj);
            expect(UserRoute.prototype.save).toHaveBeenCalled();
        });

        it("should return success false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            UserRoute.prototype.save.mockRejectedValue(new Error("Test Error"));

            const obj = { name: "New Route", distance: 10, estimated_time: 20 };
            const result = await UserRouteController.insertRecord(obj);

            expect(result).toEqual({ success: false, message: "Error occurred" });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error inserting record:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });
});
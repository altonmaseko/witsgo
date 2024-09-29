const NavigationHistory = require("../src/models/UserRoutes/NavigationHistory");
const NavigationHistoryController = require("../src/controllers/UserRoutes/NavigationHistoryController");

jest.mock("../src/models/UserRoutes/NavigationHistory");

describe("NavigationHistoryController", () => {
    describe("exists", () => {
        it("should return true if the record exists", async () => {
            NavigationHistory.exists.mockResolvedValue(true);

            const query = { route_id: "someRouteId" };
            const result = await NavigationHistoryController.exists(query);

            expect(result).toBe(true);
            expect(NavigationHistory.exists).toHaveBeenCalledWith(query);
        });

        it("should return false if the record does not exist", async () => {
            NavigationHistory.exists.mockResolvedValue(false);

            const query = { route_id: "nonexistentRouteId" };
            const result = await NavigationHistoryController.exists(query);

            expect(result).toBe(false);
            expect(NavigationHistory.exists).toHaveBeenCalledWith(query);
        });

        it("should return false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            NavigationHistory.exists.mockRejectedValue(new Error("Test Error"));

            const query = { route_id: "errorRouteId" };
            const result = await NavigationHistoryController.exists(query);

            expect(result).toBe(false);
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error checking if document exists:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("addRecord", () => {
        it("should return success false if the record already exists", async () => {
            jest.spyOn(NavigationHistoryController, "exists").mockResolvedValue(true);

            const recordInfo = { route_id: "existingRouteId" };
            const result = await NavigationHistoryController.addRecord(recordInfo);

            expect(result).toEqual({ success: false, message: "document_already_exists" });
            expect(NavigationHistoryController.exists).toHaveBeenCalledWith({ route_id: recordInfo.route_id });
        });

        it("should return success true if the record is added successfully", async () => {
            jest.spyOn(NavigationHistoryController, "exists").mockResolvedValue(false);
            const mockDoc = new NavigationHistory({ route_id: "newRouteId" });
            NavigationHistory.mockImplementation(() => mockDoc);
            mockDoc.save = jest.fn().mockResolvedValue(mockDoc);

            const recordInfo = { route_id: "newRouteId" };
            const result = await NavigationHistoryController.addRecord(recordInfo);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(NavigationHistoryController.exists).toHaveBeenCalledWith({ route_id: recordInfo.route_id });
            expect(mockDoc.save).toHaveBeenCalled();
        });

        it("should return success false and log error if an error occurs", async () => {
            jest.spyOn(NavigationHistoryController, "exists").mockResolvedValue(false);
            const mockDoc = new NavigationHistory({ route_id: "errorRouteId" });
            NavigationHistory.mockImplementation(() => mockDoc);
            mockDoc.save = jest.fn().mockRejectedValue(new Error("Test Error"));

            const recordInfo = { route_id: "errorRouteId" };
            const result = await NavigationHistoryController.addRecord(recordInfo);

            expect(result).toEqual({ success: false, message: "Test Error" });
            expect(NavigationHistoryController.exists).toHaveBeenCalledWith({ route_id: recordInfo.route_id });
            expect(mockDoc.save).toHaveBeenCalled();
        });
    });
});
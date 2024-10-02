const NavigationHistory = require("../src/models/UserRoutes/NavigationHistory");
const NavigationHistoryController = require("../src/controllers/UserRoutes/NavigationHistoryController");

jest.mock("../src/models/UserRoutes/NavigationHistory");

describe("NavigationHistoryController", () => {
    describe("exists", () => {
        it("should return true if the document exists", async () => {
            const query = { route_id: "routeId1" };
            NavigationHistory.exists.mockResolvedValue(true);

            const result = await NavigationHistoryController.exists(query);

            expect(result).toBe(true);
            expect(NavigationHistory.exists).toHaveBeenCalledWith(query);
        });

        it("should return false if the document does not exist", async () => {
            const query = { route_id: "routeId1" };
            NavigationHistory.exists.mockResolvedValue(false);

            const result = await NavigationHistoryController.exists(query);

            expect(result).toBe(false);
            expect(NavigationHistory.exists).toHaveBeenCalledWith(query);
        });

        it("should return false and log error if an error occurs", async () => {
            const query = { route_id: "routeId1" };
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            NavigationHistory.exists.mockRejectedValue(new Error("Test Error"));

            const result = await NavigationHistoryController.exists(query);

            expect(result).toBe(false);
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error checking if document exists:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("addRecord", () => {
        it("should return success false if the document already exists", async () => {
            const recordInfo = { route_id: "routeId1" };
            NavigationHistory.exists.mockResolvedValue(true);

            const result = await NavigationHistoryController.addRecord(recordInfo);

            expect(result).toEqual({ success: false, message: "document_already_exists" });
            expect(NavigationHistory.exists).toHaveBeenCalledWith({ route_id: recordInfo.route_id });
        });

        it("should return success true if the document is added", async () => {
            const recordInfo = { route_id: "routeId1" };
            const mockDoc = { _id: "docId1", route_id: "routeId1" };
            NavigationHistory.exists.mockResolvedValue(false);
            NavigationHistory.prototype.save = jest.fn().mockResolvedValue(mockDoc);

            const result = await NavigationHistoryController.addRecord(recordInfo);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(NavigationHistory.exists).toHaveBeenCalledWith({ route_id: recordInfo.route_id });
            expect(NavigationHistory.prototype.save).toHaveBeenCalled();
        });

        it("should return success false and log error if an error occurs", async () => {
            const recordInfo = { route_id: "routeId1" };
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            NavigationHistory.exists.mockRejectedValue(new Error("Test Error"));

            const result = await NavigationHistoryController.addRecord(recordInfo);

            expect(result).toEqual({ success: false, message: "Test Error" });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error checking if document exists:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });
});
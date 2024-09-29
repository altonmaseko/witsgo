const mongoose = require('mongoose');
const AccessibleRoute = require("../src/models/Accessibility/accessibleRoute");
const AccessibleRouteController = require("../src/controllers/Accessibility/AccessibleRouteController");

jest.mock("../src/models/Accessibility/accessibleRoute");

// Setup and teardown to ensure connections are properly opened and closed
beforeAll(async () => {
    // Mock or open your connections here, or ensure they are established
});

afterAll(async () => {
    // Ensure proper cleanup of asynchronous operations
    await mongoose.disconnect(); // Close any open connections
});

describe("AccessibleRouteController", () => {
    describe("exists", () => {
        it("should return true if document exists", async () => {
            AccessibleRoute.exists.mockResolvedValue(true);

            const query = { name: "Test Route" };
            const result = await AccessibleRouteController.exists(query);

            expect(result).toBe(true);
            expect(AccessibleRoute.exists).toHaveBeenCalledWith(query);
        });

        it("should return false if document does not exist", async () => {
            AccessibleRoute.exists.mockResolvedValue(false);

            const query = { name: "Nonexistent Route" };
            const result = await AccessibleRouteController.exists(query);

            expect(result).toBe(false);
            expect(AccessibleRoute.exists).toHaveBeenCalledWith(query);
        });

        it("should return false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            AccessibleRoute.exists.mockRejectedValue(new Error("Test Error"));

            const query = { name: "Error Route" };
            const result = await AccessibleRouteController.exists(query);

            expect(result).toBe(false);
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error checking if document exists:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("getDoc", () => {
        it("should return document if it exists", async () => {
            const mockDoc = { name: "Test Route" };
            AccessibleRoute.find.mockResolvedValue(mockDoc);

            const query = { name: "Test Route" };
            const result = await AccessibleRouteController.getDoc(query);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(AccessibleRoute.find).toHaveBeenCalledWith(query);
        });

        it("should return success false if document does not exist", async () => {
            AccessibleRoute.find.mockResolvedValue(null);

            const query = { name: "Nonexistent Route" };
            const result = await AccessibleRouteController.getDoc(query);

            expect(result).toEqual({ success: false, message: "Document does not exist." });
            expect(AccessibleRoute.find).toHaveBeenCalledWith(query);
        });

        it("should return success false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            AccessibleRoute.find.mockRejectedValue(new Error("Test Error"));

            const query = { name: "Error Route" };
            const result = await AccessibleRouteController.getDoc(query);

            expect(result).toEqual({ success: false, message: "Error occurred" });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error getting document:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });
});

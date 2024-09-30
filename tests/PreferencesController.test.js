const Preferences = require("../src/models/UserRoutes/Preferences");
const PreferencesController = require("../src/controllers/UserRoutes/PreferencesController");

jest.mock("../src/models/UserRoutes/Preferences");

describe("PreferencesController", () => {
    describe("exist", () => {
        it("should return true if the record exists", async () => {
            Preferences.exists.mockResolvedValue(true);

            const query = { user_id: "someUserId" };
            const result = await PreferencesController.exist(query);

            expect(result).toBe(true);
            expect(Preferences.exists).toHaveBeenCalledWith(query);
        });

        it("should return false if the record does not exist", async () => {
            Preferences.exists.mockResolvedValue(false);

            const query = { user_id: "nonexistentUserId" };
            const result = await PreferencesController.exist(query);

            expect(result).toBe(false);
            expect(Preferences.exists).toHaveBeenCalledWith(query);
        });

        it("should return false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Preferences.exists.mockRejectedValue(new Error("Test Error"));

            const query = { user_id: "errorUserId" };
            const result = await PreferencesController.exist(query);

            expect(result).toBe(false);
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error checking if document exists:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("getDoc", () => {
        it("should return success true if the document is found", async () => {
            const mockDoc = [{ user_id: "someUserId", preferences_type: "someType", preferences_value: "someValue" }];
            Preferences.find.mockResolvedValue(mockDoc);

            const query = { user_id: "someUserId" };
            const result = await PreferencesController.getDoc(query);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Preferences.find).toHaveBeenCalledWith(query);
        });

        it("should return success false if the document is not found", async () => {
            Preferences.find.mockResolvedValue(null);

            const query = { user_id: "nonexistentUserId" };
            const result = await PreferencesController.getDoc(query);

            expect(result).toEqual({ success: false, message: "Document does not exist." });
            expect(Preferences.find).toHaveBeenCalledWith(query);
        });

        it("should return success false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Preferences.find.mockRejectedValue(new Error("Test Error"));

            const query = { user_id: "errorUserId" };
            const result = await PreferencesController.getDoc(query);

            expect(result).toBe(false);
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error checking if document exists:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("edits", () => {
        it("should return success true if the document is updated or added successfully", async () => {
            const mockDoc = { user_id: "someUserId", preferences_type: "someType", preferences_value: "someValue" };
            Preferences.findOneAndReplace.mockResolvedValue(mockDoc);

            const obj = { user_id: "someUserId", preference_type: "someType", preferences_value: "someValue" };
            const result = await PreferencesController.edits(obj);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Preferences.findOneAndReplace).toHaveBeenCalledWith(
                { user_id: obj.user_id, preferences_type: obj.preference_type },
                { user_id: obj.user_id, preferences_type: obj.preference_type, preferences_value: obj.preferences_value, updated_at: expect.any(Date) },
                { new: true, upsert: true }
            );
        });

        it("should return success false if the operation fails", async () => {
            Preferences.findOneAndReplace.mockResolvedValue(null);

            const obj = { user_id: "someUserId", preference_type: "someType", preferences_value: "someValue" };
            const result = await PreferencesController.edits(obj);

            expect(result).toEqual({ success: false, message: "operation_failed" });
            expect(Preferences.findOneAndReplace).toHaveBeenCalledWith(
                { user_id: obj.user_id, preferences_type: obj.preference_type },
                { user_id: obj.user_id, preferences_type: obj.preference_type, preferences_value: obj.preferences_value, updated_at: expect.any(Date) },
                { new: true, upsert: true }
            );
        });

        it("should return success false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Preferences.findOneAndReplace.mockRejectedValue(new Error("Test Error"));

            const obj = { user_id: "errorUserId", preference_type: "errorType", preferences_value: "errorValue" };
            const result = await PreferencesController.edits(obj);

            expect(result).toEqual({ success: false, message: "error_occurred" });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error generating record:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });
});
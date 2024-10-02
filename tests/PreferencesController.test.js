const Preferences = require("../src/models/UserRoutes/Preferences");
const PreferencesController = require("../src/controllers/UserRoutes/PreferencesController");

jest.mock("../src/models/UserRoutes/Preferences");

describe("PreferencesController", () => {
    describe("exists", () => {
        it("should return true if the document exists", async () => {
            const query = { user_id: "userId1" };
            Preferences.exists.mockResolvedValue(true);

            const result = await PreferencesController.exists(query);

            expect(result).toBe(true);
            expect(Preferences.exists).toHaveBeenCalledWith(query);
        });

        it("should return false if the document does not exist", async () => {
            const query = { user_id: "userId1" };
            Preferences.exists.mockResolvedValue(false);

            const result = await PreferencesController.exists(query);

            expect(result).toBe(false);
            expect(Preferences.exists).toHaveBeenCalledWith(query);
        });

        it("should return false and log error if an error occurs", async () => {
            const query = { user_id: "userId1" };
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Preferences.exists.mockRejectedValue(new Error("Test Error"));

            const result = await PreferencesController.exists(query);

            expect(result).toBe(false);
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error checking if document exists:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("getDoc", () => {
        it("should return success true and data if documents are found", async () => {
            const query = { user_id: "userId1" };
            const mockDocs = [{ user_id: "userId1", preferences_type: "type1", preferences_value: "value1" }];
            Preferences.find.mockResolvedValue(mockDocs);

            const result = await PreferencesController.getDoc(query);

            expect(result).toEqual({ success: true, data: mockDocs });
            expect(Preferences.find).toHaveBeenCalledWith(query);
        });

        it("should return success false and message if no documents are found", async () => {
            const query = { user_id: "userId1" };
            Preferences.find.mockResolvedValue([]);

            const result = await PreferencesController.getDoc(query);

            expect(result).toEqual({ success: false, message: "Document does not exist." });
            expect(Preferences.find).toHaveBeenCalledWith(query);
        });

        it("should return success false and log error if an error occurs", async () => {
            const query = { user_id: "userId1" };
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Preferences.find.mockRejectedValue(new Error("Test Error"));

            const result = await PreferencesController.getDoc(query);

            expect(result).toEqual({ success: false, message: "Error occurred while retrieving document." });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error retrieving document:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("edits", () => {
        it("should return success true and data if the document is edited or added", async () => {
            const obj = { user_id: "userId1", preferences_type: "type1", preferences_value: "value1" };
            const mockDoc = { user_id: "userId1", preferences_type: "type1", preferences_value: "value1", updated_at: Date.now() };
            Preferences.findOneAndReplace.mockResolvedValue(mockDoc);

            const result = await PreferencesController.edits(obj);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Preferences.findOneAndReplace).toHaveBeenCalledWith(
                { user_id: obj.user_id },
                {
                    user_id: obj.user_id,
                    preferences_type: obj.preferences_type,
                    preferences_value: obj.preferences_value,
                    updated_at: expect.any(Number)
                },
                { new: true, upsert: true }
            );
        });

        it("should return success false and message if the operation failed", async () => {
            const obj = { user_id: "userId1", preferences_type: "type1", preferences_value: "value1" };
            Preferences.findOneAndReplace.mockResolvedValue(null);

            const result = await PreferencesController.edits(obj);

            expect(result).toEqual({ success: false, message: "Operation failed" });
            expect(Preferences.findOneAndReplace).toHaveBeenCalledWith(
                { user_id: obj.user_id },
                {
                    user_id: obj.user_id,
                    preferences_type: obj.preferences_type,
                    preferences_value: obj.preferences_value,
                    updated_at: expect.any(Number)
                },
                { new: true, upsert: true }
            );
        });

        it("should return success false and log error if an error occurs", async () => {
            const obj = { user_id: "userId1", preferences_type: "type1", preferences_value: "value1" };
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Preferences.findOneAndReplace.mockRejectedValue(new Error("Test Error"));

            const result = await PreferencesController.edits(obj);

            expect(result).toEqual({ success: false, message: "Error occurred while editing record." });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error editing record:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });
});
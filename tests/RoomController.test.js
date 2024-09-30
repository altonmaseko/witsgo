const Room = require("../src/models/Map/room");
const RoomController = require("../src/controllers/Map/RoomController");

jest.mock("../src/models/Map/room");

describe("RoomController", () => {
    describe("exist", () => {
        it("should return true if document exists", async () => {
            Room.exists.mockResolvedValue(true);

            const query = { name: "Test Room" };
            const result = await RoomController.exist(query);

            expect(result).toBe(true);
            expect(Room.exists).toHaveBeenCalledWith(query);
        });

        it("should return false if document does not exist", async () => {
            Room.exists.mockResolvedValue(false);

            const query = { name: "Nonexistent Room" };
            const result = await RoomController.exist(query);

            expect(result).toBe(false);
            expect(Room.exists).toHaveBeenCalledWith(query);
        });

        it("should return false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Room.exists.mockRejectedValue(new Error("Test Error"));

            const query = { name: "Error Room" };
            const result = await RoomController.exist(query);

            expect(result).toBe(false);
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error checking if document exists:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("getDoc", () => {
        it("should return document if it exists", async () => {
            const mockDoc = { name: "Test Room" };
            Room.find.mockResolvedValue(mockDoc);

            const query = { name: "Test Room" };
            const result = await RoomController.getDoc(query);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Room.find).toHaveBeenCalledWith(query);
        });

        it("should return success false if document does not exist", async () => {
            Room.find.mockResolvedValue(null);

            const query = { name: "Nonexistent Room" };
            const result = await RoomController.getDoc(query);

            expect(result).toEqual({ success: false, message: "Document does not exist." });
            expect(Room.find).toHaveBeenCalledWith(query);
        });

        it("should return success false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Room.find.mockRejectedValue(new Error("Test Error"));

            const query = { name: "Error Room" };
            const result = await RoomController.getDoc(query);

            expect(result).toEqual({ success: false, message: "Error occurred." });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error retrieving document:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("edits", () => {
        it("should return success true if document is updated", async () => {
            const mockDoc = { name: "Updated Room" };
            Room.findOneAndUpdate.mockResolvedValue(mockDoc);

            const obj = { _id: 1, room_name: "Updated Room", building_id: 1, code: "R001", type: "Lecture" };
            const result = await RoomController.edits(obj);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Room.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: obj._id },
                {
                    room_name: obj.room_name,
                    building_id: obj.building_id,
                    code: obj.code,
                    type: obj.type,
                    created_at: expect.any(Number)
                },
                { new: true, upsert: true }
            );
        });

        it("should return success false if operation fails", async () => {
            Room.findOneAndUpdate.mockResolvedValue(null);

            const obj = { _id: 1, room_name: "Updated Room", building_id: 1, code: "R001", type: "Lecture" };
            const result = await RoomController.edits(obj);

            expect(result).toEqual({ success: false, message: "Operation failed" });
            expect(Room.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: obj._id },
                {
                    room_name: obj.room_name,
                    building_id: obj.building_id,
                    code: obj.code,
                    type: obj.type,
                    created_at: expect.any(Number)
                },
                { new: true, upsert: true }
            );
        });

        it("should return success false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Room.findOneAndUpdate.mockRejectedValue(new Error("Test Error"));

            const obj = { _id: 1, room_name: "Updated Room", building_id: 1, code: "R001", type: "Lecture" };
            const result = await RoomController.edits(obj);

            expect(result).toEqual({ success: false, message: "Error occurred" });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error updating or inserting document:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe("insertRecord", () => {
        it("should return success true if document is inserted", async () => {
            const mockDoc = { name: "New Room" };
            Room.prototype.save.mockResolvedValue(mockDoc);

            const obj = { name: "New Room", building_id: 1, code: "R002", type: "Lab" };
            const result = await RoomController.insertRecord(obj);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Room).toHaveBeenCalledWith(obj);
            expect(Room.prototype.save).toHaveBeenCalled();
        });

        it("should return success false and log error if an error occurs", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
            Room.prototype.save.mockRejectedValue(new Error("Test Error"));

            const obj = { name: "New Room", building_id: 1, code: "R002", type: "Lab" };
            const result = await RoomController.insertRecord(obj);

            expect(result).toEqual({ success: false, message: "Error occurred" });
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error inserting record:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });
});
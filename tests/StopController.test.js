const Stop = require('../src/models/Transportation/stop');
const StopController = require('../src/controllers/Transportation/StopController');

jest.mock('../src/models/Transportation/stop');

describe('StopController', () => {
    describe('exist', () => {
        it('should return true if the document exists', async () => {
            const query = { stop_id: 'stopId1' };
            Stop.exists.mockResolvedValue(true);

            const result = await StopController.exist(query);

            expect(result).toBe(true);
            expect(Stop.exists).toHaveBeenCalledWith(query);
        });

        it('should return false if the document does not exist', async () => {
            const query = { stop_id: 'stopId1' };
            Stop.exists.mockResolvedValue(false);

            const result = await StopController.exist(query);

            expect(result).toBe(false);
            expect(Stop.exists).toHaveBeenCalledWith(query);
        });

        it('should handle errors and return false', async () => {
            const query = { stop_id: 'stopId1' };
            Stop.exists.mockRejectedValue(new Error('Test Error'));

            const result = await StopController.exist(query);

            expect(result).toBe(false);
            expect(Stop.exists).toHaveBeenCalledWith(query);
        });
    });

    describe('getDoc', () => {
        it('should retrieve the document', async () => {
            const query = { stop_id: 'stopId1' };
            const mockDoc = [{ stop_id: 'stopId1', name: 'Stop 1' }];
            Stop.find.mockResolvedValue(mockDoc);

            const result = await StopController.getDoc(query);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Stop.find).toHaveBeenCalledWith(query);
        });

        it('should return a failure message if the document does not exist', async () => {
            const query = { stop_id: 'stopId1' };
            Stop.find.mockResolvedValue(null);

            const result = await StopController.getDoc(query);

            expect(result).toEqual({ success: false, message: 'Document does not exist.' });
            expect(Stop.find).toHaveBeenCalledWith(query);
        });

        it('should handle errors and return a failure message', async () => {
            const query = { stop_id: 'stopId1' };
            Stop.find.mockRejectedValue(new Error('Test Error'));

            const result = await StopController.getDoc(query);

            expect(result).toEqual({ success: false, message: 'Error occurred while retrieving document.' });
            expect(Stop.find).toHaveBeenCalledWith(query);
        });
    });

    describe('edits', () => {
        it('should update the document and return success', async () => {
            const obj = { _id: 'stopId1', stop_name: 'New Stop Name', location: 'New Location' };
            const mockDoc = { _id: 'stopId1', stop_name: 'New Stop Name', location: 'New Location' };
            Stop.findOneAndUpdate.mockResolvedValue(mockDoc);

            const result = await StopController.edits(obj);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Stop.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: obj._id },
                { stop_name: obj.stop_name, location: obj.location },
                { new: true, upsert: true }
            );
        });

        it('should return a failure message if the update fails', async () => {
            const obj = { _id: 'stopId1', stop_name: 'New Stop Name', location: 'New Location' };
            Stop.findOneAndUpdate.mockResolvedValue(null);

            const result = await StopController.edits(obj);

            expect(result).toEqual({ success: false, message: 'Operation failed.' });
            expect(Stop.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: obj._id },
                { stop_name: obj.stop_name, location: obj.location },
                { new: true, upsert: true }
            );
        });

        it('should handle errors and return a failure message', async () => {
            const obj = { _id: 'stopId1', stop_name: 'New Stop Name', location: 'New Location' };
            Stop.findOneAndUpdate.mockRejectedValue(new Error('Test Error'));

            const result = await StopController.edits(obj);

            expect(result).toEqual({ success: false, message: 'Error occurred while processing request.' });
            expect(Stop.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: obj._id },
                { stop_name: obj.stop_name, location: obj.location },
                { new: true, upsert: true }
            );
        });
    });

    describe('insertRecord', () => {
        it('should insert a new record and return success', async () => {
            const obj = { stop_name: 'Stop Name', location: 'Location' };
            const mockDoc = { _id: 'stopId1', stop_name: 'Stop Name', location: 'Location' };
            Stop.create.mockResolvedValue(mockDoc);

            const result = await StopController.insertRecord(obj);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Stop.create).toHaveBeenCalledWith(obj);
        });

        it('should handle errors and return a failure message', async () => {
            const obj = { stop_name: 'Stop Name', location: 'Location' };
            Stop.create.mockRejectedValue(new Error('Test Error'));

            const result = await StopController.insertRecord(obj);

            expect(result).toEqual({ success: false, message: 'Error occurred while inserting record.' });
            expect(Stop.create).toHaveBeenCalledWith(obj);
        });
    });
});
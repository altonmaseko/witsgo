const Schedule = require('../src/models/Transportation/schedule');
const ScheduleController = require('../src/controllers/Transportation/ScheduleController');

jest.mock('../src/models/Transportation/schedule');

describe('ScheduleController', () => {
    describe('exist', () => {
        it('should return true if schedule exists', async () => {
            Schedule.exists.mockResolvedValue(true);

            const query = { name: 'Test Schedule' };
            const result = await ScheduleController.exist(query);

            expect(result).toBe(true);
            expect(Schedule.exists).toHaveBeenCalledWith(query);
        });

        it('should return false if schedule does not exist', async () => {
            Schedule.exists.mockResolvedValue(false);

            const query = { name: 'Nonexistent Schedule' };
            const result = await ScheduleController.exist(query);

            expect(result).toBe(false);
            expect(Schedule.exists).toHaveBeenCalledWith(query);
        });

        it('should return false and log error if an error occurs', async () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            Schedule.exists.mockRejectedValue(new Error('Test Error'));

            const query = { name: 'Error Schedule' };
            const result = await ScheduleController.exist(query);

            expect(result).toBe(false);
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error checking if document exists:', expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe('getDoc', () => {
        it('should return document if it exists', async () => {
            const mockDoc = { name: 'Test Schedule' };
            Schedule.find.mockReturnValue({
                populate: jest.fn().mockResolvedValue(mockDoc),
            });

            const query = { name: 'Test Schedule' };
            const result = await ScheduleController.getDoc(query);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Schedule.find).toHaveBeenCalledWith(query);
        });

        it('should return success false if document does not exist', async () => {
            Schedule.find.mockReturnValue({
                populate: jest.fn().mockResolvedValue(null),
            });

            const query = { name: 'Nonexistent Schedule' };
            const result = await ScheduleController.getDoc(query);

            expect(result).toEqual({ success: false, message: 'Document does not exist.' });
            expect(Schedule.find).toHaveBeenCalledWith(query);
        });

        it('should return success false and log error if an error occurs', async () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            Schedule.find.mockReturnValue({
                populate: jest.fn().mockRejectedValue(new Error('Test Error')),
            });

            const query = { name: 'Error Schedule' };
            const result = await ScheduleController.getDoc(query);

            expect(result).toEqual({ success: false, message: 'Error occurred while retrieving document.' });
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error retrieving document:', expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe('insertRecord', () => {
        it('should return success true if document is inserted', async () => {
            const mockDoc = { name: 'New Schedule' };
            Schedule.create.mockResolvedValue(mockDoc);

            const obj = { name: 'New Schedule' };
            const result = await ScheduleController.insertRecord(obj);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Schedule.create).toHaveBeenCalledWith(obj);
        });

        it('should return success false and log error if an error occurs', async () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            Schedule.create.mockRejectedValue(new Error('Test Error'));

            const obj = { name: 'New Schedule' };
            const result = await ScheduleController.insertRecord(obj);

            expect(result).toEqual({ success: false, message: 'Error occurred while inserting record.' });
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error inserting record:', expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe('edits', () => {
        it('should return success true if document is updated', async () => {
            const mockDoc = { name: 'Updated Schedule' };
            Schedule.findOneAndUpdate.mockResolvedValue(mockDoc);

            const obj = { _id: 1, route_id: 'route1', stop_id: 'stop1', arrival_time: '10:00', departure_time: '10:30' };
            const result = await ScheduleController.edits(obj);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Schedule.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: obj._id },
                { route_id: obj.route_id, stop_id: obj.stop_id, arrival_time: obj.arrival_time, departure_time: obj.departure_time },
                { new: true, upsert: true }
            );
        });

        it('should return success false if document does not exist', async () => {
            Schedule.findOneAndUpdate.mockResolvedValue(null);

            const obj = { _id: 1, route_id: 'route1', stop_id: 'stop1', arrival_time: '10:00', departure_time: '10:30' };
            const result = await ScheduleController.edits(obj);

            expect(result).toEqual({ success: false, message: 'Operation failed.' });
            expect(Schedule.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: obj._id },
                { route_id: obj.route_id, stop_id: obj.stop_id, arrival_time: obj.arrival_time, departure_time: obj.departure_time },
                { new: true, upsert: true }
            );
        });

        it('should return success false and log error if an error occurs', async () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            Schedule.findOneAndUpdate.mockRejectedValue(new Error('Test Error'));

            const obj = { _id: 1, route_id: 'route1', stop_id: 'stop1', arrival_time: '10:00', departure_time: '10:30' };
            const result = await ScheduleController.edits(obj);

            expect(result).toEqual({ success: false, message: 'Error occurred while processing request.' });
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error updating document:', expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });
});

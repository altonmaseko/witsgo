const Schedule = require('../src/models/Transportation/schedule');
const ScheduleController = require('../src/controllers/Transportation/ScheduleController');

jest.mock('../src/models/Transportation/schedule');

describe('ScheduleController', () => {
    describe('exist', () => {
        it('should return true if the document exists', async () => {
            const query = { schedule_id: 'scheduleId1' };
            Schedule.exists.mockResolvedValue(true);

            const result = await ScheduleController.exist(query);

            expect(result).toBe(true);
            expect(Schedule.exists).toHaveBeenCalledWith(query);
        });

        it('should return false if the document does not exist', async () => {
            const query = { schedule_id: 'scheduleId1' };
            Schedule.exists.mockResolvedValue(false);

            const result = await ScheduleController.exist(query);

            expect(result).toBe(false);
            expect(Schedule.exists).toHaveBeenCalledWith(query);
        });

        it('should handle errors and return false', async () => {
            const query = { schedule_id: 'scheduleId1' };
            Schedule.exists.mockRejectedValue(new Error('Test Error'));

            const result = await ScheduleController.exist(query);

            expect(result).toBe(false);
            expect(Schedule.exists).toHaveBeenCalledWith(query);
        });
    });

    describe('getDoc', () => {
        it('should retrieve and populate the document', async () => {
            const query = { schedule_id: 'scheduleId1' };
            const mockDoc = [{ schedule_id: 'scheduleId1', route_id: 'routeId1', stop_id: 'stopId1' }];

            const populateMock = jest.fn().mockReturnThis();
            populateMock.mockResolvedValue(mockDoc);
            Schedule.find.mockReturnValue({ populate: populateMock });

            const result = await ScheduleController.getDoc(query);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Schedule.find).toHaveBeenCalledWith(query);
            expect(populateMock).toHaveBeenCalledWith('route_id');
            expect(populateMock).toHaveBeenCalledWith('stop_id');
        });

        it('should return a failure message if the document does not exist', async () => {
            const query = { schedule_id: 'scheduleId1' };
            const populateMock = jest.fn().mockReturnThis();
            populateMock.mockResolvedValue(null);
            Schedule.find.mockReturnValue({ populate: populateMock });

            const result = await ScheduleController.getDoc(query);

            expect(result).toEqual({ success: false, message: 'Document does not exist.' });
            expect(Schedule.find).toHaveBeenCalledWith(query);
        });

        it('should handle errors and return a failure message', async () => {
            const query = { schedule_id: 'scheduleId1' };
            const populateMock = jest.fn().mockReturnThis();
            populateMock.mockRejectedValue(new Error('Test Error'));
            Schedule.find.mockReturnValue({ populate: populateMock });

            const result = await ScheduleController.getDoc(query);

            expect(result).toEqual({ success: false, message: 'Error occurred while retrieving document.' });
            expect(Schedule.find).toHaveBeenCalledWith(query);
        });
    });
});
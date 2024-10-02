const Schedule = require('../src/models/Transportation/schedule');
const ScheduleController = require('../src/controllers/Transportation/ScheduleController');

jest.mock('../src/models/Transportation/schedule');



describe('ScheduleController', () => {
    describe('exist', () => {
        it('should return true if the document exists', async () => {
            const query = { route_id: 'routeId1' };
            Schedule.exists.mockResolvedValue(true);

            const result = await ScheduleController.exist(query);

            expect(result).toBe(true);
            expect(Schedule.exists).toHaveBeenCalledWith(query);
        });

        it('should return false if the document does not exist', async () => {
            const query = { route_id: 'routeId1' };
            Schedule.exists.mockResolvedValue(false);

            const result = await ScheduleController.exist(query);

            expect(result).toBe(false);
            expect(Schedule.exists).toHaveBeenCalledWith(query);
        });
    });

    describe('getDoc', () => {
        it('should retrieve and populate the document', async () => {
            const query = { route_id: 'routeId1' };
            const mockDoc = { route_id: 'routeId1', name: 'Route 1' };

            const populateMock = jest.fn().mockResolvedValue(mockDoc);
            Schedule.find.mockReturnValue({ populate: populateMock });

            const result = await ScheduleController.getDoc(query);

            expect(result).toEqual(mockDoc);
            expect(Schedule.find).toHaveBeenCalledWith(query);
            expect(populateMock).toHaveBeenCalledWith('relatedField');
        });

        it('should handle errors when retrieving the document', async () => {
            const query = { route_id: 'routeId1' };
            Schedule.find.mockReturnValue({ populate: jest.fn().mockRejectedValue(new Error('Test Error')) });

            const result = await ScheduleController.getDoc(query);

            expect(result).toEqual({ success: false, message: 'Error occurred while retrieving document.' });
            expect(Schedule.find).toHaveBeenCalledWith(query);
        });
    });
});
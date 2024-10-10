const Station = require('../src/models/Rental/station');
const StationController = require('../src/controllers/RentalService/StationController');

jest.mock('../src/models/Rental/station');

describe('StationController', () => {
    describe('getStations', () => {
        it('should return all stations successfully', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const mockStations = [{ _id: 'stationId1' }, { _id: 'stationId2' }];
            Station.find.mockResolvedValue(mockStations);

            await StationController.getStations(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockStations);
        });

        it('should return 500 if an error occurs', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Station.find.mockRejectedValue(new Error('Test Error'));

            await StationController.getStations(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Test Error' });
        });
    });

    describe('getStationById', () => {
        it('should return a station successfully', async () => {
            const req = {
                params: {
                    id: 'stationId1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const mockStation = { _id: 'stationId1' };
            Station.findById.mockResolvedValue(mockStation);

            await StationController.getStationById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockStation);
        });

        it('should return 404 if station is not found', async () => {
            const req = {
                params: {
                    id: 'stationId1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Station.findById.mockResolvedValue(null);

            await StationController.getStationById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Station not found' });
        });

        it('should return 500 if an error occurs', async () => {
            const req = {
                params: {
                    id: 'stationId1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Station.findById.mockRejectedValue(new Error('Test Error'));

            await StationController.getStationById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Test Error' });
        });
    });
});
const Vehicle = require('../src/models/Rental/vehicle');
const VehicleController = require('../src/controllers/RentalService/VehicleController');

jest.mock('../src/models/Rental/vehicle');

describe('VehicleController', () => {
    describe('getVehicles', () => {
        it('should return all vehicles successfully', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const mockVehicles = [{ _id: 'vehicleId1' }, { _id: 'vehicleId2' }];
            Vehicle.find.mockResolvedValue(mockVehicles);

            await VehicleController.getVehicles(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockVehicles);
        });

        it('should return 500 if an error occurs', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Vehicle.find.mockRejectedValue(new Error('Test Error'));

            await VehicleController.getVehicles(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Test Error' });
        });
    });

    describe('getVehicleById', () => {
        it('should return a vehicle successfully', async () => {
            const req = {
                params: {
                    id: 'vehicleId1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const mockVehicle = { _id: 'vehicleId1' };
            Vehicle.findById.mockResolvedValue(mockVehicle);

            await VehicleController.getVehicleById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockVehicle);
        });

        it('should return 404 if vehicle is not found', async () => {
            const req = {
                params: {
                    id: 'vehicleId1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Vehicle.findById.mockResolvedValue(null);

            await VehicleController.getVehicleById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Vehicle not found' });
        });

        it('should return 500 if an error occurs', async () => {
            const req = {
                params: {
                    id: 'vehicleId1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Vehicle.findById.mockRejectedValue(new Error('Test Error'));

            await VehicleController.getVehicleById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Test Error' });
        });
    });
});
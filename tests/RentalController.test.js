const Rental = require('../src/models/Rental/rental');
const Vehicle = require('../src/models/Rental/vehicle');
const Station = require('../src/models/Rental/station');
const RentalController = require('../src/controllers/RentalService/RentalController');

jest.mock('../src/models/Rental/rental');
jest.mock('../src/models/Rental/vehicle');
jest.mock('../src/models/Rental/station');

describe('RentalController', () => {
    describe('rentVehicle', () => {
        it('should rent a vehicle successfully', async () => {
            const req = {
                body: {
                    vehicleId: 'vehicleId1',
                    stationId: 'stationId1',
                    userId: 'userId1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Vehicle.findById.mockResolvedValue({ _id: 'vehicleId1', isAvailable: true, save: jest.fn() });
            Station.findById.mockResolvedValue({ _id: 'stationId1', vehicles: ['vehicleId1'], save: jest.fn() });
            Rental.prototype.save = jest.fn().mockResolvedValue({ _id: 'rentalId1' });

            await RentalController.rentVehicle(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true, message: 'Vehicle rented successfully' }));
        });

        it('should return 400 if vehicle is not available', async () => {
            const req = {
                body: {
                    vehicleId: 'vehicleId1',
                    stationId: 'stationId1',
                    userId: 'userId1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Vehicle.findById.mockResolvedValue({ _id: 'vehicleId1', isAvailable: false });

            await RentalController.rentVehicle(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Vehicle not available' });
        });

        it('should return 500 if an error occurs', async () => {
            const req = {
                body: {
                    vehicleId: 'vehicleId1',
                    stationId: 'stationId1',
                    userId: 'userId1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Vehicle.findById.mockRejectedValue(new Error('Test Error'));

            await RentalController.rentVehicle(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Test Error' });
        });
    });

    describe('returnVehicle', () => {
        it('should return a vehicle successfully', async () => {
            const req = {
                body: {
                    vehicleId: 'vehicleId1',
                    stationId: 'stationId1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Rental.findOneAndDelete.mockResolvedValue({ _id: 'rentalId1' });
            Vehicle.findById.mockResolvedValue({ _id: 'vehicleId1', isAvailable: false, save: jest.fn() });
            Station.findById.mockResolvedValue({ _id: 'stationId1', vehicles: [], save: jest.fn() });

            await RentalController.returnVehicle(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        });

        it('should return 404 if rental is not found', async () => {
            const req = {
                body: {
                    vehicleId: 'vehicleId1',
                    stationId: 'stationId1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Rental.findOneAndDelete.mockResolvedValue(null);

            await RentalController.returnVehicle(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Rental not found' });
        });

        it('should return 500 if an error occurs', async () => {
            const req = {
                body: {
                    vehicleId: 'vehicleId1',
                    stationId: 'stationId1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Rental.findOneAndDelete.mockRejectedValue(new Error('Test Error'));

            await RentalController.returnVehicle(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Test Error' });
        });
    });

    describe('getUserRentals', () => {
        it('should return user rentals successfully', async () => {
            const req = {
                params: {
                    userId: 'userId1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const mockRentals = [{ _id: 'rentalId1' }, { _id: 'rentalId2' }];
            Rental.find.mockResolvedValue(mockRentals);

            await RentalController.getUserRentals(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockRentals);
        });

        it('should return 500 if an error occurs', async () => {
            const req = {
                params: {
                    userId: 'userId1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Rental.find.mockRejectedValue(new Error('Test Error'));

            await RentalController.getUserRentals(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Test Error' });
        });
    });
});
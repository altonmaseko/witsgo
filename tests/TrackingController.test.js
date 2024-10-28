const Tracking = require('../src/models/Transportation/tracking');
const TrackingController = require('../src/controllers/Transportation/TrackingController');

jest.mock('../src/models/Transportation/tracking');

describe('TrackingController', () => {
    describe('exist', () => {
        it('should return true if the document exists', async () => {
            const query = { tracking_id: 'trackingId1' };
            Tracking.exists.mockResolvedValue(true);

            const result = await TrackingController.exist(query);

            expect(result).toBe(true);
            expect(Tracking.exists).toHaveBeenCalledWith(query);
        });

        it('should return false if the document does not exist', async () => {
            const query = { tracking_id: 'trackingId1' };
            Tracking.exists.mockResolvedValue(false);

            const result = await TrackingController.exist(query);

            expect(result).toBe(false);
            expect(Tracking.exists).toHaveBeenCalledWith(query);
        });

        it('should handle errors and return false', async () => {
            const query = { tracking_id: 'trackingId1' };
            Tracking.exists.mockRejectedValue(new Error('Test Error'));

            const result = await TrackingController.exist(query);

            expect(result).toBe(false);
            expect(Tracking.exists).toHaveBeenCalledWith(query);
        });
    });

    describe('getDoc', () => {
        // it('should retrieve and populate the document', async () => {
        //     const query = { tracking_id: 'trackingId1' };
        //     const mockDoc = [{ tracking_id: 'trackingId1', vehicle_id: 'vehicleId1', route_id: 'routeId1', current_stop_id: 'stopId1' }];
        
        //     // Mock for the chainable `populate` and `exec` methods
        //     const populateMock = jest.fn().mockReturnThis(); // Return `this` to allow chaining
        //     const execMock = jest.fn().mockResolvedValue(mockDoc); // Return resolved promise with mockDoc
        
        //     // Mock the Tracking.find method to return an object with our mocked methods
        //     Tracking.find.mockReturnValue(mockDoc);
        
        //     // Call the getDoc method from the TrackingController
        //     const result = await TrackingController.getDoc(query);
        
        //     // Expectations
        //     expect(result).toEqual({ success: true, data: mockDoc });
        //     expect(Tracking.find).toHaveBeenCalledWith(query);
        //     expect(populateMock).toHaveBeenCalledTimes(3); // Check that populate is called 3 times
        //     expect(populateMock).toHaveBeenCalledWith('vehicle_id');
        //     expect(populateMock).toHaveBeenCalledWith('route_id');
        //     expect(populateMock).toHaveBeenCalledWith('current_stop_id');
        //     expect(execMock).toHaveBeenCalled(); // Ensure exec is called
        // });
        

    // it('should return a failure message if the document does not exist', async () => {
    //     const query = { tracking_id: 'trackingId321321312' };
    //     const populateMock = jest.fn().mockReturnThis();
    //     const execMock = jest.fn().mockResolvedValue(null);

    //     Tracking.find.mockReturnValue({ populate: populateMock, exec: execMock });

    //     const result = await TrackingController.getDoc(query);

    //     expect(result).toEqual({ success: false, message: 'Document does not exist.' });
    //     expect(Tracking.find).toHaveBeenCalledWith(query);
    // });

    // it('should handle errors and return a failure message', async () => {
    //     const query = { tracking_id: 'trackingId1' };
    //     const populateMock = jest.fn().mockReturnThis();
    //     const execMock = jest.fn().mockRejectedValue(new Error('Test Error'));

    //     Tracking.find.mockReturnValue({ populate: populateMock, exec: execMock });

    //     const result = await TrackingController.getDoc(query);

    //     expect(result).toEqual({ success: false, message: 'Error occurred while retrieving document.' });
    //     expect(Tracking.find).toHaveBeenCalledWith(query);
    // });
});


    describe('edits', () => {
        it('should update the document and return success', async () => {
            const obj = { _id: 'trackingId1', vehicle_id: 'vehicleId1', route_id: 'routeId1', current_stop_id: 'stopId1', timestamp: '2023-10-01T00:00:00Z', latitude: 0, longitude: 0 };
            const mockDoc = { _id: 'trackingId1', vehicle_id: 'vehicleId1', route_id: 'routeId1', current_stop_id: 'stopId1', timestamp: '2023-10-01T00:00:00Z', latitude: 0, longitude: 0 };
            Tracking.findOneAndUpdate.mockResolvedValue(mockDoc);

            const result = await TrackingController.edits(obj);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Tracking.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: obj._id },
                { vehicle_id: obj.vehicle_id, route_id: obj.route_id, current_stop_id: obj.current_stop_id, timestamp: obj.timestamp, latitude: obj.latitude, longitude: obj.longitude },
                { new: true, upsert: true }
            );
        });

        it('should return a failure message if the update fails', async () => {
            const obj = { _id: 'trackingId1', vehicle_id: 'vehicleId1', route_id: 'routeId1', current_stop_id: 'stopId1', timestamp: '2023-10-01T00:00:00Z', latitude: 0, longitude: 0 };
            Tracking.findOneAndUpdate.mockResolvedValue(null);

            const result = await TrackingController.edits(obj);

            expect(result).toEqual({ success: false, message: 'Operation failed.' });
            expect(Tracking.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: obj._id },
                { vehicle_id: obj.vehicle_id, route_id: obj.route_id, current_stop_id: obj.current_stop_id, timestamp: obj.timestamp, latitude: obj.latitude, longitude: obj.longitude },
                { new: true, upsert: true }
            );
        });

        it('should handle errors and return a failure message', async () => {
            const obj = { _id: 'trackingId1', vehicle_id: 'vehicleId1', route_id: 'routeId1', current_stop_id: 'stopId1', timestamp: '2023-10-01T00:00:00Z', latitude: 0, longitude: 0 };
            Tracking.findOneAndUpdate.mockRejectedValue(new Error('Test Error'));

            const result = await TrackingController.edits(obj);

            expect(result).toEqual({ success: false, message: 'Error occurred while processing request.' });
            expect(Tracking.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: obj._id },
                { vehicle_id: obj.vehicle_id, route_id: obj.route_id, current_stop_id: obj.current_stop_id, timestamp: obj.timestamp, latitude: obj.latitude, longitude: obj.longitude },
                { new: true, upsert: true }
            );
        });
    });

    describe('insertRecord', () => {
        it('should insert a new record and return success', async () => {
            const obj = { vehicle_id: 'vehicleId1', route_id: 'routeId1', current_stop_id: 'stopId1', timestamp: '2023-10-01T00:00:00Z', latitude: 0, longitude: 0 };
            const mockDoc = { _id: 'trackingId1', vehicle_id: 'vehicleId1', route_id: 'routeId1', current_stop_id: 'stopId1', timestamp: '2023-10-01T00:00:00Z', latitude: 0, longitude: 0 };
            Tracking.create.mockResolvedValue(mockDoc);

            const result = await TrackingController.insertRecord(obj);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Tracking.create).toHaveBeenCalledWith(obj);
        });

        it('should handle errors and return a failure message', async () => {
            const obj = { vehicle_id: 'vehicleId1', route_id: 'routeId1', current_stop_id: 'stopId1', timestamp: '2023-10-01T00:00:00Z', latitude: 0, longitude: 0 };
            Tracking.create.mockRejectedValue(new Error('Test Error'));

            const result = await TrackingController.insertRecord(obj);

            expect(result).toEqual({ success: false, message: 'Error occurred while inserting record.' });
            expect(Tracking.create).toHaveBeenCalledWith(obj);
        });
    });
});

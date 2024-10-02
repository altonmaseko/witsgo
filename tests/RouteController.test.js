const Route = require('../src/models/Transportation/route');
const RouteController = require('../src/controllers/Transportation/RouteController');

jest.mock('../src/models/Transportation/route');

describe('RouteController', () => {
    describe('exist', () => {
        it('should return true if the document exists', async () => {
            const query = { route_name: 'Test Route' };
            Route.exists.mockResolvedValue(true);

            const result = await RouteController.exist(query);

            expect(result).toBe(true);
            expect(Route.exists).toHaveBeenCalledWith(query);
        });

        it('should return false if the document does not exist', async () => {
            const query = { route_name: 'Nonexistent Route' };
            Route.exists.mockResolvedValue(false);

            const result = await RouteController.exist(query);

            expect(result).toBe(false);
            expect(Route.exists).toHaveBeenCalledWith(query);
        });

        it('should return false and log error if an error occurs', async () => {
            const query = { route_name: 'Error Route' };
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            Route.exists.mockRejectedValue(new Error('Test Error'));

            const result = await RouteController.exist(query);

            expect(result).toBe(false);
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error checking if document exists:', expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe('getDoc', () => {
        it('should return document if it exists', async () => {
            const query = { route_name: 'Test Route' };
            const mockDoc = [{ _id: 'routeId1', route_name: 'Test Route' }];
            Route.find.mockResolvedValue(mockDoc);

            const result = await RouteController.getDoc(query);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Route.find).toHaveBeenCalledWith(query);
        });

        it('should return success false if document does not exist', async () => {
            const query = { route_name: 'Nonexistent Route' };
            Route.find.mockResolvedValue(null);

            const result = await RouteController.getDoc(query);

            expect(result).toEqual({ success: false, message: 'Document does not exist.' });
            expect(Route.find).toHaveBeenCalledWith(query);
        });

        it('should return success false and log error if an error occurs', async () => {
            const query = { route_name: 'Error Route' };
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            Route.find.mockRejectedValue(new Error('Test Error'));

            const result = await RouteController.getDoc(query);

            expect(result).toEqual({ success: false, message: 'Error occurred while retrieving document.' });
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error retrieving document:', expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe('edits', () => {
        it('should return success true if document is updated', async () => {
            const obj = { _id: 'routeId1', route_name: 'Updated Route', stops: [] };
            const mockDoc = { _id: 'routeId1', route_name: 'Updated Route', stops: [] };
            Route.findOneAndUpdate.mockResolvedValue(mockDoc);

            const result = await RouteController.edits(obj);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Route.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: obj._id },
                { route_name: obj.route_name, stops: obj.stops },
                { new: true, upsert: true }
            );
        });

        it('should return success false if operation failed', async () => {
            const obj = { _id: 'routeId1', route_name: 'Updated Route', stops: [] };
            Route.findOneAndUpdate.mockResolvedValue(null);

            const result = await RouteController.edits(obj);

            expect(result).toEqual({ success: false, message: 'Operation failed.' });
            expect(Route.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: obj._id },
                { route_name: obj.route_name, stops: obj.stops },
                { new: true, upsert: true }
            );
        });

        it('should return success false and log error if an error occurs', async () => {
            const obj = { _id: 'routeId1', route_name: 'Error Route', stops: [] };
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            Route.findOneAndUpdate.mockRejectedValue(new Error('Test Error'));

            const result = await RouteController.edits(obj);

            expect(result).toEqual({ success: false, message: 'Error occurred while processing request.' });
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error updating document:', expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe('insertRecord', () => {
        it('should return success true if document is inserted', async () => {
            const obj = { route_name: 'New Route', stops: [] };
            const mockDoc = { _id: 'routeId1', route_name: 'New Route', stops: [] };
            Route.create.mockResolvedValue(mockDoc);

            const result = await RouteController.insertRecord(obj);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Route.create).toHaveBeenCalledWith(obj);
        });

        it('should return success false and log error if an error occurs', async () => {
            const obj = { route_name: 'Error Route', stops: [] };
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            Route.create.mockRejectedValue(new Error('Test Error'));

            const result = await RouteController.insertRecord(obj);

            expect(result).toEqual({ success: false, message: 'Error occurred while inserting record.' });
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error inserting record:', expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });
});
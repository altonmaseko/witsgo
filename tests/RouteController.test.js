const Route = require('../src/models/Transportation/route');
const RouteController = require('../src/controllers/Transportation/RouteController');

jest.mock('../src/models/Transportation/route');

describe('RouteController', () => {
    describe('exist', () => {
        it('should return true if route exists', async () => {
            Route.exists.mockResolvedValue(true);

            const query = { name: 'Test Route' };
            const result = await RouteController.exist(query);

            expect(result).toBe(true);
            expect(Route.exists).toHaveBeenCalledWith(query);
        });

        it('should return false if route does not exist', async () => {
            Route.exists.mockResolvedValue(false);

            const query = { name: 'Nonexistent Route' };
            const result = await RouteController.exist(query);

            expect(result).toBe(false);
            expect(Route.exists).toHaveBeenCalledWith(query);
        });

        it('should return false and log error if an error occurs', async () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            Route.exists.mockRejectedValue(new Error('Test Error'));

            const query = { name: 'Error Route' };
            const result = await RouteController.exist(query);

            expect(result).toBe(false);
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error checking if document exists:', expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe('getDoc', () => {
        it('should return document if it exists', async () => {
            const mockDoc = { name: 'Test Route' };
            Route.find.mockResolvedValue(mockDoc);

            const query = { name: 'Test Route' };
            const result = await RouteController.getDoc(query);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Route.find).toHaveBeenCalledWith(query);
        });

        it('should return success false if document does not exist', async () => {
            Route.find.mockResolvedValue(null);

            const query = { name: 'Nonexistent Route' };
            const result = await RouteController.getDoc(query);

            expect(result).toEqual({ success: false, message: 'Document does not exist.' });
            expect(Route.find).toHaveBeenCalledWith(query);
        });

        it('should return success false and log error if an error occurs', async () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            Route.find.mockRejectedValue(new Error('Test Error'));

            const query = { name: 'Error Route' };
            const result = await RouteController.getDoc(query);

            expect(result).toEqual({ success: false, message: 'Error occurred while retrieving document.' });
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error retrieving document:', expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe('insertRecord', () => {
        it('should return success true if document is inserted', async () => {
            const mockDoc = { name: 'New Route' };
            Route.create.mockResolvedValue(mockDoc);

            const obj = { name: 'New Route' };
            const result = await RouteController.insertRecord(obj);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Route.create).toHaveBeenCalledWith(obj);
        });

        it('should return success false and log error if an error occurs', async () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            Route.create.mockRejectedValue(new Error('Test Error'));

            const obj = { name: 'New Route' };
            const result = await RouteController.insertRecord(obj);

            expect(result).toEqual({ success: false, message: 'Error occurred while inserting record.' });
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error inserting record:', expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });

    describe('edits', () => {
        it('should return success true if document is updated', async () => {
            const mockDoc = { name: 'Updated Route' };
            Route.findOneAndUpdate.mockResolvedValue(mockDoc);

            const obj = { _id: 1, route_name: 'Updated Route', stops: [] };
            const result = await RouteController.edits(obj);

            expect(result).toEqual({ success: true, data: mockDoc });
            expect(Route.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: obj._id },
                { route_name: obj.route_name, stops: obj.stops },
                { new: true, upsert: true }
            );
        });

        it('should return success false if document does not exist', async () => {
            Route.findOneAndUpdate.mockResolvedValue(null);

            const obj = { _id: 1, route_name: 'Updated Route', stops: [] };
            const result = await RouteController.edits(obj);

            expect(result).toEqual({ success: false, message: 'Operation failed.' });
            expect(Route.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: obj._id },
                { route_name: obj.route_name, stops: obj.stops },
                { new: true, upsert: true }
            );
        });

        it('should return success false and log error if an error occurs', async () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            Route.findOneAndUpdate.mockRejectedValue(new Error('Test Error'));

            const obj = { _id: 1, route_name: 'Updated Route', stops: [] };
            const result = await RouteController.edits(obj);

            expect(result).toEqual({ success: false, message: 'Error occurred while processing request.' });
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error updating document:', expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });
});
const LocationController = require('../src/controllers/Accessibility/LocationController');
const Location = require('../src/models/Accessibility/location');

jest.mock('../src/models/Accessibility/location');

describe('LocationController', () => {
    describe('exists', () => {
        it('should return true if document exists', async () => {
            Location.exists.mockResolvedValue(true);
            const result = await LocationController.exists({ name: 'Test Location' });
            expect(result).toBe(true);
        });

        it('should return false if document does not exist', async () => {
            Location.exists.mockResolvedValue(null);
            const result = await LocationController.exists({ name: 'Nonexistent Location' });
            expect(result).toBe(false);
        });

        it('should handle errors', async () => {
            Location.exists.mockRejectedValue(new Error('Error'));
            const result = await LocationController.exists({ name: 'Error Location' });
            expect(result).toBe(false);
        });
    });

    describe('getDoc', () => {
        it('should return document if it exists', async () => {
            const mockDoc = { name: 'Test Location' };
            Location.find.mockResolvedValue(mockDoc);
            const result = await LocationController.getDoc({ name: 'Test Location' });
            expect(result).toEqual({ success: true, data: mockDoc });
        });

        it('should return message if document does not exist', async () => {
            Location.find.mockResolvedValue(null);
            const result = await LocationController.getDoc({ name: 'Nonexistent Location' });
            expect(result).toEqual({ success: false, message: 'Document does not exist.' });
        });

        it('should handle errors', async () => {
            Location.find.mockRejectedValue(new Error('Error'));
            const result = await LocationController.getDoc({ name: 'Error Location' });
            expect(result).toEqual({ success: false, message: 'Error occurred' });
        });
    });

    describe('insertRecord', () => {
        it('should insert a new record', async () => {
            const mockDoc = { name: 'New Location' };
            Location.create.mockResolvedValue(mockDoc);
            const result = await LocationController.insertRecord(mockDoc);
            expect(result).toEqual({ success: true, data: mockDoc });
        });

        it('should handle errors', async () => {
            Location.create.mockRejectedValue(new Error('Error'));
            const result = await LocationController.insertRecord({ name: 'Error Location' });
            expect(result).toEqual({ success: false, message: 'Error occurred' });
        });
    });

    describe('edits', () => {
        it('should update an existing record', async () => {
            const mockDoc = { _id: '123', name: 'Updated Location' };
            Location.findOneAndUpdate.mockResolvedValue(mockDoc);
            const result = await LocationController.edits(mockDoc);
            expect(result).toEqual({ success: true, data: mockDoc });
        });

        it('should return message if document does not exist', async () => {
            Location.findOneAndUpdate.mockResolvedValue(null);
            const result = await LocationController.edits({ _id: '123', name: 'Nonexistent Location' });
            expect(result).toEqual({ success: false, message: 'Document does not exist.' });
        });

        it('should handle errors', async () => {
            Location.findOneAndUpdate.mockRejectedValue(new Error('Error'));
            const result = await LocationController.edits({ _id: '123', name: 'Error Location' });
            expect(result).toEqual({ success: false, message: 'Error occurred' });
        });
    });
});
import { readAgenda } from '../contexts/events'; // replace with your actual file path
import { collection, getDocs } from 'firebase/firestore';

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
}));

describe('readAgenda', () => {
  it('should return the correct data', async () => {
    const mockData = [
      {
        calendar_id: '1',
        title: 'Test Event',
        start: '2022-01-01',
        end: '2022-01-02',
      },
    ];

    getDocs.mockResolvedValue({
      docs: mockData.map((item) => ({
        data: () => item,
      })),
    });

    const result = await readAgenda();
    expect(result).toEqual(mockData);
  });

  it('should throw an error when getDocs fails', async () => {
    const error = new Error('Error getting documents');
    getDocs.mockRejectedValue(error);

    await expect(readAgenda()).rejects.toThrow('Error getting documents');
  });
});
import { api } from './api';
import { apiConfig } from '../../../constants/api/routes';

jest.mock('../../../constants/api/routes', () => ({
  apiConfig: {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('Api', () => {
  const mockApiConfig = apiConfig as jest.Mocked<typeof apiConfig>;

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getNotes', () => {
    it('should return a array of favorite notes', async () => {
      const mockResponse = { data: [{ any: 'data' }] };
      mockApiConfig.get.mockResolvedValue(mockResponse);
      const notes = await api.getNotes(true);

      expect(mockApiConfig.get).toHaveBeenCalledWith('/list?target=favorite');
      expect(notes).toEqual(mockResponse.data);
    });

    it('should return a array of unfavorite notes', async () => {
      const mockResponse = { data: [{ any: 'data' }] };
      mockApiConfig.get.mockResolvedValue(mockResponse);
      const notes = await api.getNotes(false);
      expect(mockApiConfig.get).toHaveBeenCalledWith('/list?target=unfavorite');
      expect(notes).toEqual(mockResponse.data);
    });
  });

  describe('createNote', () => {
    it('should return a note created with successfully', async () => {
      const mockResponse = { data: { any: 'data' } };
      mockApiConfig.post.mockResolvedValue(mockResponse);
      const body = {
        title: 'test',
        description: 'test',
        hasFavorited: false,
        color: null,
      };
      const noteCreated = await api.createNote(body);
      expect(mockApiConfig.post).toHaveBeenCalledWith('/add', body);
      expect(noteCreated).toEqual(mockResponse.data);
    });
  });

  describe('updateNote', () => {
    it('should return a deleted note with successfully', async () => {
      const mockResponse = { data: { any: 'data' } };
      mockApiConfig.patch.mockResolvedValue(mockResponse);
      const id = 'any';
      const body = {
        title: 'test',
        description: 'test',
        hasFavorited: false,
        color: null,
      };
      const noteCreated = await api.updateNote(id, body);
      expect(mockApiConfig.patch).toHaveBeenCalledWith(`/${id}`, body);
      expect(noteCreated).toEqual(mockResponse.data);
    });
  });

  describe('deleteNote', () => {
    it('should return a deleted note with successfully', async () => {
      const mockResponse = { data: { any: 'data' } };
      mockApiConfig.delete.mockResolvedValue(mockResponse);
      const id = 'any';
      const noteDeleted = await api.deleteNote(id);
      expect(mockApiConfig.delete).toHaveBeenCalledWith(`/${id}`);
      expect(noteDeleted).toEqual(mockResponse.data);
    });
  });
});

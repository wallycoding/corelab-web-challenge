import { apiConfig } from '../../../constants/api/routes';
import { NoteEntity } from '../domain/entities/note.entity';
import { ApiRepository } from '../domain/repositories/api.repo';

export const api: ApiRepository = {
  async getNotes(hasFavorited) {
    const res = await apiConfig.get<NoteEntity[]>(
      `/list?target=${hasFavorited ? 'favorite' : 'unfavorite'}`,
    );
    return res.data;
  },
  async createNote(data) {
    const res = await apiConfig.post<NoteEntity>('/add', data);
    return res.data;
  },
  async updateNote(id, data) {
    const res = await apiConfig.patch<NoteEntity>(`/${id}`, data);
    return res.data;
  },
  async deleteNote(id) {
    const res = await apiConfig.delete<NoteEntity>(`/${id}`);
    return res.data;
  },
};

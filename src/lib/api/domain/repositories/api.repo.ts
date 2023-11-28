import { NoteContentEntity, NoteEntity } from '../entities/note.entity';

export interface ApiRepository {
  getNotes(hasFavorited: boolean): Promise<NoteEntity[]>;
  createNote(data: NoteContentEntity): Promise<NoteEntity>;
  deleteNote(id: string): Promise<NoteEntity>;
  updateNote(id: string, data: Partial<NoteContentEntity>): Promise<NoteEntity>;
}

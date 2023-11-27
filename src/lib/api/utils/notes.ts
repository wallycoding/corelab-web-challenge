import { NoteContentEntity, NoteEntity } from '../domain/entities/note.entity';

export const createLocalNote = (data: NoteContentEntity): NoteEntity => {
  const timestamp = Date.now();
  return {
    id: Math.random().toString(16).slice(2),
    ...data,
    color: null,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
};

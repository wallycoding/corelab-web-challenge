import { NoteContentEntity, NoteEntity } from '../domain/entities/note.entity';
import { createLocalNote } from './notes';

describe('createLocalNote', () => {
  it('should create a local note with the provided data', () => {
    const data: NoteContentEntity = {
      title: 'Test Note',
      description: 'This is a test note',
      hasFavorited: false,
      color: null,
    };

    const result: NoteEntity = createLocalNote(data);

    expect(result.id).toBeTruthy();
    expect(result.title).toEqual(data.title);
    expect(result.description).toEqual(data.description);
    expect(result.color).toBeNull();
    expect(result.createdAt).toBeTruthy();
    expect(result.updatedAt).toBeTruthy();
  });
});

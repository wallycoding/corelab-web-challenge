import { Color } from '../../../../constants/notes/colors';

export interface NoteEntity {
  id: string;
  //
  title: string;
  description: string;
  color: Color | null;
  hasFavorited: boolean;
  //
  createdAt: number;
  updatedAt: number;
}

export type NoteContentEntity = Omit<
  NoteEntity,
  'id' | 'createdAt' | 'updatedAt'
>;

import { NoteBox } from './components/NotesArea/NoteBox';
import { NoteInputRef } from './NoteInput';
import { NoteBoxSkeleton } from '../skeleton/NoteBoxSkeleton';
import { NoteEntity } from '../../lib/api/domain/entities/note.entity';
import { useAutoContext } from '../../providers/AutoContext';
import { CategoryLayout } from '../../layout/CategoryLayout';
import { RefObject } from 'react';
import { ApiDataProcessor } from '../../App';
import { hasKeyword } from '../../utils/text';

interface NotesAreaProps {
  name: string;
  hasFavorited?: boolean;
  isLoading: boolean;
  data?: NoteEntity[];
}

export const NotesArea = ({
  name,
  data,
  isLoading,
  hasFavorited = false,
}: NotesAreaProps) => {
  const apiDataProcessor = useAutoContext<ApiDataProcessor>('api/processor');
  const noteInputRef = useAutoContext<RefObject<NoteInputRef>>('form/notes');
  const [search] = useAutoContext<StateWith<string>>('props/search');

  const hasData = data && !isLoading;
  const isEmpty = hasData && data.length === 0;
  const isSearching = !!search.trim();

  const createNoteBox = (note: NoteEntity) => (
    <NoteBox
      key={note.id}
      onEdit={() => noteInputRef.current?.setFields(note)}
      onUpdate={(data) => apiDataProcessor.onUpdate(note, data)}
      onDelete={() => apiDataProcessor.onDelete(note.id, hasFavorited)}
      {...note}
    />
  );

  const filterNotes = () => {
    const nodes: React.ReactNode[] = [];
    for (const note of data!) {
      if (
        !hasKeyword(note.title, search) &&
        !hasKeyword(note.description, search)
      )
        continue;
      nodes.push(createNoteBox(note));
    }
    return nodes;
  };

  const createNotes = () =>
    isSearching ? filterNotes() : data!.map(createNoteBox);

  const content = hasData ? createNotes() : renderNotesSkeleton(hasFavorited);
  return (
    <CategoryLayout name={name}>
      {content}
      {isEmpty && <p>Nenhuma nota encontrada!</p>}
    </CategoryLayout>
  );
};

const renderNotesSkeleton = (hasFavorited: boolean) =>
  Array.from({ length: 3 }, (_, i) => (
    <NoteBoxSkeleton key={i} hasFavorited={hasFavorited} />
  ));

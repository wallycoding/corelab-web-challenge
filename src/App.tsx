import { useQueries } from 'react-query';

import { RootLayout } from './layout/RootLayout';
import { NotesArea } from './components/app/NotesArea';
import { NoteInput, NoteInputRef } from './components/app/NoteInput';
import { Header } from './components/app/Header';

import api from './lib/api';
import { AutoContext } from './providers/AutoContext';
import { useEffect, useRef, useState } from 'react';
import {
  NoteContentEntity,
  NoteEntity,
} from './lib/api/domain/entities/note.entity';
import { createLocalNote } from './lib/api/utils/notes';

export interface ApiDataProcessor {
  onCreate(data: NoteContentEntity): void;
  onUpdate(oldData: NoteEntity, data: Partial<NoteContentEntity>): void;
  onDelete(id: string, hasFavorited: boolean): void;
}

function App() {
  const {
    noteInputRef,
    apiDataProcessor,
    favorites,
    others,
    search,
    setSearch,
  } = useApp();
  return (
    <AutoContext.ProvideData name="api/processor" data={apiDataProcessor}>
      <AutoContext.ProvideData name="form/notes" data={noteInputRef}>
        <AutoContext.ProvideData name="props/search" data={[search, setSearch]}>
          <RootLayout header={<Header />}>
            <NoteInput
              ref={noteInputRef}
              onCreate={apiDataProcessor.onCreate}
              onUpdate={apiDataProcessor.onUpdate}
            />
            <NotesArea
              name="Favoritos"
              data={favorites.state[0]}
              isLoading={favorites.info.isLoading}
              hasFavorited
            />
            <NotesArea
              name="Outros"
              data={others.state[0]}
              isLoading={others.info.isLoading}
            />
          </RootLayout>
        </AutoContext.ProvideData>
      </AutoContext.ProvideData>
    </AutoContext.ProvideData>
  );
}

const useApp = () => {
  const [search, setSearch] = useState('');
  const noteInputRef = useRef<NoteInputRef>(null);
  const notesFromApiData = useNotesFromApiData();
  const { favorites, others } = notesFromApiData;

  const apiDataProcessor: ApiDataProcessor = {
    async onCreate(data: NoteContentEntity) {
      const [value, setValue] = data.hasFavorited
        ? favorites.state
        : others.state;

      const localNote = createLocalNote(data);
      setValue([localNote, ...value]);
      try {
        const note = await api.createNote(data);
        setValue([note, ...value]);
      } catch (error) {
        setValue(value);
      }
    },
    async onUpdate(oldData: NoteEntity, data: Partial<NoteContentEntity>) {
      const [favorites, setFavorites] = notesFromApiData.favorites.state;
      const [others, setOthers] = notesFromApiData.others.state;

      const setStateOld = oldData.hasFavorited ? setFavorites : setOthers;
      setStateOld((state) => state.filter((note) => note.id !== oldData.id));

      const newData = { ...oldData, ...data };
      const setStateNew = newData.hasFavorited ? setFavorites : setOthers;
      setStateNew((state) => [newData, ...state]);

      const editData = noteInputRef.current?.getEdit();
      if (editData?.id === newData.id) {
        noteInputRef.current?.updateEdit(newData, data);
      }

      try {
        await api.updateNote(oldData.id, data);
      } catch (error) {
        setFavorites(favorites);
        setOthers(others);
      }
    },
    async onDelete(id, hasFavorited) {
      const [value, setValue] = hasFavorited ? favorites.state : others.state;
      setValue((notes) => notes.filter((note) => note.id !== id));

      const editData = noteInputRef.current?.getEdit();
      if (editData?.id === id) noteInputRef.current?.reset();

      try {
        await api.deleteNote(id);
      } catch (error) {
        setValue(value);
      }
    },
  };

  return {
    noteInputRef,
    apiDataProcessor,
    favorites: notesFromApiData.favorites,
    others: notesFromApiData.others,
    search,
    setSearch,
  };
};

const useNotesFromApiData = () => {
  const favorites = useState<NoteEntity[]>([]);
  const others = useState<NoteEntity[]>([]);

  const [queryFavorites, queryOthers] = useQueries([
    {
      queryKey: 'notes/favorites',
      queryFn: () => api.getNotes(true),
    },
    {
      queryKey: 'notes/others',
      queryFn: () => api.getNotes(false),
    },
  ]);

  useEffect(() => {
    const [, setState] = favorites;
    if (queryFavorites.data) setState(queryFavorites.data);
  }, [queryFavorites.isLoading]);

  useEffect(() => {
    const [, setState] = others;
    if (queryOthers.data) setState(queryOthers.data);
  }, [queryOthers.isLoading]);

  return {
    favorites: {
      state: favorites,
      info: {
        isLoading: queryFavorites.isLoading,
      },
    },
    others: {
      state: others,
      info: {
        isLoading: queryOthers.isLoading,
      },
    },
  };
};

export default App;

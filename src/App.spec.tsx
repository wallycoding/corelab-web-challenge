import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import api from './lib/api';
import { createLocalNote } from './lib/api/utils/notes';

jest.mock('./lib/api', () => ({
  getNotes: jest.fn(),
  createNote: jest.fn(),
  updateNote: jest.fn(),
  deleteNote: jest.fn(),
}));

const createFakeNotes = (hasFavorited = false) => [
  createLocalNote({
    title: 'one',
    description: 'desc 1',
    color: null,
    hasFavorited,
  }),
  createLocalNote({
    title: 'two',
    description: 'desc 2',
    color: null,
    hasFavorited,
  }),
];

describe('App', () => {
  const mockApi = api as jest.Mocked<typeof api>;

  for (let indexMode = 0; indexMode < 2; indexMode++) {
    const fakeNotes = createFakeNotes(!indexMode);
    const describer = indexMode ? 'Favorites' : 'Others';

    describe(describer, () => {
      beforeEach(async () => {
        mockApi.getNotes.mockImplementation((hasFavorited) => {
          if (!indexMode)
            return Promise.resolve(hasFavorited ? [...fakeNotes] : []);
          return Promise.resolve(hasFavorited ? [] : [...fakeNotes]);
        });
        await waitFor(() =>
          render(
            <QueryClientProvider client={new QueryClient()}>
              <App />
            </QueryClientProvider>,
          ),
        );
      });

      afterEach(() => {
        jest.resetAllMocks();
      });

      it('renders skeleton', async () => {
        const skeletons = screen.getAllByTestId('note-skeleton');
        skeletons.forEach((skeleton) => expect(skeleton).toBeInTheDocument());
      });

      it('renders empty notes and two notebox', async () => {
        const allNoteBox = await screen.findAllByTestId('notebox');

        expect(allNoteBox).toHaveLength(2);
        allNoteBox.forEach((noteBox) => expect(noteBox).toBeInTheDocument());

        const empties = await screen.findAllByTestId('empty-notes');
        expect(empties).toHaveLength(1);
        expect(empties[0]).toBeInTheDocument();
      });

      it('should call getNotes', async () => {
        expect(mockApi.getNotes).toHaveBeenCalledTimes(2);
      });

      it('should trigger onCreate when create note', async () => {
        mockApi.createNote.mockResolvedValue(
          createLocalNote({
            title: 'test',
            description: 'test',
            color: null,
            hasFavorited: !indexMode,
          }),
        );

        const titleInput = screen.getByTestId('input-title');
        const descriptionInput = screen.getByTestId('input-description');
        const [buttonFavorite] = screen.getAllByTestId('btn-favorite');
        const buttonSubmit = screen.getByTestId('button-submit');

        fireEvent.change(titleInput, {
          target: { value: 'test' },
        });

        fireEvent.change(descriptionInput, {
          target: { value: 'test' },
        });

        if (!indexMode) fireEvent.click(buttonFavorite);

        expect(titleInput).toHaveValue('test');
        expect(descriptionInput).toHaveValue('test');

        await act(async () => {
          fireEvent.click(buttonSubmit);
        });

        expect(mockApi.createNote).toHaveBeenCalledWith({
          title: 'test',
          description: 'test',
          hasFavorited: !indexMode,
        });

        const allNoteBox = await screen.findAllByTestId('notebox');
        expect(allNoteBox).toHaveLength(3);
      });

      it('should fail when trigger onCreate', async () => {
        mockApi.createNote.mockRejectedValue(Error('any'));

        const titleInput = screen.getByTestId('input-title');
        const descriptionInput = screen.getByTestId('input-description');
        const [buttonFavorite] = screen.getAllByTestId('btn-favorite');
        const buttonSubmit = screen.getByTestId('button-submit');

        fireEvent.change(titleInput, {
          target: { value: 'test' },
        });

        fireEvent.change(descriptionInput, {
          target: { value: 'test' },
        });

        fireEvent.click(buttonFavorite);

        expect(titleInput).toHaveValue('test');
        expect(descriptionInput).toHaveValue('test');

        await act(async () => {
          fireEvent.click(buttonSubmit);
        });

        expect(mockApi.createNote).toHaveBeenCalledWith({
          title: 'test',
          description: 'test',
          hasFavorited: true,
        });

        const allNoteBox = await screen.findAllByTestId('notebox');
        expect(allNoteBox).toHaveLength(2);
      });

      it('should trigger onUpdate when update note', async () => {
        mockApi.updateNote.mockResolvedValue({
          ...fakeNotes[0],
          title: 'test',
          description: 'test',
        });

        const [buttonEdit] = await screen.findAllByTestId('btn-edit');

        const titleInput = screen.getByTestId('input-title');
        const descriptionInput = screen.getByTestId('input-description');
        const buttonSubmit = screen.getByTestId('button-submit');

        await act(async () => {
          fireEvent.click(buttonEdit);
        });

        expect(titleInput).toHaveValue(fakeNotes[0].title);
        expect(descriptionInput).toHaveValue(fakeNotes[0].description);

        fireEvent.change(titleInput, {
          target: { value: 'test' },
        });

        fireEvent.change(descriptionInput, {
          target: { value: 'test' },
        });

        await act(async () => {
          fireEvent.click(buttonSubmit);
        });

        expect(mockApi.updateNote).toHaveBeenCalledWith(fakeNotes[0].id, {
          title: 'test',
          description: 'test',
          hasFavorited: fakeNotes[0].hasFavorited,
        });
      });

      it('should fail when trigger onUpdate', async () => {
        mockApi.updateNote.mockRejectedValue(Error('any'));

        const [buttonEdit] = await screen.findAllByTestId('btn-edit');

        const titleInput = screen.getByTestId('input-title');
        const descriptionInput = screen.getByTestId('input-description');
        const buttonSubmit = screen.getByTestId('button-submit');

        await act(async () => {
          fireEvent.click(buttonEdit);
        });

        expect(titleInput).toHaveValue(fakeNotes[0].title);
        expect(descriptionInput).toHaveValue(fakeNotes[0].description);

        fireEvent.change(titleInput, {
          target: { value: 'test' },
        });

        fireEvent.change(descriptionInput, {
          target: { value: 'test' },
        });

        await act(async () => {
          fireEvent.click(buttonSubmit);
        });

        expect(mockApi.updateNote).toHaveBeenCalledWith(fakeNotes[0].id, {
          title: 'test',
          description: 'test',
          hasFavorited: fakeNotes[0].hasFavorited,
        });
      });

      it('should trigger onDelete when delete note', async () => {
        mockApi.deleteNote.mockResolvedValue(fakeNotes[0]);
        const [buttonDelete] = await screen.findAllByTestId('btn-delete');

        await act(async () => {
          fireEvent.click(buttonDelete);
        });

        expect(mockApi.deleteNote).toHaveBeenCalledWith(fakeNotes[0].id);

        const allNoteBox = await screen.findAllByTestId('notebox');
        expect(allNoteBox).toHaveLength(1);
      });

      it('should stop editing when delete note', async () => {
        mockApi.deleteNote.mockResolvedValue(fakeNotes[0]);
        const titleInput = screen.getByTestId('input-title');
        const descriptionInput = screen.getByTestId('input-description');

        const [buttonDelete] = await screen.findAllByTestId('btn-delete');
        const [buttonEdit] = await screen.findAllByTestId('btn-edit');

        await act(async () => {
          fireEvent.click(buttonEdit);
        });

        expect(titleInput).toHaveValue(fakeNotes[0].title);
        expect(descriptionInput).toHaveValue(fakeNotes[0].description);

        await act(async () => {
          fireEvent.click(buttonDelete);
        });

        expect(titleInput).toHaveValue('');
        expect(descriptionInput).toHaveValue('');
      });

      it('should fail when trigger onDelete', async () => {
        mockApi.deleteNote.mockRejectedValue(Error('any'));
        const [buttonDelete] = await screen.findAllByTestId('btn-delete');

        await act(async () => {
          fireEvent.click(buttonDelete);
        });

        expect(mockApi.deleteNote).toHaveBeenCalledWith(fakeNotes[0].id);

        const allNoteBox = await screen.findAllByTestId('notebox');
        expect(allNoteBox).toHaveLength(2);
      });
    });
  }
});

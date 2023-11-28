import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { NotesArea } from './NotesArea';
import { NoteEntity } from '../../lib/api/domain/entities/note.entity';
import { AutoContext } from '../../providers/AutoContext';

const mockDataFromNotesArea: NoteEntity[] = [
  {
    id: 'first',
    title: 'title_one',
    description: 'desc_one',
    hasFavorited: true,
    color: null,
    createdAt: 0,
    updatedAt: 0,
  },
  {
    id: 'second',
    title: 'title_two',
    description: 'desc_two',
    hasFavorited: true,
    color: null,
    createdAt: 0,
    updatedAt: 0,
  },
];

describe('NotesArea', () => {
  const mockApiDataProcessor = {
    onCreate: jest.fn(),
    onUpdate: jest.fn(),
    onDelete: jest.fn(),
  };
  const mockNoteInputRef = { current: { setFields: jest.fn() } };

  const createWrapper =
    (state: [string]) =>
    ({ children }: { children: React.ReactNode }) => (
      <AutoContext.ProvideData name="api/processor" data={mockApiDataProcessor}>
        <AutoContext.ProvideData name="form/notes" data={mockNoteInputRef}>
          <AutoContext.ProvideData name="props/search" data={state}>
            {children}
          </AutoContext.ProvideData>
        </AutoContext.ProvideData>
      </AutoContext.ProvideData>
    );

  beforeEach(() => {
    render(
      <NotesArea name="Test" data={mockDataFromNotesArea} isLoading={false} />,
      { wrapper: createWrapper(['']) },
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders notes when data is provided and not loading', () => {
    mockDataFromNotesArea.forEach((note) => {
      expect(screen.getByText(note.title)).toBeInTheDocument();
      expect(screen.getByText(note.description)).toBeInTheDocument();
    });
  });

  it('renders skeletons when data is loading', () => {
    cleanup();
    render(<NotesArea name="Test" isLoading={true} />, {
      wrapper: createWrapper(['']),
    });
    const skeletons = screen.getAllByTestId('note-skeleton');
    expect(skeletons).toHaveLength(3);
  });

  it('should trigger onUpdate when favorite button is clicked', () => {
    const buttons = screen.getAllByTestId('btn-favorite');
    buttons.forEach((button) => {
      fireEvent.click(button);
    });
    expect(mockApiDataProcessor.onUpdate).toHaveBeenCalledTimes(2);
  });

  it('should trigger onUpdate when color button is clicked', () => {
    const buttons = screen.getAllByTestId('btn-color');
    buttons.forEach((button) => {
      fireEvent.click(button);
    });
    expect(mockApiDataProcessor.onUpdate).toHaveBeenCalledTimes(24);
  });

  it('should trigger onDelete when delete button is clicked', () => {
    const buttons = screen.getAllByTestId('btn-delete');
    buttons.forEach((button) => {
      fireEvent.click(button);
      expect(mockApiDataProcessor.onDelete).toHaveBeenCalled();
    });
  });

  it('should trigger setFields when edit button is clicked', () => {
    const buttons = screen.getAllByTestId('btn-edit');
    buttons.forEach((button) => {
      fireEvent.click(button);
      expect(mockNoteInputRef.current.setFields).toHaveBeenCalled();
    });
  });

  it('should filter notes by search', () => {
    cleanup();
    render(
      <NotesArea name="Test" data={mockDataFromNotesArea} isLoading={false} />,
      { wrapper: createWrapper(['one']) },
    );

    const allNoteBox = screen.getAllByTestId('notebox');
    expect(allNoteBox).toHaveLength(1);
  });
});

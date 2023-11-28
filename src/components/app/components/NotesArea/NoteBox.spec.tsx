import { render, fireEvent, screen } from '@testing-library/react';
import { NoteBox, NoteBoxProps } from './NoteBox';
import { Color, colors } from '../../../../constants/notes/colors';

describe('NoteBox', () => {
  const mockProps: NoteBoxProps = {
    id: 'any',
    title: 'any title',
    description: 'any description',
    color: null,
    hasFavorited: true,
    createdAt: 0,
    updatedAt: 0,

    onEdit: jest.fn(),
    onDelete: jest.fn(),
    onUpdate: jest.fn(),
  };
  let rerender: TestingReRender;

  beforeEach(() => {
    const { rerender: _rerender } = render(<NoteBox {...mockProps} />);
    rerender = _rerender;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the title and description correctly', () => {
    const title = screen.getByText(mockProps.title);
    const description = screen.getByText(mockProps.description);
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('renders a default background when no color is specified', () => {
    const notebox = screen.getByTestId('notebox');
    expect(notebox.classList.contains('bg-white')).toBeTruthy();
    {
      rerender(<NoteBox {...mockProps} color={Color.SkyBlue} />);
      const notebox = screen.getByTestId('notebox');
      expect(notebox.classList.contains(colors[Color.SkyBlue])).toBeTruthy();
    }
  });

  it('should toggle the favorite status when the favorite button is clicked', () => {
    const button = screen.getByTestId('btn-favorite');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    expect(mockProps.onUpdate).toHaveBeenCalledWith({ hasFavorited: false });
  });

  it('should trigger the edit function when the edit button is clicked', () => {
    const editButton = screen.getByTestId('btn-edit');
    fireEvent.click(editButton);
    expect(mockProps.onEdit).toHaveBeenCalled();
  });

  it('should trigger the delete function when the delete button is clicked', () => {
    const deleteButton = screen.getByTestId('btn-delete');
    fireEvent.click(deleteButton);
    expect(mockProps.onDelete).toHaveBeenCalled();
  });

  it('should trigger the update function when a color button is clicked', () => {
    const colorButtons = screen.getAllByTestId('btn-color');
    colorButtons.forEach((button) => {
      fireEvent.click(button);
      expect(mockProps.onUpdate).toHaveBeenCalled();
    });
  });

  it('renders all icons correctly', () => {
    const close = screen.getByTestId('close-icon');
    const star = screen.getByTestId('star-icon');
    const pen = screen.getByTestId('pen-icon');
    const colorBucker = screen.getByTestId('color-bucket-icon');

    expect(star).toBeInTheDocument();
    expect(close).toBeInTheDocument();
    expect(pen).toBeInTheDocument();
    expect(colorBucker).toBeInTheDocument();
  });

  it('renders the correct star icon based on the favorite status', () => {
    const starIcon = screen.getByTestId('star-icon');
    expect(starIcon).toBeInTheDocument();

    rerender(<NoteBox {...mockProps} hasFavorited={false} />);
    const starEmptyIcon = screen.getByTestId('star-empty-icon');
    expect(starEmptyIcon).toBeInTheDocument();
  });
});

import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from '@testing-library/react';
import { NoteInput, NoteInputRef } from './NoteInput';
import { useRef } from 'react';
import { toast } from 'react-toastify';

const spySetValue = jest.fn();
const spyReset = jest.fn();
const spySetFocus = jest.fn();

type Fn<T extends VoidFn> = (...args: Parameters<T>) => ReturnType<T>;
const createPreservedMock =
  <O extends Fn<O>>(original: O, mock: O) =>
  (...args: Parameters<O>) => {
    original(...args);
    return mock(...args);
  };

jest.mock('react-hook-form', () => {
  const module = jest.requireActual('react-hook-form');
  return {
    ...module,
    useForm() {
      const useFormOriginal = module.useForm();
      const useForm = {
        setValue: useFormOriginal.setValue,
        reset: useFormOriginal.reset,
        setFocus: useFormOriginal.setFocus,
      };
      useFormOriginal.setValue = createPreservedMock(
        useForm.setValue,
        spySetValue,
      );
      useFormOriginal.reset = createPreservedMock(useForm.reset, spyReset);
      useFormOriginal.setFocus = createPreservedMock(
        useForm.setFocus,
        spySetFocus,
      );

      return useFormOriginal;
    },
  };
});

describe('NoteInput', () => {
  const mockFakeNote = {
    id: 'first',
    title: 'any title one',
    description: 'any desc one',
    hasFavorited: true,
    color: null,
    createdAt: 0,
    updatedAt: 0,
  };

  const { result: resultNoteInputRef } = renderHook(() =>
    useRef<NoteInputRef>(null),
  );

  const mockProps = {
    onCreate: jest.fn(),
    onUpdate: jest.fn(),
  };

  const spyWarnToast = jest.spyOn(toast, 'warn');

  beforeEach(() => {
    render(
      <NoteInput
        ref={resultNoteInputRef.current}
        onCreate={mockProps.onCreate}
        onUpdate={mockProps.onUpdate}
      />,
    );
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the input and textarea', () => {
    const title = screen.getByTestId('input-title');
    const description = screen.getByTestId('input-description');
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('renders the button', () => {
    const button = screen.getByTestId('button-submit');
    expect(button).toBeInTheDocument();
  });

  it('should call the onCreate with successfully', async () => {
    const titleInput = screen.getByTestId('input-title');
    const descriptionInput = screen.getByTestId('input-description');
    const submitButton = screen.getByTestId('button-submit');

    expect(submitButton).toBeInTheDocument();

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(descriptionInput, {
      target: { value: 'Test Description' },
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockProps.onCreate).toHaveBeenCalledWith({
      title: 'Test Title',
      description: 'Test Description',
      hasFavorited: false,
    });
  });

  it('should render a warning when inputs are not correctly filled', async () => {
    const titleInput = screen.getByTestId('input-title');
    const descriptionInput = screen.getByTestId('input-description');
    const submitButton = screen.getByTestId('button-submit');

    expect(submitButton).toBeInTheDocument();

    fireEvent.change(titleInput, { target: { value: 'fa' } });
    fireEvent.change(descriptionInput, {
      target: { value: 'il' },
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockProps.onCreate).toHaveBeenCalledTimes(0);
    expect(spyWarnToast).toHaveBeenCalled();
  });

  it('should update, reset and submit the note fields correctly', async () => {
    const titleInput = screen.getByTestId('input-title');
    const descriptionInput = screen.getByTestId('input-description');
    const submitButton = screen.getByTestId('button-submit');

    act(() => {
      resultNoteInputRef.current.current?.setFields(mockFakeNote);
    });

    const starIcon = screen.getByTestId('star-icon');

    expect(starIcon).toBeInTheDocument();
    expect(titleInput).toHaveValue(mockFakeNote.title);
    expect(descriptionInput).toHaveValue(mockFakeNote.description);

    act(() => {
      const editData = resultNoteInputRef.current.current?.getEdit();
      expect(editData).toEqual(mockFakeNote);
    });

    act(() => {
      resultNoteInputRef.current.current?.updateEdit(
        { ...mockFakeNote, hasFavorited: false },
        { hasFavorited: false },
      );
    });

    const starEmptyIcon = screen.getByTestId('star-empty-icon');
    expect(starEmptyIcon).toBeInTheDocument();

    act(() => {
      resultNoteInputRef.current.current?.reset();
      expect(resultNoteInputRef.current.current?.getEdit()).toBe(null);
    });

    expect(titleInput).toHaveValue('');
    expect(descriptionInput).toHaveValue('');

    act(() => {
      resultNoteInputRef.current.current?.setFields(mockFakeNote);
      expect(resultNoteInputRef.current.current?.getEdit()).toEqual(
        mockFakeNote,
      );
      fireEvent.change(titleInput, { target: { value: 'test new title' } });
      fireEvent.change(descriptionInput, {
        target: { value: 'test new description' },
      });
    });

    expect(titleInput).toHaveValue('test new title');
    expect(descriptionInput).toHaveValue('test new description');

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockProps.onUpdate).toHaveBeenCalled();
  });

  it('should toggle favorite status when favorite button is clicked', async () => {
    const buttonFavorite = screen.getByTestId('btn-favorite');

    const starEmptyIcon = screen.getByTestId('star-empty-icon');
    expect(starEmptyIcon).toBeInTheDocument();

    act(() => {
      fireEvent.click(buttonFavorite);
    });

    const starIcon = screen.getByTestId('star-icon');
    expect(starIcon).toBeInTheDocument();
  });

  it('should set fields, update edit and reset with correctly calling', async () => {
    act(() => {
      resultNoteInputRef.current.current?.setFields(mockFakeNote);
    });
    expect(spySetValue).toHaveBeenCalledTimes(3);
    expect(spySetFocus).toHaveBeenCalledTimes(1);

    act(() => {
      resultNoteInputRef.current.current?.updateEdit(mockFakeNote, {
        title: 'test',
        description: 'test desc',
      });
    });

    expect(spySetValue).toHaveBeenCalledTimes(5);

    act(() => {
      resultNoteInputRef.current.current?.reset();
    });
    expect(spyReset).toHaveBeenCalledTimes(1);
  });
});

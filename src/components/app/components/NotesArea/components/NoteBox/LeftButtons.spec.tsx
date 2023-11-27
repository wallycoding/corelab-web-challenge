import { fireEvent, render, screen } from '@testing-library/react';
import { AutoContext } from '../../../../../../providers/AutoContext';
import { LeftButtons } from './LeftButtons';

describe('LeftButtons', () => {
  const mockProps = {
    setHoverColor: jest.fn(),
    onEdit: jest.fn(),
    onUpdate: jest.fn(),
  };

  beforeEach(() => {
    render(
      <AutoContext.ProvideData name="props/notebox" data={mockProps}>
        <LeftButtons />
      </AutoContext.ProvideData>,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should trigger edit function when edit button is clicked', () => {
    const button = screen.getByTestId('btn-edit');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    expect(mockProps.onEdit).toHaveBeenCalled();
  });

  it('should trigger update function with a new color when color button is clicked', () => {
    const buttons = screen.getAllByTestId('btn-color');
    buttons.forEach((button) => {
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
      expect(mockProps.onUpdate).toHaveBeenCalledWith({
        color: expect.any(String),
      });
    });
  });

  it('should trigger hover color change function when mouse hovers over color button', () => {
    const buttons = screen.getAllByTestId('btn-color');
    buttons.forEach((button) => {
      expect(button).toBeInTheDocument();
      fireEvent.mouseEnter(button);
      expect(mockProps.setHoverColor).toHaveBeenCalledWith(expect.any(String));
      fireEvent.mouseLeave(button);
      expect(mockProps.setHoverColor).toHaveBeenCalledWith(null);
    });
  });

  it('renders pen icon and color bucket icon', () => {
    const pen = screen.getByTestId('pen-icon');
    const colorBucket = screen.getByTestId('color-bucket-icon');
    expect(pen).toBeInTheDocument();
    expect(colorBucket).toBeInTheDocument();
  });
});

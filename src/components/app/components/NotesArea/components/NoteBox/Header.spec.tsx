import { fireEvent, render, screen } from '@testing-library/react';
import { AutoContext } from '../../../../../../providers/AutoContext';
import { Header } from './Header';

describe('Header', () => {
  const mockProps = {
    title: 'Example',
    hasFavorited: true,
    onUpdate: jest.fn(),
  };
  let rerender: TestingReRender;

  beforeEach(() => {
    const { rerender: _rerender } = render(
      <AutoContext.ProvideData name="props/notebox" data={mockProps}>
        <Header />
      </AutoContext.ProvideData>,
    );
    rerender = _rerender;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the correct title', () => {
    const title = screen.getByText(mockProps.title);
    expect(title).toBeInTheDocument();
  });

  it('should toggle favorite status when button is clicked', () => {
    const button = screen.getByTestId('btn-favorite');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    expect(mockProps.onUpdate).toHaveBeenCalledWith({ hasFavorited: false });
  });

  it('renders star and star-empty', () => {
    const starIcon = screen.getByTestId('star-icon');
    expect(starIcon).toBeInTheDocument();

    rerender(
      <AutoContext.ProvideData
        name="props/notebox"
        data={{ ...mockProps, hasFavorited: false }}
      >
        <Header />
      </AutoContext.ProvideData>,
    );
    const starEmptyIcon = screen.getByTestId('star-empty-icon');
    expect(starEmptyIcon).toBeInTheDocument();
  });
});

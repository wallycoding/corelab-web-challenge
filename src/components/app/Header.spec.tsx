import { render, screen, fireEvent, act } from '@testing-library/react';
import { AutoContext } from '../../providers/AutoContext';
import { Header } from './Header';

describe('Header', () => {
  const spySetSearch = jest.fn();

  beforeEach(() => {
    render(
      <AutoContext.ProvideData name="props/search" data={['', spySetSearch]}>
        <Header />
      </AutoContext.ProvideData>,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders CoreNotes logo and title', () => {
    const logoElement = screen.getByAltText('App Logo');
    expect(logoElement).toBeInTheDocument();

    const titleElement = screen.getByText('CoreNotes');
    expect(titleElement).toBeInTheDocument();
  });

  it('should clears search when clicked', () => {
    const button = screen.getByTestId('btn-close');
    act(() => {
      fireEvent.click(button);
    });
    expect(spySetSearch).toHaveBeenCalledWith('');
  });

  it('should change search', () => {
    const input = screen.getByTestId('input-search');
    const button = screen.getByTestId('btn-search');
    act(() => {
      fireEvent.change(input, { target: { value: 'one' } });
      fireEvent.click(button);
    });
    expect(spySetSearch).toHaveBeenCalledWith('one');
  });
});

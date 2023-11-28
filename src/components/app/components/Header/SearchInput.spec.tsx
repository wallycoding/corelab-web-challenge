import { render, screen, fireEvent } from '@testing-library/react';
import { SearchInput } from './SearchInput';
import { AutoContext } from '../../../../providers/AutoContext';
import { act } from 'react-dom/test-utils';

describe('SearchInput', () => {
  const spySetSearch = jest.fn();

  beforeEach(() => {
    render(
      <AutoContext.ProvideData name="props/search" data={['', spySetSearch]}>
        <SearchInput />
      </AutoContext.ProvideData>,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should change search', () => {
    const input = screen.getByTestId('input-search');
    const button = screen.getByRole('button');
    act(() => {
      fireEvent.change(input, { target: { value: 'one' } });
      fireEvent.click(button);
    });
    expect(spySetSearch).toHaveBeenCalledWith('one');
  });
});

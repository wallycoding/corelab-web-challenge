import { render, screen, fireEvent } from '@testing-library/react';
import { CloseButton } from './CloseButton';
import { AutoContext } from '../../../../providers/AutoContext';
import { act } from 'react-dom/test-utils';

describe('CloseButton', () => {
  const spySetSearch = jest.fn();

  beforeEach(() => {
    render(
      <AutoContext.ProvideData name="props/search" data={['', spySetSearch]}>
        <CloseButton />
      </AutoContext.ProvideData>,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should clears search when clicked', () => {
    const button = screen.getByRole('button');
    act(() => {
      fireEvent.click(button);
    });
    expect(spySetSearch).toHaveBeenCalledWith('');
  });
});

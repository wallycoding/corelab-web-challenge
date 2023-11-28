import { render, screen } from '@testing-library/react';
import { SearchIcon } from './search';

describe('SearchIcon', () => {
  it('should render the close icon correctly', () => {
    render(<SearchIcon className="testing" />);
    const closeIcon = screen.getByTestId('search-icon');
    expect(closeIcon).toBeInTheDocument();
    expect(closeIcon).toHaveClass('testing');
  });
});

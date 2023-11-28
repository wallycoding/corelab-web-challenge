import { render, screen } from '@testing-library/react';
import { StarEmptyIcon } from './star-empty';

describe('StarEmptyIcon', () => {
  it('should render the close icon correctly', () => {
    render(<StarEmptyIcon className="testing" />);
    const closeIcon = screen.getByTestId('star-empty-icon');
    expect(closeIcon).toBeInTheDocument();
    expect(closeIcon).toHaveClass('testing');
  });
});

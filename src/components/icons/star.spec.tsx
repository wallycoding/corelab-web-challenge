import { render, screen } from '@testing-library/react';
import { StarIcon } from './star';

describe('StarIcon', () => {
  it('should render the close icon correctly', () => {
    render(<StarIcon className="testing" />);
    const closeIcon = screen.getByTestId('star-icon');
    expect(closeIcon).toBeInTheDocument();
    expect(closeIcon).toHaveClass('testing');
  });
});

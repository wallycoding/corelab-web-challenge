import { render, screen } from '@testing-library/react';
import { PenIcon } from './pen';

describe('PenIcon', () => {
  it('should render the close icon correctly', () => {
    render(<PenIcon className="testing" />);
    const closeIcon = screen.getByTestId('pen-icon');
    expect(closeIcon).toBeInTheDocument();
    expect(closeIcon).toHaveClass('testing');
  });
});

import { render, screen } from '@testing-library/react';
import { CloseIcon } from './close';

describe('CloseIcon', () => {
  it('should render the close icon correctly', () => {
    render(<CloseIcon className="testing" />);
    const closeIcon = screen.getByTestId('close-icon');
    expect(closeIcon).toBeInTheDocument();
    expect(closeIcon).toHaveClass('testing');
  });
});

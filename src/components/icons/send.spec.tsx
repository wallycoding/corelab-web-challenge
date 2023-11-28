import { render, screen } from '@testing-library/react';
import { SendIcon } from './send';

describe('SendIcon', () => {
  it('should render the close icon correctly', () => {
    render(<SendIcon className="testing" />);
    const closeIcon = screen.getByTestId('send-icon');
    expect(closeIcon).toBeInTheDocument();
    expect(closeIcon).toHaveClass('testing');
  });
});

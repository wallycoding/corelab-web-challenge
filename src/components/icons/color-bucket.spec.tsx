import { render, screen } from '@testing-library/react';
import { ColorBucketIcon } from './color-bucket';

describe('ColorBucketIcon', () => {
  it('should render the close icon correctly', () => {
    render(<ColorBucketIcon className="testing" />);
    const closeIcon = screen.getByTestId('color-bucket-icon');
    expect(closeIcon).toBeInTheDocument();
    expect(closeIcon).toHaveClass('testing');
  });
});

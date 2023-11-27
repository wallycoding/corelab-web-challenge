import { render, screen } from '@testing-library/react';
import { CategoryLayout } from './CategoryLayout';

describe('RootLayout', () => {
  const content = <div>Content Example</div>;

  beforeEach(() => {
    render(<CategoryLayout name="Example" children={content} />);
  });

  it('renders name props correctly', () => {
    const header = screen.getByRole('heading', {
      name: 'Example',
    });
    expect(header).toBeInTheDocument();
  });

  it('renders children props correctly', () => {
    const content = screen.getByText('Content Example');
    expect(content).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { RootLayout } from './RootLayout';

describe('RootLayout', () => {
  const header = <h1>Header Example</h1>;
  const content = <div>Content Example</div>;

  beforeEach(() => {
    render(<RootLayout header={header} children={content} />);
  });

  it('renders header props correctly', () => {
    const header = screen.getByRole('heading', {
      name: 'Header Example',
    });
    expect(header).toBeInTheDocument();
  });

  it('renders content props correctly', () => {
    const content = screen.getByText('Content Example');
    expect(content).toBeInTheDocument();
  });
});

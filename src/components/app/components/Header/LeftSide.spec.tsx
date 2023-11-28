import { render, screen } from '@testing-library/react';
import { LeftSide } from './LeftSide';

describe('LeftSide', () => {
  beforeEach(() => {
    render(<LeftSide />);
  });
  it('renders CoreNotes logo and title', () => {
    const logoElement = screen.getByAltText('App Logo');
    expect(logoElement).toBeInTheDocument();

    const titleElement = screen.getByText('CoreNotes');
    expect(titleElement).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { NoteBoxSkeleton } from './NoteBoxSkeleton';

describe('NoteBoxSkeleton', () => {
  it('should render StarIcon when hasFavorited is true', () => {
    render(<NoteBoxSkeleton hasFavorited={true} />);
    const starIcon = screen.getByTestId('star-icon');
    expect(starIcon).toBeInTheDocument();
  });

  it('should render StarEmptyIcon when hasFavorited is false', () => {
    render(<NoteBoxSkeleton hasFavorited={false} />);
    const starEmptyIcon = screen.getByTestId('star-empty-icon');
    expect(starEmptyIcon).toBeInTheDocument();
  });
});

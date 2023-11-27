import { StarIcon } from '../icons/star';
import { StarEmptyIcon } from '../icons/star-empty';

interface NoteBoxProps {
  hasFavorited: boolean;
}

export const NoteBoxSkeleton = ({ hasFavorited }: NoteBoxProps) => {
  return (
    <div
      data-testid="note-skeleton"
      className="animate-skeleton flex h-[400px] w-full min-w-[20rem] max-w-[24rem] flex-col overflow-visible rounded-2xl bg-white shadow-md"
    >
      <div className="flex items-center justify-between px-5 py-3">
        <div className="font-bold text-capuccino-300"></div>
        <div>{hasFavorited ? <StarIcon /> : <StarEmptyIcon />}</div>
      </div>
      <div className="flex h-full overflow-hidden">
        <p className="flex w-full overflow-y-auto bg-transparent px-5 py-2 text-capuccino-300 outline-none"></p>
      </div>
    </div>
  );
};

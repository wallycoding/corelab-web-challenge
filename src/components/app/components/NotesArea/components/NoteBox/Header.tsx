import { useAutoContext } from '../../../../../../providers/AutoContext';
import { StarIcon } from '../../../../../icons/star';
import { StarEmptyIcon } from '../../../../../icons/star-empty';
import { PropsToChild } from '../../NoteBox';

export const Header = () => {
  const { title, hasFavorited, onUpdate } =
    useAutoContext<PropsToChild>('props/notebox');

  return (
    <div className="flex items-center justify-between px-5 py-3">
      <div className="font-bold text-capuccino-300">{title}</div>
      <div>
        <button
          data-testid="btn-favorite"
          onClick={() => onUpdate({ hasFavorited: !hasFavorited })}
        >
          {hasFavorited ? <StarIcon /> : <StarEmptyIcon />}
        </button>
      </div>
    </div>
  );
};

import classNames from 'classnames';
import { Color, colors } from '../../../../../../constants/notes/colors';
import { useAutoContext } from '../../../../../../providers/AutoContext';
import { ColorBucketIcon } from '../../../../../icons/color-bucket';
import { PenIcon } from '../../../../../icons/pen';
import { PropsToChild } from '../../NoteBox';

export const LeftButtons = () => {
  const { setHoverColor, onEdit, onUpdate } =
    useAutoContext<PropsToChild>('props/notebox');

  return (
    <div className="flex gap-2">
      <button
        data-testid="btn-edit"
        onClick={onEdit}
        className="rounded-full p-1 hover:bg-capuccino-500 hover:shadow-md"
      >
        <div className="grid h-5 w-5 place-items-center">
          <PenIcon className="h-4 w-4" />
        </div>
      </button>
      <div className="group relative rounded-full p-1 hover:bg-capuccino-500 hover:shadow-md">
        <ColorBucketIcon className="h-5 w-5" />
        <div className="absolute -left-[1rem] top-[calc(100%+0.5rem)] hidden max-w-[280px] grid-cols-[repeat(auto-fill,minmax(2rem,1fr))] gap-3 rounded-xl border-2 border-capuccino-600 bg-white px-3 py-2 transition-all before:absolute before:-top-[2rem] before:left-0 before:h-8 before:w-full before:content-[''] group-hover:grid">
          {Object.values(Color).map((key) => (
            <button
              key={key}
              onClick={() => onUpdate({ color: key })}
              onMouseEnter={() => setHoverColor(colors[key])}
              onMouseLeave={() => setHoverColor(null)}
              data-testid="btn-color"
            >
              <div
                className={classNames(
                  colors[key],
                  'h-9 w-9 rounded-full shadow-md hover:scale-110',
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

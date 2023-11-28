import classNames from 'classnames';
import { CloseIcon } from '../../../icons/close';
import { colors } from '../../../../constants/notes/colors';
import { useState } from 'react';
import {
  NoteContentEntity,
  NoteEntity,
} from '../../../../lib/api/domain/entities/note.entity';
import { AutoContext } from '../../../../providers/AutoContext';
import { LeftButtons } from './components/NoteBox/LeftButtons';
import { Header } from './components/NoteBox/Header';

export interface NoteBoxProps extends NoteEntity {
  onEdit: VoidFn;
  onDelete: VoidFn;
  onUpdate(data: Partial<NoteContentEntity>): void;
}

export type PropsToChild = NoteBoxProps & ReturnType<typeof useNoteBox>;

export const NoteBox = (props: NoteBoxProps) => {
  const { hoverColor, setHoverColor } = useNoteBox();

  return (
    <AutoContext.ProvideData
      name="props/notebox"
      data={{ ...props, hoverColor, setHoverColor }}
    >
      <div
        data-testid="notebox"
        className={classNames(
          'pulsing-animate flex h-[400px] w-full min-w-[20rem] max-w-[24rem] flex-col overflow-visible rounded-2xl shadow-md transition-colors',
          hoverColor ?? (props.color ? colors[props.color] : 'bg-white'),
        )}
      >
        <Header />
        <div
          className={classNames(
            'h-[1px] w-full',
            props.color ? 'bg-white' : 'bg-capuccino-600',
          )}
        />
        <div className="flex h-full overflow-hidden">
          <p className="flex w-full overflow-y-auto break-all bg-transparent px-5 py-2 text-capuccino-300 outline-none">
            {props.description}
          </p>
        </div>
        <div className="flex items-center justify-between px-6 py-3">
          <LeftButtons />
          <div className="flex">
            <button data-testid="btn-delete" onClick={props.onDelete}>
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </AutoContext.ProvideData>
  );
};

const useNoteBox = () => {
  const [hoverColor, setHoverColor] = useState<string | null>(null);
  return { hoverColor, setHoverColor };
};

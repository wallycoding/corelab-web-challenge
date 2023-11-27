import { useAutoContext } from '../../../../providers/AutoContext';
import { CloseIcon } from '../../../icons/close';

export const CloseButton = () => {
  const [, setSearch] = useAutoContext<StateWith<string>>('props/search');

  return (
    <div className="flex justify-end md:flex-1">
      <button data-testid="btn-close" onClick={() => setSearch('')}>
        <CloseIcon />
      </button>
    </div>
  );
};

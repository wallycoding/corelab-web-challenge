import { useRef } from 'react';
import { SearchIcon } from '../../../icons/search';
import { useAutoContext } from '../../../../providers/AutoContext';

export const SearchInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [, setSearch] = useAutoContext<StateWith<string>>('props/search');

  return (
    <div className="w-full">
      <div className="flex items-center gap-1 rounded-md border-[1.8px] border-capuccino-600 px-3 py-2 text-sm shadow-sm shadow-capuccino-600">
        <input
          data-testid="input-search"
          ref={inputRef}
          className="w-full bg-transparent outline-none placeholder:text-capuccino-700"
          type="text"
          placeholder="Pesquisar notas"
        />
        <button
          data-testid="btn-search"
          onClick={() => {
            inputRef.current && setSearch(inputRef.current.value);
          }}
        >
          <SearchIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

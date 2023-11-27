import { SearchInput } from './components/Header/SearchInput';
import { LeftSide } from './components/Header/LeftSide';
import { CloseButton } from './components/Header/CloseButton';

export const Header = () => {
  return (
    <div className="flex h-16 w-full items-center justify-center bg-white shadow-md">
      <div className="flex w-full gap-3 px-3 md:px-6">
        <div className="flex flex-1 gap-3 md:gap-6">
          <LeftSide />
          <SearchInput />
        </div>
        <CloseButton />
      </div>
    </div>
  );
};

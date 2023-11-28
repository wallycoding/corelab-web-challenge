interface CategoryProps {
  name: string;
  children: React.ReactNode;
}

export const CategoryLayout = ({ name, children }: CategoryProps) => {
  return (
    <div className="flex w-full flex-col items-center px-10">
      <div className="flex w-full max-w-7xl flex-col gap-3">
        <h2 className="font-medium text-capuccino-400">{name}</h2>
        <div className="grid justify-center gap-x-5 gap-y-10 md:grid-cols-[repeat(auto-fill,minmax(22rem,1fr))]">
          {children}
        </div>
      </div>
    </div>
  );
};

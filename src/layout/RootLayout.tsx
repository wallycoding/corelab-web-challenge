interface RootProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

export const RootLayout = ({ header, children }: RootProps) => {
  return (
    <div className="flex min-h-[100dvh] flex-col gap-10 bg-capuccino-100 pb-32">
      <header className="flex">{header}</header>
      <main className="flex flex-col gap-10">{children}</main>
    </div>
  );
};

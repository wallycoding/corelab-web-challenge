export const CloseIcon = (
  props: Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
) => (
  <div {...props} data-testid="close-icon">
    <svg
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-[calc(100%-1px)]"
    >
      <path
        d="M13.4158 2.2405L12.0922 0.91687L6.84464 6.16445L1.59707 0.91687L0.273438 2.2405L5.52101 7.48807L0.273438 12.7357L1.59707 14.0593L6.84464 8.8117L12.0922 14.0593L13.4158 12.7357L8.16827 7.48807L13.4158 2.2405Z"
        fill="#51646E"
      />
    </svg>
  </div>
);

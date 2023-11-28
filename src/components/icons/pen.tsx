export const PenIcon = (
  props: Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
) => (
  <div {...props} data-testid="pen-icon">
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      <path
        d="M10.9443 6.16667L11.8321 7.05444L3.25656 15.6111H2.38767V14.7422L10.9443 6.16667ZM14.3443 0.5C14.1082 0.5 13.8627 0.594444 13.6832 0.773889L11.9549 2.50222L15.4966 6.04389L17.2249 4.31556C17.5932 3.94722 17.5932 3.33333 17.2249 2.98389L15.0149 0.773889C14.826 0.585 14.5899 0.5 14.3443 0.5ZM10.9443 3.51278L0.498779 13.9583V17.5H4.04045L14.486 7.05444L10.9443 3.51278Z"
        fill="#51646E"
      />
    </svg>
  </div>
);

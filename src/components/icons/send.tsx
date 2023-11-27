export const SendIcon = (
  props: Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
) => (
  <div {...props} data-testid="send-icon">
    <svg
      width="96"
      height="96"
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      <g clipPath="url(#clip0_153_2)">
        <path
          d="M8.04 84L92 48L8.04 12L8 40L68 48L8 56L8.04 84Z"
          fill="#455A64"
        />
      </g>
      <defs>
        <clipPath id="clip0_153_2">
          <rect width="96" height="96" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </div>
);

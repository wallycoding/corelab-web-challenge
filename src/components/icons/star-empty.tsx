export const StarEmptyIcon = (
  props: Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
) => (
  <div {...props} data-testid="star-empty-icon">
    <svg
      width="21"
      height="19"
      viewBox="0 0 21 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-[calc(100%-2px)] w-full"
    >
      <path
        d="M10.5464 13.2621L6.90811 15.4586L7.86606 11.3171L4.65354 8.53037L8.89174 8.17235L10.5464 4.26314L12.201 8.17235L16.4392 8.53037L13.2267 11.3171L14.1847 15.4586M20.2227 7.31116L13.2654 6.72091L10.5464 0.305542L7.82735 6.72091L0.870117 7.31116L6.14368 11.888L4.56645 18.6905L10.5464 15.0812L16.5263 18.6905L14.9394 11.888L20.2227 7.31116Z"
        fill="#455A64"
      />
    </svg>
  </div>
);

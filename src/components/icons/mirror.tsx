const Mirror = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="30"
      height="38"
      viewBox="0 0 30 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 15C1.5 7.54416 7.54416 1.5 15 1.5C22.4558 1.5 28.5 7.54416 28.5 15V34.5455C28.5 35.6249 27.6249 36.5 26.5455 36.5H3.45455C2.37508 36.5 1.5 35.6249 1.5 34.5455V15Z"
        fill="url(#paint0_linear_439_14)"
        stroke="white"
        strokeWidth="3"
      />
      <defs>
        <linearGradient
          id="paint0_linear_439_14"
          x1="4.61538"
          y1="-2.87879"
          x2="29.918"
          y2="47.8288"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="0.571665" stopColor="#001E1D" />
        </linearGradient>
      </defs>
    </svg>
  );
};
export default Mirror;

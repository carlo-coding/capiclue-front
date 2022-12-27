function SendIcon({
  width = 36,
  height = 36
}: React.HTMLProps<SVGElement>): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
    >
      <g clipPath="url(#clip0_68_615)">
        <path
          d="M17.0374 28.8752L6.65747 20.7964C15.7822 17.6926 25.3699 16.1694 35.0072 16.2926C31.8278 25.3913 27.1183 33.8803 21.0817 41.3938L17.0363 28.8761L17.0374 28.8752ZM17.0374 28.8752L25.7409 22.781L17.0374 28.8752Z"
          fill="#4EA5D9"
        />
        <path
          d="M17.0374 28.8752L25.7409 22.781M17.0374 28.8752L6.65747 20.7964C15.7822 17.6926 25.3699 16.1694 35.0072 16.2926C31.8278 25.3913 27.1183 33.8803 21.0817 41.3938L17.0363 28.8761L17.0374 28.8752Z"
          stroke="#6CCED9"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_68_615">
          <rect
            width="34"
            height="34"
            fill="white"
            transform="translate(0.32373 19.8252) rotate(-35)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
export default SendIcon

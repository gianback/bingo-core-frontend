type props = {
  isOpen: boolean;
};
export function IconArrowBottom({ isOpen }: props) {
  return (
    <div>
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
        className={` ${isOpen ? "rotate-180" : ""} w-3 h-3 shrink-0`}
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5 5 1 1 5"
        />
      </svg>
    </div>
  );
}

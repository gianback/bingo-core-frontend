type Props = {
  isOpen: boolean;
  children: React.ReactNode;
};
export function Dialog({ isOpen, children }: Props) {
  return (
    <>
      <dialog
        className="z-10 absolute top-1/2 translate-y-[-50%] bg-gray-800 rounded-xl text-white p-8"
        open={isOpen}
      >
        {children}
      </dialog>
      <div
        className={`fixed inset-0 bg-black/50 ${
          isOpen ? "opacity-1" : "opacity-0 z-[-1]"
        }`}
      />
    </>
  );
}

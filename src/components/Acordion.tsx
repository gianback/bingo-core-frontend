"use client";
import { ReactNode, useState } from "react";
import { IconArrowBottom } from "./Icons";

type Props = {
  title: string;
  children: ReactNode;
};

export function Acordion({ title, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section>
      <h2>
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium text-left border border-gray-400 rounded-t-xl text-gray-400 bg-gray-800"
          onClick={onOpen}
        >
          <span className="flex items-center"> {title}</span>
          <IconArrowBottom isOpen={isOpen} />
        </button>
      </h2>
      <article
        className={`article overflow-hidden  ${
          isOpen ? "max-h-[50rem]" : "max-h-0"
        }`}
      >
        {children}
      </article>
    </section>
  );
}

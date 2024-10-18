import React from "react";

interface Props {
  children: React.ReactElement | React.ReactElement[];
  className?: string;
}

export default function XWrapper({
  children,
  className = "",
}: Props): React.ReactElement {
  return (
    <div
      className={
        "w-full md:w-[900px] h-full flex flex-col md:flex-row  no-scrollbar " +
        className
      }
    >
      {children}
    </div>
  );
}

import React from "react";

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => {
  return <div className={`p-4 border-t ${className}`}>{children}</div>;
};

export default CardFooter;

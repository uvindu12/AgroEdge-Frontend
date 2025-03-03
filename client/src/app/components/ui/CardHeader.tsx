import React, { ReactNode } from "react";

interface CardHeaderProps {
  className: string;
  children: ReactNode;
}

const CardHeader: React.FC<CardHeaderProps> = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export default CardHeader;

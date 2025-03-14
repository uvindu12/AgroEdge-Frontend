import React from "react"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div className={`shadow-lg border rounded-lg p-6 bg-white ${className}`} {...props}>
      {children}
    </div>
  )
}

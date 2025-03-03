import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button className={`px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 ${className}`} {...props}>
      {children}
    </button>
  )
}

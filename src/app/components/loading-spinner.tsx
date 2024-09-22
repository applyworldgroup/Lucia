import React from 'react'

interface LoadingSpinnerProps {
  size?: number
  color?: string
}

export default function LoadingSpinner({ size = 20, color = 'currentColor' }: LoadingSpinnerProps) {
  return (
    <div className="inline-flex items-center justify-center" role="status" aria-label="Loading">
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin"
      >
        <g className="opacity-25">
          <path
            d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
            stroke={color}
            strokeWidth="2"
            fill="none"
          />
        </g>
        <path
          className="opacity-75"
          d="M16.24 7.76C14.88 6.4 13.04 5.62 11 5.62V3C13.74 3 16.24 4.04 18.1 5.9L16.24 7.76Z"
          fill={color}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 12 12"
            to="360 12 12"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  )
}
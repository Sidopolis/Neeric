import React from 'react';

interface NeericLogoProps {
  size?: number;
  color?: string;
  className?: string;
}

// Diagonal stripes (chosen logo for NEERIC)
export default function NeericLogoDiagonal({ 
  size = 40, 
  color = "#000000", 
  className = "" 
}: NeericLogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <rect x="-10" y="15" width="120" height="6" fill={color} transform="rotate(45 50 50)"/>
        <rect x="-10" y="25" width="120" height="6" fill={color} transform="rotate(45 50 50)"/>
        <rect x="-10" y="35" width="120" height="6" fill={color} transform="rotate(45 50 50)"/>
        <rect x="-10" y="45" width="120" height="6" fill={color} transform="rotate(45 50 50)"/>
        <rect x="-10" y="55" width="120" height="6" fill={color} transform="rotate(45 50 50)"/>
        <rect x="-10" y="65" width="120" height="6" fill={color} transform="rotate(45 50 50)"/>
        <rect x="-10" y="75" width="120" height="6" fill={color} transform="rotate(45 50 50)"/>
      </g>
    </svg>
  );
}

// Export as named export too for backwards compatibility
export { NeericLogoDiagonal }; 
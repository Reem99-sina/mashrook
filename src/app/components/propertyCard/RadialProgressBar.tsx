import React from 'react';

interface CircularProgressBarProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  percentage,
  size = 50,
  strokeWidth = 5,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  // Determine the stroke color based on the percentage
  const strokeColor = percentage === 100 ? '#98CC5D' : '#3b82f6';

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="circular-progress-bar"
    >
      <circle
        className="circle-bg"
        stroke="#e6e6e6"
        strokeWidth={strokeWidth}
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
      />
      <circle
        className="circle-progress"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`} // Rotate the circle to start at the top
      />
      <text
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        className="percentage-text"
        fontSize="16px"
        fill= {strokeColor}
      >
        {`${percentage}%`}
      </text>
    </svg>
  );
};

export default CircularProgressBar;

//last modified by Omar Marei 2/8/2024
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { MouseEventHandler } from 'react';
import _ from 'lodash';

interface OnClickProps {
  id?: string;
  style?: React.CSSProperties;
  className?: string;
  data?: any;
  items?: any[];
  onClickUp?: MouseEventHandler<HTMLElement> | undefined;
  onClickDown?: MouseEventHandler<HTMLElement> | undefined;
  onClickLeft?: MouseEventHandler<HTMLElement> | undefined;
  onClickRight?: MouseEventHandler<HTMLElement> | undefined;
  onClickCenter?: MouseEventHandler<HTMLElement> | undefined;
}

const GamepadDPad: React.FC<OnClickProps> = ({
  id,
  style,
  className,
  data,
  items,
  onClickUp,
  onClickDown,
  onClickLeft,
  onClickRight,
  onClickCenter,
  ...props
}) => {
  const safeData = data ?? {};
  
  return (
    <div 
      id={id} 
      style={style} 
      className={`inline-flex items-center justify-center ${className ?? ''}`}
    >
      <svg width="200" height="200" viewBox="0 0 200 200" className="w-48 h-48">
        {/* Blue cross background */}
        <path
          d="M 70 20 L 130 20 L 130 70 L 180 70 L 180 130 L 130 130 L 130 180 L 70 180 L 70 130 L 20 130 L 20 70 L 70 70 Z"
          fill="#1E40AF"
          stroke="#1E3A8A"
          strokeWidth="2"
        />
        
        {/* Center octagon */}
        <circle 
          cx="100" 
          cy="100" 
          r="35" 
          fill="#000000" 
          stroke="#1E3A8A" 
          strokeWidth="2"
          className="cursor-pointer hover:fill-gray-800"
          onClick={onClickCenter}
        />
        
        {/* Up arrow */}
        <g className="cursor-pointer" onClick={onClickUp}>
          <path
            d="M 75 50 L 100 30 L 125 50 L 115 60 L 100 48 L 85 60 Z"
            fill="#10B981"
            className="hover:fill-green-400"
          />
        </g>
        
        {/* Down arrow */}
        <g className="cursor-pointer" onClick={onClickDown}>
          <path
            d="M 75 150 L 100 170 L 125 150 L 115 140 L 100 152 L 85 140 Z"
            fill="#10B981"
            className="hover:fill-green-400"
          />
        </g>
        
        {/* Left arrow */}
        <g className="cursor-pointer" onClick={onClickLeft}>
          <path
            d="M 50 75 L 30 100 L 50 125 L 60 115 L 48 100 L 60 85 Z"
            fill="#10B981"
            className="hover:fill-green-400"
          />
        </g>
        
        {/* Right arrow */}
        <g className="cursor-pointer" onClick={onClickRight}>
          <path
            d="M 150 75 L 170 100 L 150 125 L 140 115 L 152 100 L 140 85 Z"
            fill="#10B981"
            className="hover:fill-green-400"
          />
        </g>
        
        {/* Black octagonal borders for arrows */}
        <circle cx="100" cy="45" r="20" fill="none" stroke="#000000" strokeWidth="3" />
        <circle cx="100" cy="155" r="20" fill="none" stroke="#000000" strokeWidth="3" />
        <circle cx="45" cy="100" r="20" fill="none" stroke="#000000" strokeWidth="3" />
        <circle cx="155" cy="100" r="20" fill="none" stroke="#000000" strokeWidth="3" />
      </svg>
    </div>
  );
};

export default GamepadDPad;
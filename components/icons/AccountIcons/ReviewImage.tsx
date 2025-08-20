import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ReviewImage = ({ width = 24, height = 24, color = '#4A154B'  }) => (
  <Svg width={width} height={height}  viewBox="0 0 24 24" fill="none">
    <Path 
      d="M9 17V11L7 13"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 11L11 13"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);





export default ReviewImage;




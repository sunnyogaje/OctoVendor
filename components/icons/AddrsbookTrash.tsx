import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface TrashIconProps {
  size?: number;
  color?: string;
}

const TrashIcon = ({ size = 20, color = '#EF4444' }: TrashIconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 17 16"
    fill="none"
    
  >
    <Path
      d="M14.0112 3.98665C11.7912 3.76665 9.5579 3.65332 7.33123 3.65332C6.01123 3.65332 4.69123 3.71999 3.37123 3.85332L2.01123 3.98665"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.67786 3.31301L5.82452 2.43967C5.93119 1.80634 6.01119 1.33301 7.13786 1.33301H8.88452C10.0112 1.33301 10.0979 1.83301 10.1979 2.44634L10.3445 3.31301"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.5779 6.09375L12.1446 12.8071C12.0712 13.8537 12.0112 14.6671 10.1512 14.6671H5.87125C4.01125 14.6671 3.95125 13.8537 3.87791 12.8071L3.44458 6.09375"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.89795 11H9.11795"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.3446 8.33301H9.67794"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default TrashIcon;

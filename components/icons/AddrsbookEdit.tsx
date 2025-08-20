import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface EditIconProps {
  size?: number;
  color?: string;
}

const EditIcon = ({ size = 20, color = '#38BDF8' }: EditIconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 17 16"
    fill="none"
  >
    <Path
      d="M8.85117 2.39982L3.37784 8.19315C3.17117 8.41315 2.97117 8.84649 2.93117 9.14649L2.68451 11.3065C2.59784 12.0865 3.15784 12.6198 3.93117 12.4865L6.07784 12.1198C6.37784 12.0665 6.79784 11.8465 7.00451 11.6198L12.4778 5.82649C13.4245 4.82649 13.8512 3.68649 12.3778 2.29315C10.9112 0.913152 9.79784 1.39982 8.85117 2.39982Z"
      stroke={color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.93787 3.36621C8.22453 5.20621 9.71787 6.61288 11.5712 6.79954"
      stroke={color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2.01123 14.667H14.0112"
      stroke={color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default EditIcon;

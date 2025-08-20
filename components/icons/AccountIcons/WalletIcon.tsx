import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const WalletIcon = ({ size = 40, color = '#4B5563' }) => (
  <Svg width={size} height={size} viewBox="0 0 40 41" fill="none">
    <G scale={size / 40}>
      <Path
        d="M21 12.5H15"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M30 14.4702V16.5302C30 17.0802 29.56 17.5302 29 17.5502H27.0399C25.9599 17.5502 24.97 16.7602 24.88 15.6802C24.82 15.0502 25.0599 14.4602 25.4799 14.0502C25.8499 13.6702 26.36 13.4502 26.92 13.4502H29C29.56 13.4702 30 13.9202 30 14.4702Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M25.48 14.05C25.06 14.46 24.82 15.05 24.88 15.68C24.97 16.76 25.96 17.55 27.04 17.55H29V19C29 22 27 24 24 24H15C12 24 10 22 10 19V12C10 9.28 11.64 7.38 14.19 7.06C14.45 7.02 14.72 7 15 7H24C24.26 7 24.51 7.00999 24.75 7.04999C27.33 7.34999 29 9.26 29 12V13.45H26.92C26.36 13.45 25.85 13.67 25.48 14.05Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

export default WalletIcon;

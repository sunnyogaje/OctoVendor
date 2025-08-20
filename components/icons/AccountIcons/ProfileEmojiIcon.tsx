// components/ProfileEmojiIcon.tsx
import * as React from 'react';
import Svg, { Defs, FeBlend, FeColorMatrix, FeComposite, FeFlood, FeGaussianBlur, FeOffset, Filter, G, Path } from 'react-native-svg';

const ProfileEmojiIcon = () => (
  <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
    <G filter="url(#filter0_d_4062_26414)">
      <Path d="M16 2C13.2311..." fill="#6366F1" />
    </G>
    <Defs>
      <Filter id="filter0_d_4062_26414" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" >
        <FeFlood floodOpacity="0" result="BackgroundImageFix" />
        <FeColorMatrix in="SourceAlpha" type="matrix" values="..." result="hardAlpha" />
        <FeOffset dx="8" dy="8" />
        <FeGaussianBlur stdDeviation="5" />
        <FeComposite in2="hardAlpha" operator="out" />
        <FeColorMatrix type="matrix" values="..." />
        <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4062_26414" />
        <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4062_26414" result="shape" />
      </Filter>
    </Defs>
  </Svg>
);

export default ProfileEmojiIcon;

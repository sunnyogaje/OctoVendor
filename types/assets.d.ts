declare module '*.mp4' {
  const src: number;
  export default src;
}

declare module '*.jpg' {
  const src: number;
  export default src;
}

declare module '*.png' {
  const src: number;
  export default src;
}

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

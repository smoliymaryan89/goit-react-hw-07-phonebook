import { RotatingLines } from 'react-loader-spinner';

import React from 'react';

const Loader = () => {
  return (
    <RotatingLines
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      width="40"
      visible={true}
    />
  );
};

export default Loader;

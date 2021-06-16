import React from 'react';
import { css } from "@emotion/react";
import CircleLoader from "react-spinners/CircleLoader";
const override = css`
  display: block;
  margin: 0 auto;
  
`;
const color='red';
const loading=true;
    const Loader = () => (
      <CircleLoader color={color} loading={loading} css={override}  />
    );  
export default Loader;
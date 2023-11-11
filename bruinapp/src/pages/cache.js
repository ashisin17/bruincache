import React from "react";
import {
  Cache,
  StyledBackground,
  StyledInformation,
  StyledSubmitButton,
  StyledBrokenButton,
  StyledRateButton,
  StyledBackButton,
  StyledTaskbar
} from "./Cache.style";

const CacheComponent = () => {
  return (
    <Cache>
      <StyledBackground />
      <StyledInformation />
      <StyledSubmitButton />
      <StyledBrokenButton />
      <StyledRateButton />
      <StyledBackButton />
      <StyledTaskbar />
    </Cache>
  );
};

export default CacheComponent;

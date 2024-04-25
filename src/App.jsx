import React from "react";
import { Router } from "./router/router";
import { GlobalStyle } from "./styles/globalStyle";
import { styled } from "styled-components";

export const App = () => {
  return (
    <Wrapper>
      <GlobalStyle />
      <Router />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: hidden;
`;

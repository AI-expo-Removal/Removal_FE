import { styled } from "styled-components";

export const SideBar = ({ isOpen, setIsOpen }) => {
  return (
    <Div>
      <Wrapper
        isOpen={isOpen}
        onClick={() => {
          setIsOpen(!isOpen);
        }}></Wrapper>
      <Background isOpen={isOpen}></Background>
    </Div>
  );
};

const Div = styled.div`
  position: relative;
  width: 120px;
  height: calc(100vh - 90px);
`;

const Wrapper = styled.div`
  width: 120px;
  height: 100%;
  background-color: #2e2e2e;
  border-radius: 0 ${({ isOpen }) => (isOpen ? 0 : "30px")} 0 0;
  flex: none;
  position: absolute;
  z-index: 2;
  transition: 0.1s ease-in-out;
`;

const Background = styled.div`
  width: 248px;
  height: 100%;
  background-color: #474747;
  position: absolute;
  z-index: 1;
  border-radius: 0 30px 0 0;
  transition: 0.2s ease-in-out;
  left: ${({ isOpen }) => (isOpen ? "120px" : "-128px")};
`;

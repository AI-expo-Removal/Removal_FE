import styled from "styled-components";
import Logo from "./images/Logo.png";

function Header() {
  return (
    <div className="App">
      <_Container>
        <_StyledLogo src={Logo} alt="Logo" />
        <_Header_Input type="text" placeholder="제목을 입력해주세요" />
      </_Container>
    </div>
  );
}

export default Header;

const _Container = styled.div`
  position: relative;
  display: flex;
  background-color: black;
  padding: 20px;
`;

const _StyledLogo = styled.img`
  width: 200px;
  height: 50px;
`;

const _Header_Input = styled.input`
  width: 320px;
  margin-left: 40px;
  height: 50px;
  background-color: black;
  color: white;
  font-size: 15px;
  border: none;
  border-bottom: 2px solid transparent;
  &:focus {
    outline: none;
    border-bottom-color: gray;
  }
`;

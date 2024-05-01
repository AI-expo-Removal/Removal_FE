import styled from "styled-components";
import logoSrc from "../images/logo.png";
import { useState } from "react";

function Header({ src }) {
  const [title, setTitle] = useState("");

  const handleDownloadVideo = () => {
    const link = document.createElement("a");
    link.href = src;
    link.download = `${title}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="App">
      <_Container>
        <_Left>
          <_StyledLogo src={logoSrc} alt="Logo" />
          <_Header_Input
            type="text"
            placeholder="제목을 입력해주세요"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
        </_Left>
        <_Button onClick={handleDownloadVideo}>내보내기</_Button>
      </_Container>
    </div>
  );
}

export default Header;

const _Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: black;
  padding: 0 60px 0 60px;
  height: 90px;
`;

const _Left = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
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

const _Button = styled.div`
  width: 96px;
  height: 44px;
  border-radius: 2px;
  background: linear-gradient(90deg, #3067ff 0%, #62c9ff 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s linear;
  &:hover {
    opacity: 0.9;
  }
`;

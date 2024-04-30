import { styled } from "styled-components";
import { Icon } from "./icon";
import { useState } from "react";

const menus = [
  { kind: "translate", title: "자동 번역1" },
  { kind: "subtitle", title: "자동 자막" },
  { kind: "erase", title: "비속어 삭제" },
];

const menuDetails = [
  {
    kind: "translate",
    descript: "비디오의 음성을 인식하여\n영어를 한국어로\nAI 자동 번역 합니다.",
    button: "AI 자동 번역하기",
  },
  {
    kind: "subtitle",
    descript: "비디오의 음성을 인식하여 \n자동 자막을 생성합니다.",
    button: "AI 자동 자막 생성",
  },
  {
    kind: "erase",
    descript: "비디오의 음성을 인식하여\n비속어를 삭제합니다.",
    button: "AI 비속어 삭제",
  },
];

export const SideBar = () => {
  const [menu, setMenu] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Div>
      <Wrapper isOpen={isOpen}>
        {menus.map((ele, index) => {
          return (
            <Menu
              key={index}
              onClick={() => {
                setMenu(index);
                if (index === menu && isOpen === true) {
                  setIsOpen(false);
                } else {
                  setIsOpen(true);
                }
              }}>
              <Icon kind={ele.kind} size={44} />
              {ele.title}
            </Menu>
          );
        })}
      </Wrapper>
      <Background isOpen={isOpen}>
        <Icon kind={menuDetails[menu].kind} color={"gray"} size={36} />
        <div>
          {menuDetails[menu].descript.split("\n").map((ele, index) => {
            return <Text key={index}>{ele}</Text>;
          })}
        </div>
        <Button>{menuDetails[menu].button}</Button>
      </Background>
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
  overflow: hidden;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Menu = styled.div`
  width: 120px;
  height: 142px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  color: white;
  cursor: pointer;
`;

const Text = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: white;
`;

const Button = styled.div`
  width: 160px;
  margin-top: 12px;
  height: 60px;
  border-radius: 8px;
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

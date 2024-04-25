import styled from "styled-components";
import Logo from "../images/Logo.png";
import Editor from "../images/Video_Editor.png";
import plus from "../images/plus.png";
import Edit from "../images/AI_Edit_With_Click.png";
import New from "../images/New_Edit.png";
import Start_Page from "../images/Start.png";
import Mobile from "../images/mobile_removal.png";

export const Landing = () => {
  return (
    <>
      <_Container>
        <_Header_Container>
          <_StyledLogo src={Logo} alt="Logo" />
          <_Header_Button>강해민님,안녕하세요</_Header_Button>
        </_Header_Container>
        <_Middle_Container>
          <_Styled_Editor src={Editor}></_Styled_Editor>
          <_Background>
            <_Upload>
              <_Styled_Plus src={plus}></_Styled_Plus>
              <_Text>영상 업로드</_Text>
            </_Upload>
          </_Background>
        </_Middle_Container>
        <_Middle_Container2>
          <_Styled_Edit src={Edit}></_Styled_Edit>
        </_Middle_Container2>
        <_Middle_Container2>
          <_Text_Container2>
            <_Text2>새로운</_Text2>
            <_Text3>영상편집</_Text3>
          </_Text_Container2>
        </_Middle_Container2>
        <_Middle_Container>
          <_Styled_New src={New}></_Styled_New>
        </_Middle_Container>
        <_Size_Container>
          <_Text_Container>
            <_Text2>사용하기 편한</_Text2>
            <_Text3>편집 툴</_Text3>
          </_Text_Container>
          <_Middle_Container>
            <_Text4>직관적인 UI로 누구나 쉽게 사용할 수 있습니다.</_Text4>
          </_Middle_Container>
          <_Middle_Container>
            <_Styled_Start src={Start_Page}></_Styled_Start>
          </_Middle_Container>
        </_Size_Container>
        <_Size_Container2>
          <_Text_Container2>
            <_Text2>모바일</_Text2>
            <_Text3>에서도 사용할 수 있어요</_Text3>
          </_Text_Container2>
          <_Middle_Container>
            <_Styled_Mobile src={Mobile}></_Styled_Mobile>
          </_Middle_Container>
        </_Size_Container2>
      </_Container>
    </>
  );
};

const _Container = styled.div`
  background-color: black;
`;

const _Header_Container = styled.div`
  position: relative;
  display: flex;
  background-color: black;
  padding: 20px;
  justify-content: space-between;
`;

const _Middle_Container = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
`;

const _Middle_Container2 = styled.div`
  margin-top: 160px;
  display: flex;
  justify-content: center;
`;

const _Text_Container = styled.div`
  display: flex;
  justify-content: center;
  height: 88px;
`;

const _Text_Container2 = styled.div`
  display: flex;
  justify-content: center;
  height: 150px;
`;

const _Size_Container = styled.div`
  margin-top: 100px;
`;

const _Size_Container2 = styled.div`
  margin-top: 60px;
`;

const _StyledLogo = styled.img`
  width: 200px;
  height: 50px;
`;

const _Styled_Editor = styled.img`
  width: 270px;
  height: 382px;
`;

const _Styled_Plus = styled.img`
  width: 22px;
  height: 22px;
  margin-right: 10px;
`;

const _Styled_Edit = styled.img`
  width: 760px;
  height: 234px;
`;

const _Styled_New = styled.img`
  width: 790px;
  height: 296px;
`;

const _Styled_Start = styled.img`
  width: 790px;
  height: 561px;
`;

const _Styled_Mobile = styled.img`
  width: 790px;
  height: 444px;
  margin-bottom: 150px;
`;

const _Header_Button = styled.div`
  width: 173px;
  height: 44px;
  background-color: #7a7a7a;
  border-radius: 30px;
  justify-content: space-between;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const _Background = styled.div`
  width: 480px;
  height: 360px;
  background-color: #2e2e2e;
  border-radius: 8px;
  margin-top: 20px;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const _Upload = styled.div`
  width: 350px;
  height: 60px;
  border-radius: 10px;
  background: linear-gradient(45deg, #3067ff, #62c9ff);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const _Text = styled.p`
  font-size: 20px;
  font-weight: 700;
`;

const _Text2 = styled.p`
  font-size: 50px;
  color: #62c9ff;
  font-weight: 700;
`;

const _Text3 = styled.p`
  margin-left: 20px;
  font-size: 50px;
  font-weight: 700;
  color: white;
`;

const _Text4 = styled.p`
  font-size: 20px;
  color: white;
  font-weight: 700;
`;

import React, { useRef, useState, useEffect } from "react";
import videoSrc from "../images/video/dummy.mp4";
import { styled } from "styled-components";

export const Edit = () => {
  const videoRef = useRef(null);
  const timeLineWrapperRef = useRef(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [isPause, setIsPause] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [markerPosition, setMarkerPosition] = useState(0);

  const updateMarkerPosition = () => {
    if (videoRef.current) {
      const videoDuration = videoRef.current.duration;
      const dynamicTimelineWidth = 120 * videoDuration;
      const positionRatio = currentTime / videoDuration;
      const positionInPixels = positionRatio * dynamicTimelineWidth;
      // console.log(videoDuration, positionRatio, positionInPixels);
      setMarkerPosition(positionInPixels);
    }
  };

  useEffect(() => {
    updateMarkerPosition();
  }, [currentTime, videoRef.current?.duration]);

  useEffect(() => {
    const videoElement = videoRef.current;
    const updateTime = () => {
      setCurrentTime(videoElement.currentTime);
    };

    videoElement.addEventListener("timeupdate", updateTime);

    return () => {
      videoElement.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  useEffect(() => {
    const capturePreviews = () => {
      const duration = videoRef.current.duration;
      const step = 1;
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const videoElement = videoRef.current;

      canvas.width = 160;
      canvas.height = 90;

      let currentTime = 0;
      let images = [];

      const generateSnapshot = () => {
        if (!videoElement.seeking && currentTime < duration) {
          context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
          images.push(canvas.toDataURL());
          currentTime += step;
          videoElement.currentTime = currentTime;
        } else if (currentTime >= duration) {
          setPreviewImages(images);
          videoElement.removeEventListener("seeked", generateSnapshot);
          videoElement.currentTime = 0;
        }
      };

      videoElement.addEventListener("seeked", generateSnapshot);
      videoElement.currentTime = currentTime;
    };

    const videoElement = videoRef.current;
    videoElement.addEventListener("loadedmetadata", capturePreviews);

    return () => {
      videoElement.removeEventListener("loadedmetadata", capturePreviews);
      videoElement.removeEventListener("seeked", capturePreviews);
    };
  }, []);

  const toggleVideoPlay = () => {
    setIsPause(!isPause);
    if (isPause) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const handleTimelineClick = (e) => {
    const timelineWidth = timeLineWrapperRef.current.offsetWidth;
    const clickPositionX = e.nativeEvent.offsetX;
    const clickRatio = clickPositionX / timelineWidth;

    console.log(timelineWidth, clickPositionX, clickRatio);
    if (videoRef.current) {
      const videoDuration = videoRef.current.duration;
      const newTime = videoDuration * clickRatio;
      console.log(videoDuration, newTime);
      videoRef.current.currentTime = newTime;
    }
  };

  return (
    <Container>
      <Wrapper>
        <Video ref={videoRef} style={{ width: "1100px", height: "620px" }}>
          <source src={videoSrc} type="video/mp4" />
          비디오를 지원하지 않는 브라우저입니다.
        </Video>
        <div onClick={toggleVideoPlay}>{isPause ? "시작" : "멈춤"}</div>
        <TimeLineWrapper ref={timeLineWrapperRef} onClick={handleTimelineClick}>
          <TimeLine>
            <Marker style={{ left: `${markerPosition}px` }} />

            {parseInt((document.body.clientWidth / 120).toFixed(0)) + 1 >
            previewImages.length ? (
              <>
                {new Array(
                  parseInt((document.body.clientWidth / 120).toFixed(0)) + 1
                )
                  .fill(null)
                  .map((_, index) => {
                    return (
                      <React.Fragment key={index}>
                        <Time>{`${String(Math.floor(index / 60)).padStart(
                          2,
                          "0"
                        )}:${String(index % 60).padStart(2, "0")}`}</Time>
                        {!(
                          index ===
                          new Array(
                            parseInt(
                              (document.body.clientWidth / 120).toFixed(0)
                            )
                          ).length
                        ) && <Line />}
                      </React.Fragment>
                    );
                  })}
              </>
            ) : (
              <>
                {previewImages.map((_, index) => {
                  return (
                    <React.Fragment key={index}>
                      <Time>{`${String(Math.floor(index / 60)).padStart(
                        2,
                        "0"
                      )}:${String(index % 60).padStart(2, "0")}`}</Time>
                      {!(index === previewImages.length - 1) && <Line />}
                    </React.Fragment>
                  );
                })}
              </>
            )}
          </TimeLine>
          <ImgContainer>
            {previewImages.map((src, index) => (
              <ImgWrapper key={index}>
                <img
                  src={src}
                  alt={`Preview ${index}`}
                  style={{ height: "80px" }}
                />
              </ImgWrapper>
            ))}
          </ImgContainer>
        </TimeLineWrapper>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const Video = styled.video`
  width: 1100px;
  height: 620px;
`;

const TimeLineWrapper = styled.div`
  cursor: pointer;
  width: 100%;
  height: 160px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-x: scroll;
  position: relative;
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: lightgray;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }
`;

const TimeLine = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 28px;
`;

const Marker = styled.div`
  position: absolute;
  height: 100%;
  width: 2px;
  background-color: red;
  transition: left 0.5s ease-out;
`;

const Time = styled.div`
  width: 119.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: none;
`;

const Line = styled.div`
  height: 8px;
  width: 1px;
  background-color: #949494;
  flex: none;
`;

const ImgContainer = styled.div`
  width: 100%;
  display: flex;
`;

const ImgWrapper = styled.div`
  width: 120px;
  flex: none;
  height: 80px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

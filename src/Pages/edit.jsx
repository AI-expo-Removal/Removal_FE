import React, { useRef, useState, useEffect } from "react";
// import videoSrc from "../images/video/dummy.mp4";
import playSrc from "../images/svg/play.svg";
import stopSrc from "../images/svg/stop.svg";
import { styled } from "styled-components";
import { SideBar } from "../components/sidebar";
import Header from "../components/header";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../apis";

export const Edit = () => {
  const { url } = useParams();
  const [videoSrc, setVideoSrc] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const videoRef = useRef(null);
  const timeLineWrapperRef = useRef(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [isPause, setIsPause] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [markerPosition, setMarkerPosition] = useState(0);

  useEffect(() => {
    const decodedUrl = decodeURIComponent(url);
    setVideoSrc(decodedUrl);
  }, [url]);

  const updateMarkerPosition = () => {
    if (videoRef.current) {
      const videoDuration = videoRef.current.duration;
      const dynamicTimelineWidth = 120 * videoDuration;
      const positionRatio = currentTime / videoDuration;
      const positionInPixels = positionRatio * dynamicTimelineWidth;
      setMarkerPosition(positionInPixels);
    }
  };

  useEffect(() => {
    updateMarkerPosition();
  }, [currentTime, videoRef.current?.duration]);

  useEffect(() => {
    if (!videoSrc) return;
    const videoElement = videoRef.current;
    const updateTime = () => {
      setCurrentTime(videoElement.currentTime);
    };

    videoElement.addEventListener("timeupdate", updateTime);

    return () => {
      videoElement.removeEventListener("timeupdate", updateTime);
    };
  }, [videoSrc]);

  useEffect(() => {
    if (!videoSrc) return;
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
          setIsLoaded(false);
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
  }, [videoSrc]);

  useEffect(() => {
    if (!videoSrc) return;
    function spaceKey(e) {
      if (e.code === "Space") {
        toggleVideoPlay();
      }
    }

    window.addEventListener("keydown", spaceKey);

    return () => {
      window.removeEventListener("keydown", spaceKey);
    };
  });

  const toggleVideoPlay = () => {
    setIsPause(!isPause);
    if (isPause) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const handleTimelineClick = (e) => {
    const scrollLeft = timeLineWrapperRef.current.scrollLeft;
    const clickPositionX = e.nativeEvent.offsetX + scrollLeft;
    const videoDuration = videoRef.current.duration;
    const dynamicTimelineWidth = 120 * videoDuration;
    const clickRatio = clickPositionX / dynamicTimelineWidth;

    if (videoRef.current) {
      const newTime = videoDuration * clickRatio;
      videoRef.current.currentTime = newTime;
    }
  };

  const handleRemoval = () => {
    setIsLoaded(true);

    axios
      .post(`${baseUrl}/removal`, {
        s3_url: toString(videoSrc),
      })
      .then((res) => {
        setIsLoaded(false);
        setVideoSrc(res.data.url);
      })
      .catch(() => {
        alert("error");
        setIsLoaded(false);
      });
  };

  const handleUpload = () => {
    setIsLoaded(true);

    axios
      .post(`${baseUrl}/upload`, {
        s3_url: toString(videoSrc),
      })
      .then((res) => {
        setIsLoaded(false);
        setVideoSrc(res.data.url);
      })
      .catch(() => {
        alert("error");
        setIsLoaded(false);
      });
  };

  const handleTranslate = () => {
    setIsLoaded(true);
    console.log(videoSrc);

    axios
      .post(`${baseUrl}/translate`, {
        s3_url: toString(videoSrc),
      })
      .then((res) => {
        setIsLoaded(false);
        setVideoSrc(res.data.url);
      })
      .catch(() => {
        alert("error");
        setIsLoaded(false);
      });
  };

  return (
    <TopContainer>
      {isLoaded && <Load>Loading...</Load>}
      {videoSrc && (
        <>
          <Header src={videoSrc} />
          <Container>
            <SideBar
              handleRemoval={handleRemoval}
              handleUpload={handleUpload}
              handleTranslate={handleTranslate}
            />
            <Wrapper>
              <VideoWrapper>
                <Video ref={videoRef} crossOrigin="anonymous">
                  <source src={videoSrc} type="video/mp4" />
                  비디오를 지원하지 않는 브라우저입니다.
                </Video>
              </VideoWrapper>
              <BottomWrapper>
                <VideoMenuWrapper>
                  <TimeInfo>
                    {currentTime.toFixed(2)}
                    <span>/{videoRef.current?.duration.toFixed(2)}</span>
                  </TimeInfo>
                  <div onClick={toggleVideoPlay}>
                    {isPause ? <img src={playSrc} /> : <img src={stopSrc} />}
                  </div>
                  <div></div>
                </VideoMenuWrapper>
                <TimeLineWrapper
                  ref={timeLineWrapperRef}
                  onClick={handleTimelineClick}>
                  <TimeLine>
                    <Marker
                      style={{ left: `${markerPosition}px` }}
                      isPause={isPause}
                    />
                    {parseInt((document.body.clientWidth / 120).toFixed(0)) +
                      1 >
                    previewImages.length ? (
                      <>
                        {new Array(
                          parseInt(
                            (document.body.clientWidth / 120).toFixed(0)
                          ) + 1
                        )
                          .fill(null)
                          .map((_, index) => {
                            return (
                              <React.Fragment key={index}>
                                <Time>{`${String(
                                  Math.floor(index / 60)
                                ).padStart(2, "0")}:${String(
                                  index % 60
                                ).padStart(2, "0")}`}</Time>
                                {!(
                                  index ===
                                  new Array(
                                    parseInt(
                                      (document.body.clientWidth / 120).toFixed(
                                        0
                                      )
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
                              {!(index === previewImages.length - 1) && (
                                <Line />
                              )}
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
              </BottomWrapper>
            </Wrapper>
          </Container>
        </>
      )}
    </TopContainer>
  );
};

const Load = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  font-size: 36px;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  color: white;
  font-weight: 700;
  z-index: 100;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #141414;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* gap: 48px; */
  padding-top: 20px;
`;

const VideoWrapper = styled.div`
  width: 100%;
  padding-left: 120px;
  display: flex;
  justify-content: center;
`;

const Video = styled.video`
  width: 990px;
  height: 558px;
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const VideoMenuWrapper = styled.div`
  width: 100vw;
  height: 56px;
  padding: 0 24px 0 144px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div {
    color: white;
    width: 90px;
  }
  > div:nth-child(2) {
    cursor: pointer;
  }
`;

const TimeInfo = styled.div`
  color: white;
  font-size: 16px;
  > span {
    color: #949494;
  }
`;

const TimeLineWrapper = styled.div`
  cursor: pointer;
  margin-left: 120px;
  width: 100%;
  height: 160px;
  margin-bottom: 2px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-x: scroll;
  position: relative;
  &::-webkit-scrollbar {
    height: 2px;
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
  pointer-events: none;
`;

const Marker = styled.div`
  position: absolute;
  bottom: 10px;
  height: 110px;
  width: 3px;
  border-radius: 2px;
  background-color: white;
  transition: ${({ isPause }) => (isPause ? "none" : "left 0.5s ease-out")};
  left: ${({ markerPosition }) => `${markerPosition}px`};
`;

const Time = styled.div`
  width: 119px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: none;
  color: #7a7a7a;
`;

const Line = styled.div`
  height: 8px;
  width: 1px;
  background-color: #7a7a7a;
  flex: none;
`;

const ImgContainer = styled.div`
  width: 100%;
  display: flex;
  pointer-events: none;
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

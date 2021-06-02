import React from "react";
import Animista, { AnimistaTypes } from "react-animista";
import Flippy, { BackSide, FrontSide } from "react-flippy";
import { connect } from "react-redux";
import { Button, Card, Image, Popup } from "semantic-ui-react";
import { BigPlayButton, ControlBar, LoadingSpinner, Player } from "video-react";
import { deleteVideo, fetchVideoToCache } from "../Redux/actions";

class VideoCard extends React.Component {
  state = {
    currentVideo: null,
  };

  componentDidMount() {
    const video = this.findVideoInCache(this.props.cardObj.id);
    if (video) {
      this.setState({ currentVideo: video });
    }
  }

  handleDeleteClick = () => {
    this.props.deleteVideo(this.props.cardObj);
  };

  handleVideoLoad = () => {
    const videoId = this.props.cardObj.id;
    const videoCardStateObj = {
      type: "VIDEO_CARD",
      videoId,
    };
    this.props.dispatchCacheVideo(videoCardStateObj);
  };

  findVideoInCache = (clickedVideoId) => {
    const video = this.props.videoCache.find((video) => {
      if (video.id === clickedVideoId) {
        return video;
      }
    });
    return video || null;
  };

  setVideoCardState = (video) => {
    this.setState({ currentVideo: video });
  };

  render() {
    return (
      <>
        <Animista type={AnimistaTypes.SCALE_UP_CENTER}>
          <Flippy flipOnHover={true}>
            <FrontSide>
              <Card
                id={this.props.cardObj.id}
                centered
                className="welcomeCard cardSize"
              >
                <Image src={this.props.image} className="cardImage" />
                <Card.Content>
                  <Card.Header className="content date">
                    {this.props.cardObj.date}
                  </Card.Header>
                  <Card.Header className="journalTitle">
                    {this.props.cardObj.title}
                  </Card.Header>
                </Card.Content>
              </Card>
            </FrontSide>
            <BackSide className="cardSize">
              <div className="background">
                <div className="videoCardDiv">
                  <Player>
                    {this.state.currentVideo ? (
                      <source src={this.state.currentVideo.url} />
                    ) : (
                      <Button onClick={this.handleVideoLoad}>Load video</Button>
                    )}
                    <ControlBar autoHide={false} />
                    <LoadingSpinner />
                    <BigPlayButton position="center" />
                  </Player>
                </div>

                <div className="buttonDiv">
                  <Popup
                    content="Warning!  This will delete this journal entry!"
                    trigger={
                      <Button
                        icon="close"
                        onClick={this.handleDeleteClick}
                        className="cardbutton delete"
                      />
                    }
                  />
                </div>
              </div>
            </BackSide>
          </Flippy>
        </Animista>
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteVideo: (journal) => dispatch(deleteVideo(journal)),
    dispatchCacheVideo: (videoCardStateObj) =>
      dispatch(fetchVideoToCache(videoCardStateObj)),
  };
}

function mapStateToProps(state) {
  return {
    videoCache: state.videoCache,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoCard);

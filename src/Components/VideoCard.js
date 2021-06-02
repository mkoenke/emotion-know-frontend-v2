import React from "react";
import Animista, { AnimistaTypes } from "react-animista";
import Flippy, { BackSide, FrontSide } from "react-flippy";
import { connect } from "react-redux";
import { Button, Card, Image, Popup } from "semantic-ui-react";
import { BigPlayButton, ControlBar, LoadingSpinner, Player } from "video-react";
import { deleteVideo } from "../Redux/actions";

class VideoCard extends React.Component {
  state = {
    currentVideo: null,
  };

  handleDeleteClick = () => {
    this.props.deleteVideo(this.props.cardObj);
  };

  handleVideoLoad = (e) => {
    fetch(`http://localhost:3000/video_entries/${this.props.cardObj.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': localStorage.getItem('token'),
        Accept: "application/json",
      },
      body: JSON.stringify(),
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ currentVideo: data });
      });
  };

  setVideoCardState = (video) => {
    this.setState({currentVideo: video})
  }

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
                    <Button onClick={this.handleVideoLoad}>Load video</Button>
                    {this.state.currentVideo ? (
                      <source src={this.state.currentVideo.url} />
                    ) : null}
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
  };
}

export default connect(null, mapDispatchToProps)(VideoCard);

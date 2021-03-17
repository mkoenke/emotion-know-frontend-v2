import React from 'react'
import { Parallax, ParallaxBanner } from 'react-scroll-parallax'
import { Grid, Header, Image } from 'semantic-ui-react'
import chooseSmile from '../assets/images/chooseSmile.jpeg'
import childGif from '../assets/images/emGif2.gif'
import handWith3Blocks from '../assets/images/handWith3Blocks.jpg'
import handWithBlock from '../assets/images/handWithBlock.jpg'
import handWithBlocks from '../assets/images/handWithBlocks.jpg'
import handWithVerticalBlocks from '../assets/images/handWithVerticalBlocks.jpg'
import parentGif from '../assets/images/repgif.gif'
import SignUpModal from '../Components/SignUpModal'

class Homepage extends React.Component {
  state = {
    modalView: false,
  }
  handleSignUpClick = () => {
    this.setState({ modalView: !this.state.modalView })
  }
  setViewModalStateToFalse = () => {
    if (this.state.modalView) {
      this.setState({ modalView: false })
    }
  }
  render() {
    return (
      <div className="background">
        <ParallaxBanner
          layers={[
            {
              image: handWithBlock,
              amount: 0.3,
            },
          ]}
          className="homepageBannerHeight"
        ></ParallaxBanner>

        <div>
          <div className="root height">
            <span className={`copy h1`}>
              <Parallax x={[-80, 80]} className="letter">
                EmotionKnow
              </Parallax>
            </span>
            <Header className="subHeader" size="large">
              Building Emotional Intelligence in Children
            </Header>
          </div>
        </div>
        <ParallaxBanner
          layers={[
            {
              image: handWithBlocks,
              amount: 0.3,
            },
          ]}
          className="homepageBannerHeight"
        ></ParallaxBanner>
        <div>
          <Grid
            verticalAlign="middle"
            container
            stackable
            className="homepageGrid"
          >
            <Grid.Row>
              <Grid.Column width={8}>
                <Image className="homepageImage" src={childGif} />
              </Grid.Column>
              <Grid.Column width={8}>
                <div className="homepageText">
                  Chidren, we are here to support you in your emotional growth.
                  Say goodbye to traditional diaries and journals, and say hello
                  to privacy and emotional feedback. Lighten the load you are
                  carrying by recording a video journal, and then review
                  emotional feedback on the universal emotions of Joy, Surprise,
                  Sadness, Disgust, Anger, and Fear from your entry. See all
                  your entries in your personal, private gallery.
                </div>
                <br />
                <div className="homepageText">
                  And don't forget to play with the Fun With Emotions Page to
                  see what emotions you can express with your face in real time!
                  You are beautifully emotionally intelligent!
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <ParallaxBanner
          layers={[
            {
              image: handWithVerticalBlocks,
              amount: 0.3,
            },
          ]}
          className="homepageBannerHeight"
        ></ParallaxBanner>
        <div>
          <Grid
            verticalAlign="middle"
            container
            stackable
            className="homepageGrid"
          >
            <Grid.Row>
              <Grid.Column width={8}>
                <div className="homepageText">
                  Parents, we are committed to helping you stay in the loop with
                  how your child is feeling. When your child uses EmotionKnow to
                  create a journal entry, you will recieve an email to keep you
                  posted. Log in to your portal to see the emotional reports
                  generated from your child's entries. We want to help you stay
                  attuned to your child’s wellbeing, providing an overall sense
                  of connectedness in families, and advanced communication
                  during these pivotal stages of development.
                </div>
              </Grid.Column>
              <Grid.Column width={8}>
                <Image className="homepageImage" src={parentGif} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <ParallaxBanner
          layers={[
            {
              image: handWith3Blocks,
              amount: 0.3,
            },
          ]}
          className="homepageBannerHeight"
        ></ParallaxBanner>
        <div className="root height">
          <span className={`copy h1`} onClick={this.handleSignUpClick}>
            <Parallax x={[80, -80]} className="letter link">
              Sign Up!
            </Parallax>
          </span>
        </div>
        {this.state.modalView && (
          <SignUpModal
            setViewModalStateToFalse={this.setViewModalStateToFalse}
          />
        )}
        <ParallaxBanner
          layers={[
            {
              image: chooseSmile,
              amount: 0.3,
            },
          ]}
          className="homepageBannerHeight"
        ></ParallaxBanner>
      </div>
    )
  }
}

export default Homepage

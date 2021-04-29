import React from 'react'
import { Parallax, ParallaxBanner } from 'react-scroll-parallax'
import { Grid, Header, Image, List } from 'semantic-ui-react'
import chooseSmile from '../assets/images/chooseSmile.jpeg'
import childGif from '../assets/images/emGif2.gif'
import handWithBlocks from '../assets/images/handWithBlocks.jpg'
import handWithVerticalBlocks from '../assets/images/handWithVerticalBlocks.jpg'
import resourceImage2 from '../assets/images/kidsPaperFamily.jpg'
import resourceImage from '../assets/images/paperFamily.jpg'
import parentGif from '../assets/images/repgif.gif'
class ResourcesPage extends React.Component {
  render() {
    return (
      <div className="resources">
        <ParallaxBanner
          layers={[
            {
              image: resourceImage2,
              amount: 0.3,
            },
          ]}
          className="bannerHeight"
        ></ParallaxBanner>
        <div className="root height">
          <span className="copy h1 spanMargin">
            <Parallax x={[-80, 80]} className="letter">
              About EmotionKnow
            </Parallax>
          </span>
          <Header size="large" className="subHeader">
            Building Emotional Intelligence in Children
          </Header>
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
                <div className="homepageText parallaxText">
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
              image: chooseSmile,
              amount: 0.3,
            },
          ]}
          className="homepageBannerHeight"
        ></ParallaxBanner>

        <Grid centered celled="internally" className="resourcesList">
          <Grid.Row>
            <Grid.Column width={5}>
              <Header textAlign="center" size="huge" className="resources">
                Child Resources
              </Header>
              <List divided>
                <List.Item href="https://childhood101.com/which-emotion-am-i-exploring-emotions-guessing-game/">
                  Which Emotion Am I? Exploring Emotions Guessing Game
                </List.Item>
                <List.Item href="https://childhood101.com/calm-down-bottle/">
                  Slow Motion Calm Down Sensory Bottle
                </List.Item>
                <List.Item href="https://eqforchildren.com/cjs-kids-club/the-cj-kids-club/">
                  The CJ Kids Club
                </List.Item>
                <List.Item href="https://gozen.com/ref/42/?campaign=Home">
                  GoZen
                </List.Item>
                <List.Item href="https://thesocialinstitute.com/">
                  The Social Institute
                </List.Item>
                <List.Item href="https://nourishingmyscholar.com/social-emotional-intelligence/">
                  Nourishing My Scholar Books List
                </List.Item>
                <List.Item href="https://positivepsychology.com/emotional-intelligence-exercises/">
                  13 Emotional Intelligence Activities & Exercises
                </List.Item>
                <List.Item href="https://www.thepathway2success.com/free-social-emotional-learning-resources/">
                  The Pathway 2 Success
                </List.Item>
                <List.Item href="https://www.sixwordmemoirs.com/teens/">
                  Six Word Memoirs
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={5}>
              <Header textAlign="center" size="huge" className="resources">
                Parent Resources
              </Header>
              <List divided>
                <List.Item href="https://www.psychologytoday.com/us/blog/compassion-matters/201603/why-we-need-teach-kids-emotional-intelligence">
                  Why We Need to Teach Kids Emotional Intelligence
                </List.Item>
                <List.Item href="https://www.naeyc.org/resources/pubs/yc/mar2017/teaching-emotional-intelligence">
                  Teaching Emotional Intelligence in Early Childhood
                </List.Item>
                <List.Item href="https://genmindful.com/">
                  Generation Mindful
                </List.Item>
                <List.Item href="https://www.mindfullittleminds.com/">
                  Mindful Little Minds
                </List.Item>
                <List.Item href="https://www.ahaparenting.com/parenting-tools/emotional-intelligence/steps-to-encourage">
                  5 Steps to Nurture Emotional Intelligence in Your Child
                </List.Item>
                <List.Item href="https://www.positiveparentingsolutions.com/parenting/positive-parenting-techniques">
                  5 Positive Parenting Techniques
                </List.Item>
                <List.Item href="https://www.positiveparentingsolutions.com/parenting/get-kids-to-listen">
                  How to Get Kids to (REALLY) Listen
                </List.Item>
                <List.Item href="https://www.positiveparentingsolutions.com/parenting/what-is-positive-parenting">
                  What is Positive Parenting? Does it Work?
                </List.Item>
                <List.Item href="https://www.positiveparentingsolutions.com/parenting/how-to-discipline-your-child">
                  How to Discipline Your Child
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <ParallaxBanner
          layers={[
            {
              image: resourceImage,
              amount: 0.3,
            },
          ]}
          className="bannerHeight"
        ></ParallaxBanner>
      </div>
    )
  }
}
export default ResourcesPage

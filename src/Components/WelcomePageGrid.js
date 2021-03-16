import React from 'react'
import { Card, Grid } from 'semantic-ui-react'
// import videoGalleryImage from '../assets/images/3rainbowStacked.jpg'
import funWithEmotions from '../assets/images/funWithEmotions.jpg'
import reportImage from '../assets/images/pencilBar.jpeg'
import RainbowPyramid from '../assets/images/rainbowBlockPyramid.jpg'
import videoImage from '../assets/images/rainbowBlocks.jpg'
import WelcomeCard from './WelcomeCard'

class WelcomePageGrid extends React.Component {
  cardObjects = () => {
    return [
      {
        id: 1,
        header: 'Record a Video Journal',
        image: videoImage,
        description: 'Express Yourself!  Record a Video Journal!',
        url: './webcam',
      },
      {
        id: 4,
        header: 'Video Gallery',
        image: RainbowPyramid,

        description: 'See all the videos you have recorded in the past!',
        url: './videos',
      },

      {
        id: 7,
        header: 'Report Gallery',
        image: reportImage,
        description: 'Check out how you have been feeling lately!',
        url: './reports',
      },
      {
        id: 8,
        header: 'Fun with Emotions',
        image: funWithEmotions,
        description: 'Lets see what emotions your face can express!',
        url: './fun',
      },
    ]
  }
  arrayOfCards = () => {
    return this.cardObjects().map((card) => {
      return (
        <Grid.Column>
          <WelcomeCard key={card.id} cardObj={card} />
        </Grid.Column>
      )
    })
  }
  render() {
    return (
      <Card.Group>
        <Grid centered columns="three" className="background">
          <Grid.Row className="shift">{this.arrayOfCards()}</Grid.Row>
        </Grid>
      </Card.Group>
    )
  }
}

export default WelcomePageGrid

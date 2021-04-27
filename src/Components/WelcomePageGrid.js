import React from 'react'
import { Card, Grid } from 'semantic-ui-react'
import pastelblue from '../assets/images/pastelblue.jpeg'
import pastelgreen from '../assets/images/pastelgreen.jpeg'
import pastelindigo from '../assets/images/pastelindigo.jpeg'
import pastelyellow from '../assets/images/pastelyellow.jpeg'
import WelcomeCard from './WelcomeCard'

class WelcomePageGrid extends React.Component {
  cardObjects = () => {
    return [
      {
        id: 1,
        header: 'Record a Video Journal',
        image: pastelgreen,
        description: 'Express Yourself!  Record a Video Journal!',
        url: './webcam',
      },
      {
        id: 4,
        header: 'Video Gallery',
        image: pastelblue,
        description: 'See all the videos you have recorded in the past!',
        url: './videos',
      },

      {
        id: 7,
        header: 'Report Gallery',
        image: pastelindigo,
        description: 'Check out how you have been feeling lately!',
        url: './reports',
      },
      {
        id: 8,
        header: 'Fun with Emotions',
        image: pastelyellow,
        description: 'Lets see what emotions your face can express!',
        url: './fun',
      },
    ]
  }
  arrayOfCards = () => {
    return this.cardObjects().map((card) => {
      return (
        <Grid.Column width={5}>
          <WelcomeCard key={card.id} cardObj={card} />
        </Grid.Column>
      )
    })
  }
  render() {
    return (
      <Card.Group>
        <Grid columns={2} centered className="background">
          <Grid.Row centered columns={2}>
            {this.arrayOfCards().slice(0, 2)}
          </Grid.Row>
          <Grid.Row centered columns={2}>
            {this.arrayOfCards().slice(2)}
          </Grid.Row>
        </Grid>
      </Card.Group>
    )
  }
}

export default WelcomePageGrid

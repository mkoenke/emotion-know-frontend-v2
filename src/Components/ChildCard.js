import React from 'react'
import Animista, { AnimistaTypes } from 'react-animista'
import { NavLink } from 'react-router-dom'
import { Card, Image } from 'semantic-ui-react'

class ChildCard extends React.Component {
  render() {
    console.log(this.props)
    return (
      <>
        <Animista type={AnimistaTypes.ROTATE_SCALE_DOWN}>
          <NavLink to="/reports">
            <Card
              className="welcomeCard cardSize grow"
              fluid
              id={this.props.childObj.id}
              centered
              onClick={() => this.props.filterReports(this.props.childObj.id)}
            >
              <Image className="cardImage" src={this.props.childObj.image} />
              <Card.Content className="content">
                <Card.Header textAlign="center" className="content">
                  {this.props.childObj.name}
                </Card.Header>

                <Card.Description textAlign="center" className="cardDesc">
                  {this.props.childObj.name}
                </Card.Description>
              </Card.Content>
            </Card>
          </NavLink>
        </Animista>
      </>
    )
  }
}

export default ChildCard

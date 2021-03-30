import JwPagination from 'jw-react-pagination'
import React from 'react'
import { connect } from 'react-redux'
import { Grid, Header } from 'semantic-ui-react'
import pastelblue from '../assets/images/pastelblue.jpeg'
import pastelgreen from '../assets/images/pastelgreen.jpeg'
import pastelindigo from '../assets/images/pastelindigo.jpeg'
import pastelyellow from '../assets/images/pastelyellow.jpeg'
// import raindbowStacked from '../assets/images/3rainbowStackedOriginal.jpg'
// import stackedRainbowBlocks from '../assets/images/stackedRainbowBlocksOriginal.jpg'
// import rainbowWithHand from '../assets/images/stackedRainbowBlocksWithHandOriginal.jpg'
// import threeRainbow from '../assets/images/threeRainbowBlocksOriginal.jpg'
import VideoCard from '../Components/VideoCard'

class VideoGalleryPage extends React.Component {
  state = {
    items: [],
    pageOfItems: [],
  }

  componentDidMount() {
    this.setState({ items: this.props.allVideos })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.items !== this.props.allVideos) {
      this.setState({ items: this.props.allVideos })
    }
  }

  onChangePage = (pageOfItems) => {
    this.setState({ pageOfItems })
  }
  arrayOfJournals = () => {
    // const imageArray = [
    //   raindbowStacked,
    //   threeRainbow,
    //   stackedRainbowBlocks,
    //   rainbowWithHand,
    // ]
    const imageArray = [pastelgreen, pastelblue, pastelindigo, pastelyellow]
    let i = 0
    return this.state.pageOfItems.map((card) => {
      if (i < imageArray.length - 1) {
        i++
      } else {
        i = 0
      }
      return (
        <Grid.Column>
          <VideoCard
            centered
            key={card.id}
            cardObj={card}
            image={imageArray[i]}
          />
        </Grid.Column>
      )
    })
  }
  render() {
    const customLabels = {
      first: '<<',
      last: '>>',
      previous: '<',
      next: '>',
    }
    return (
      <>
        <div className="background pagePadding">
          {this.props.child ? (
            <Header className="pageHeader" size="huge" textAlign="center">
              {this.props.child.username}'s Video Journals
            </Header>
          ) : null}

          <Grid centered columns="three">
            <Grid.Row>{this.arrayOfJournals()}</Grid.Row>
            <div className="paginateLarge">
              <JwPagination
                items={this.state.items}
                onChangePage={this.onChangePage}
                labels={customLabels}
                pageSize={9}
              />
            </div>
          </Grid>
        </div>
      </>
    )
  }
}
function mapStateToProps(state) {
  return {
    child: state.child,
    allVideos: state.allVideos,
  }
}
export default connect(mapStateToProps)(VideoGalleryPage)

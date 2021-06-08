import JwPagination from 'jw-react-pagination';
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Header } from 'semantic-ui-react';
import pastelblue from '../assets/images/pastelblue.jpeg';
import pastelgreen from '../assets/images/pastelgreen.jpeg';
import pastelindigo from '../assets/images/pastelindigo.jpeg';
import pastelyellow from '../assets/images/pastelyellow.jpeg';
import EmptyGalleryModal from '../Components/EmptyGalleryModal';
import VideoCard from '../Components/VideoCard';

class VideoGalleryPage extends React.Component {
  state = {
    items: null,
    pageOfItems: [],
  };

  componentDidMount() {
    this.setState({ items: this.props.videoEntries });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.items !== this.props.videoEntries) {
      this.setState({ items: this.props.videoEntries });
    }
  }

  onChangePage = (pageOfItems) => {
    this.setState({ pageOfItems });
  };
  arrayOfJournals = () => {
    const imageArray = [pastelgreen, pastelblue, pastelindigo, pastelyellow];
    let i = 0;
    return this.state.pageOfItems.map((card) => {
      if (i < imageArray.length - 1) {
        i++;
      } else {
        i = 0;
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
      );
    });
  };

  render() {
    const customLabels = {
      first: '<<',
      last: '>>',
      previous: '<',
      next: '>',
    };

    console.log(this.state);
    return (
      <>
        <div className="background pagePadding">
          {this.props.child ? (
            <Header className="pageHeader" size="huge" textAlign="center">
              {this.props.child.username}'s Video Journals
            </Header>
          ) : null}
          {this.state.items ? (
            <Grid centered columns="three">
              <Grid.Row>{this.arrayOfJournals()}</Grid.Row>
              <div className="paginateLarge">
                <JwPagination
                  items={this.state.items.reverse()}
                  onChangePage={this.onChangePage}
                  labels={customLabels}
                  pageSize={9}
                />
              </div>
            </Grid>
          ) : (
            <EmptyGalleryModal />
          )}
        </div>
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    child: state.child,
    videoEntries: state.videoEntries,
  };
}
export default connect(mapStateToProps)(VideoGalleryPage);

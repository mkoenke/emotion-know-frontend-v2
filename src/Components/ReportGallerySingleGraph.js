import { Grid, Header } from 'semantic-ui-react'
import D3LineGraph from './D3LineGraph'
import { BigPlayButton, ControlBar, LoadingSpinner, Player } from 'video-react'
// import { useSelector } from 'react-redux'

export default function ReportGallerySingleGraph(reportGalleryState) {
  // const parent = useSelector((state) => state.parent)
  // console.log("PARENT", parent)
  return (
    <Grid centered columns="two">
      <Grid.Row>
        <Grid.Column>
          <Header>
            {reportGalleryState.clickedReport.title}
          </Header>
          <div className="bargraph smallGraph pattern smallGraphPadding">
            <D3LineGraph data={reportGalleryState.clickedReport} />
          </div>
        </Grid.Column>
        <Grid.Column>
          <Header textAlign="center" className="reportHeader">
            {reportGalleryState.clickedJournal.title}
          </Header>
          <div className="bargraph smallGraph pattern">
            {!reportGalleryState.clickedJournal.video ? null
              : <Player>
                <source src={reportGalleryState.clickedJournal.url} />
                <ControlBar autoHide={false} />
                <LoadingSpinner />
                <BigPlayButton position="center" />
              </Player>
            }
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
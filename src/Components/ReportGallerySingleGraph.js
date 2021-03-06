import { Grid, Header } from 'semantic-ui-react'
import D3LineGraph from './D3LineGraph'
import { BigPlayButton, ControlBar, LoadingSpinner, Player } from 'video-react'

export default function ReportGallerySingleGraph(reportGalleryState, parent) {
  return (
    <>
      { reportGalleryState.clickedReport
        ? <Grid centered columns="two">
          <Grid.Row>
            <Grid.Column>
              <Header className="reportHeader">
                {reportGalleryState.clickedReport.title}
              </Header>
              <div className="bargraph smallGraph pattern smallGraphPadding">
                <D3LineGraph data={reportGalleryState.clickedReport} />
              </div>
            </Grid.Column>
            <Grid.Column>
              <Header className="reportHeader">
                {reportGalleryState.clickedReport.title}
              </Header>
              <div className="bargraph smallGraph pattern">
                {parent || !reportGalleryState.clickedVideo 
                  ? null
                  : <Player>
                    <source src={reportGalleryState.clickedVideo.url} />
                    <ControlBar autoHide={false} />
                    <LoadingSpinner />
                    <BigPlayButton position="center" />
                  </Player>
                }
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        : null
      }
    </>
  )
}
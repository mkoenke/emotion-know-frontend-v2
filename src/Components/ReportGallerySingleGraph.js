import { Grid, Header } from 'semantic-ui-react'
import D3LineGraph from './d3LineChart'
import { BigPlayButton, ControlBar, LoadingSpinner, Player } from 'video-react'

export default function ReportGallerySingleGraph() {
  return (
    <Grid centered columns="two">
      <Grid.Row>
        <Grid.Column>
          <div className="bargraph smallGraph pattern smallGraphPadding">
            <h2>{this.state.clickedReport.title}</h2>
            <D3LineGraph data={this.state.clickedReport} />
          </div>
        </Grid.Column>
        <Grid.Column>
          <div className="bargraph smallGraph pattern">
            <Header textAlign="center" className="reportHeader">
              {this.state.clickedJournal.title}
            </Header>

            {this.state.clickedJournal.video ? (
              <Player>
                <source src={this.state.clickedJournal.url} />
                <ControlBar autoHide={false} />
                <LoadingSpinner />
                <BigPlayButton position="center" />
              </Player>
            ) : null}
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
import { Grid, Header } from 'semantic-ui-react'
import D3LineGraph from './d3LineChart'
import { BigPlayButton, ControlBar, LoadingSpinner, Player } from 'video-react'

export default function ReportGallerySingleGraph (props) {
    return (
      <Grid centered columns="two">
        <Grid.Row>
          <Grid.Column>
            <div className="bargraph smallGraph pattern smallGraphPadding">
              <h2>{props.clickedReport.title}</h2>
              <D3LineGraph data={props.clickedReport} />
            </div>
          </Grid.Column>
          <Grid.Column>
            <div className="bargraph smallGraph pattern">
              <Header textAlign="center" className="reportHeader">
                {props.clickedJournal.title}
              </Header>
  
              {props.clickedJournal.video ? (
                <Player>
                  <source src={props.clickedJournal.url} />
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
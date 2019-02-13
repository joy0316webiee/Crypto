import highchartsConfig from './HighChartsConfig';
import highchartsTheme from './HighChartsTheme';
import React from 'react';
import { Tile } from '../Shared/Tile';
import { AppContext } from '../App/AppProvider';
import ReactHighCharts from 'react-highcharts';
import { ChartSelect } from './ChartSelect';
ReactHighCharts.Highcharts.setOptions(highchartsTheme);

export default function() {
  return (
    <AppContext.Consumer>
      {({historical, changeChartSelect}) =>
        <Tile>
          <ChartSelect
            defaultValue="months"
            onChange={e => changeChartSelect(e.target.value)}
          >
            <option value="days"> Days </option>
            <option value="weeks"> Weeks </option>
            <option value="months"> Months </option>
          </ChartSelect>
          {historical ?
            <ReactHighCharts config={highchartsConfig(historical)} />
            : <div> Loading Historical Data </div>
          }
        </Tile>
      }
    </AppContext.Consumer>
  );
}
import React from "react";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../Components/Common/ChartsDynamicColor";

const DashboardCharts = ({ seriesData, dataColors }:any) => {
  var candidateColors = getChartColorsArray(dataColors);

  const series = [seriesData];
  const options = {
    chart: {
      type: "radialBar",
      width: 105,
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "70%",
        },
        track: {
          margin: 1,
        },
        dataLabels: {
          show: true,
          name: {
            show: false,
          },
          value: {
            show: true,
            fontSize: "16px",
            fontWeight: 600,
            offsetY: 8,
          },
        },
      },
    },
    colors: candidateColors,
  };
  return (
    <React.Fragment>
      <ReactApexChart dir="ltr"
        options={options}
        series={[...series]}
        type="radialBar"
        id="total_jobs"
        width="105"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

export default DashboardCharts;

import React from 'react';
import { Line, Bar, Pie, Doughnut, Radar, PolarArea} from "react-chartjs-2";
import getChartColorsArray from "../../../Components/Common/ChartsDynamicColor";

import 'chart.js/auto';
import { Chart, CategoryScale } from 'chart.js';
Chart.register(CategoryScale);

const LineChart = ({dataColors}:any) => {
    var lineChartColor =  getChartColorsArray(dataColors);
    const data:any= {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October"],
        datasets: [
            {
                label: "Sales Analytics",
                fill: true,
                lineTension: 0.5,
                backgroundColor: lineChartColor[0],
                borderColor: lineChartColor[1],
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: lineChartColor[1],
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: lineChartColor[1],
                pointHoverBorderColor: "#fff",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81, 56, 55, 40, 55, 30, 80]
            },
            {
                label: "Monthly Earnings",
                fill: true,
                lineTension: 0.5,
                backgroundColor: lineChartColor[2],
                borderColor: lineChartColor[3],
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: lineChartColor[3],
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: lineChartColor[3],
                pointHoverBorderColor: "#EEF0F2",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [80, 23, 56, 65, 23, 35, 85, 25, 92, 36]
            }
        ]
    }
    const option:any= {
        x: {
            ticks: {
                font: {
                    family: 'Poppins',
                },
            },
        },
        y: {
            ticks: {
                font: {
                    family: 'Poppins',
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        family: 'Poppins',
                    }
                }
            },
        },
    }
  return (
    <React.Fragment>
      <Line width={723} height={320} data={data} options={option} />
    </React.Fragment>
  )
}
//Bar Chart
const BarChart = ({dataColors}:any) => {
    var barChartColor =  getChartColorsArray(dataColors);
    const data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "Sales Analytics",
                backgroundColor: barChartColor[0],
                borderColor: barChartColor[0],
                borderWidth: 1,
                hoverBackgroundColor: barChartColor[1],
                hoverBorderColor: barChartColor[1],
                data: [65, 59, 81, 45, 56, 80, 50,20]
            }
        ]
    }
    const option = {
        x: {
            ticks: {
                font: {
                    family: 'Poppins',
                },
            },
        },
        y: {
            ticks: {
                font: {
                    family: 'Poppins',
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        family: 'Poppins',
                    }
                }
            },
        }
    }
  return (
    <React.Fragment>
      <Bar width={723} height={320} data={data} options={option} />
    </React.Fragment>
  )
}
//Pie Chart
const PieChart = ({dataColors}:any) => {
    var pieChartColors =  getChartColorsArray(dataColors);
    const data={
        labels: [
            "Desktops",
            "Tablets"
        ],
        datasets: [
            {
                data: [300, 180],
                backgroundColor: pieChartColors,
                hoverBackgroundColor: pieChartColors,
                hoverBorderColor: "#fff"
            }]
    },
    option= {
        plugins: {
            legend: {
                labels: {
                    font: {
                        family: 'Poppins',
                    }
                }
            },
        }
    }
  return (
    <React.Fragment>
      <Pie data={data} options={option} className="chartjs-chart" />
    </React.Fragment>
  )
}
//Donut Chart
const DonutChart = ({dataColors}:any) => {
    var doughnutChartColors =  getChartColorsArray(dataColors);
    const data = {
        labels: [
            "Desktops",
            "Tablets"
        ],
        datasets: [
            {
                data: [300, 210],
                backgroundColor: doughnutChartColors,
                hoverBackgroundColor: doughnutChartColors,
                hoverBorderColor: "#fff"
            }]
    },
    option = {
        plugins: {
            legend: {
                labels: {
                    font: {
                        family: 'Poppins',
                    }
                }
            },
        }
    }
  return (
    <React.Fragment>
      <Doughnut data={data} options={option} className="chartjs-chart" />
    </React.Fragment>
  )
}
//Polar Chart
const PolarChart = ({dataColors}:any) => {
    var polarAreaChartColors =  getChartColorsArray(dataColors);
    const data = {
        labels: [
            "Series 1",
            "Series 2",
            "Series 3",
            "Series 4"
        ],
        datasets: [{
            data: [
                11,
                16,
                7,
                18
            ],
            backgroundColor: polarAreaChartColors,
            label: 'My dataset', // for legend
            hoverBorderColor: "#fff"
        }]
    }
    const option= {
        plugins: {
            legend: {
                labels: {
                    font: {
                        family: 'Poppins',
                    }
                }
            },
        }
    }
  return (
    <React.Fragment>
      <PolarArea className="chartjs-chart" data={data} options={option} />
    </React.Fragment>
  )
}
//Radar Chart
const RadarChart = ({dataColors}:any) => {
    var radarChartColors =  getChartColorsArray(dataColors);
    const data = {
        labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
        datasets: [
            {
                label: "Desktops",
                backgroundColor: radarChartColors[0],
                borderColor: radarChartColors[1], //"#2AB57D",
                pointBackgroundColor: radarChartColors[1], //"#2AB57D",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: radarChartColors[1], //"#2AB57D",
                data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
                label: "Tablets",
                backgroundColor: radarChartColors[2], //"rgba(81, 86, 190, 0.2)",
                borderColor: radarChartColors[3], //"#5156BE",
                pointBackgroundColor: radarChartColors[3], //"#5156BE",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: radarChartColors[3], //"#5156BE",
                data: [28, 48, 40, 19, 96, 27, 100]
            }
        ]
    },
    option = {
        plugins: {
            legend: {
                labels: {
                    font: {
                        family: 'Poppins',
                    }
                }
            },
        }
    }
  return (
    <React.Fragment>
      <Radar className="chartjs-chart" data={data} options={option} />
    </React.Fragment>
  )
}

export {LineChart,BarChart,PieChart,DonutChart,PolarChart,RadarChart}
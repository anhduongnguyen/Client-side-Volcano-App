import React, { useRef, useEffect } from "react";
import Chart from 'chart.js/auto';

/* Display the population radius chart, some of the code has 
been taken from chart.js */
export default function PopulationChart({ populationData }) {
  const chartContainer = useRef();

  /* Configure and display the chart based on the 
  population data of the chosen volcano */
  useEffect(() => {
    if (!populationData || !chartContainer.current) return;

    const ctx = chartContainer.current.getContext("2d");

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["5km", "10km", "30km", "100km"],
        datasets: [
          {
            label: "Population",
            backgroundColor: "rgb(221,49,32)",
            borderColor: "rgb(,0,0,1)",
            borderWidth: 2,
            data: [
              populationData.population_5km,
              populationData.population_10km,
              populationData.population_30km,
              populationData.population_100km,
            ],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'category',
            title: {
              display: true,
              text: 'Radius',
              font: {
                size: 16
              }
            },
          },
          y: {
            ticks: {
              beginAtZero: true,
              stepSize: 2000
            },
            title: {
              display: true,
              text: 'Population Count',
              font: {
                size: 16
              }
            },
          },
        },
        plugins: {
          legend: {
            display: true,
          },
          title: {
            display: true,
            text: "Population Density",
            font: {
              size: 30
            }
          },
          datalabels: {
            display: true,
            color: 'black',
            anchor: 'end',
            align: 'end',
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [populationData]);

  return <canvas ref={chartContainer} />;
}

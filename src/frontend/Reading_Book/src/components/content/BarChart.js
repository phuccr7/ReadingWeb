import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartData }) {
  return <Bar data={chartData} options={{
    scales:{
      y:{
        beginAtZero:true,
        grace:1,
        ticks:{
          stepSize:10
        }
      }
    }
  }}/>;
}

export default BarChart;
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    x: {
      ticks: {
        autoskip: false,
        maxRotation: 0,
        minRotation: 0,
      },
      grid: {
        display: true,
      },
    },
    y: {
      min: 0,
      max: 3,
      ticks: {
        precision: 0,
      },
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    tooltip: {
      enabled: false,
    },
    legend: {
      display: false,
      position: "top",
    },
  },
};

function OneMonthChart(props) {
  const labels = new Array(props.lastDayInMonth).fill(0).map((_, i) => i + 1);

  const mapPainScore = labels.map((label) => {
    const found = props.data.find((item) => {
      const date = new Date(item.headache_score_date);
      return date.getDate() === label;
    });
    if (found) {
      return found.headache_score;
    } else {
      return 0.5;
    }
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Headache Score",
        data: mapPainScore,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const greenGradient = ctx.createLinearGradient(0, 0, 0, 200);
          greenGradient.addColorStop(1, "rgba(154, 255, 203, 1)");
          greenGradient.addColorStop(0, "rgba(154, 255, 203, 1)");

          const blueGradient = ctx.createLinearGradient(0, 0, 0, 200);
          blueGradient.addColorStop(1, "rgba(6, 121, 224, 0.5)");
          blueGradient.addColorStop(0, "rgba(6, 121, 224, 1)");

          const yellowGradient = ctx.createLinearGradient(0, 0, 0, 200);
          yellowGradient.addColorStop(1, "rgba(253, 199, 47, 0.5)");
          yellowGradient.addColorStop(0, "rgba(253, 199, 47, 1)");

          const redGradient = ctx.createLinearGradient(0, 0, 0, 200);
          redGradient.addColorStop(1, "rgba(252, 86, 5, 0.5)");
          redGradient.addColorStop(0, "rgba(252, 86, 5, 1)");

          switch (mapPainScore[context.dataIndex]) {
            case 0.5:
              return greenGradient;

            case 1:
              return blueGradient;

            case 2:
              return yellowGradient;

            case 3:
              return redGradient;

            default:
              greenGradient;
              break;
          }
        },
        borderColor: "transparent",
        borderRadius: 3,
      },
    ],
  };

  return <Bar options={options} data={data} className="mt-[20px]" />;
}

export default OneMonthChart;

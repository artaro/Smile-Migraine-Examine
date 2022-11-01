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
      max: 31,
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

function ThreeMonthChart(props) {
  const secondFullDate = `${
    new Date(props.data[0].headache_score_date).toISOString("TH").split("T")[0]
  }`;

  const thirdFullDate = `${
    new Date(props.data[props.data.length - 1].headache_score_date)
      .toISOString("TH")
      .split("T")[0]
  }`;

  const firstShortMonth = "ส.ค.";

  const secondShortMonth = `${new Date(
    props.data[0].headache_score_date
  ).toLocaleString("TH", {
    month: "short",
  })}`;

  const thirdShortMonth = `${new Date(
    props.data[props.data.length - 1].headache_score_date
  ).toLocaleString("TH", {
    month: "short",
  })}`;

  const labels = [firstShortMonth, secondShortMonth, thirdShortMonth];

  const mapSecondMonthPainScore = props.data
    .filter((item) => {
      const date = new Date(item.headache_score_date);
      return date.getMonth() === 8;
    })
    .map((item) => item.headache_score);

  const handleSumSecondMonthScore = (score) => {
    const sumSecondMonthScore = mapSecondMonthPainScore
      .filter((item) => item === score)
      .reduce((prev, curr) => prev + curr, 0);

    return sumSecondMonthScore;
  };

  const arraySecondMonthSumScore = new Array(4).fill(0).map((_, i) => {
    return handleSumSecondMonthScore(i);
  });

  const mapThirdMonthPainScore = props.data
    .filter((item) => {
      const date = new Date(item.headache_score_date);
      return date.getMonth() === 9;
    })
    .map((item) => item.headache_score);

  const handleSumThirdMonthScore = (score) => {
    const sumThirdMonthScore = mapThirdMonthPainScore
      .filter((item) => item === score)
      .reduce((prev, curr) => prev + curr, 0);

    return sumThirdMonthScore;
  };

  const arrayThirdMonthSumScore = new Array(4).fill(0).map((_, i) => {
    return handleSumThirdMonthScore(i);
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Red",
        data: [1, arraySecondMonthSumScore[3], arrayThirdMonthSumScore[3]],
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const redGradient = ctx.createLinearGradient(0, 0, 0, 200);
          redGradient.addColorStop(1, "rgba(252, 86, 5, 0.5)");
          redGradient.addColorStop(0, "rgba(252, 86, 5, 1)");

          return redGradient;
        },
        borderColor: "transparent",
        borderRadius: 6,
      },
      {
        label: "Yellow",
        data: [1, arraySecondMonthSumScore[2], arrayThirdMonthSumScore[2]],
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const yellowGradient = ctx.createLinearGradient(0, 0, 0, 200);
          yellowGradient.addColorStop(1, "rgba(253, 199, 47, 0.5)");
          yellowGradient.addColorStop(0, "rgba(253, 199, 47, 1)");

          return yellowGradient;
        },
        borderColor: "transparent",
        borderRadius: 6,
      },
      {
        label: "Blue",
        data: [1, arraySecondMonthSumScore[1], arrayThirdMonthSumScore[1]],
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const blueGradient = ctx.createLinearGradient(0, 0, 0, 200);
          blueGradient.addColorStop(1, "rgba(6, 121, 224, 0.5)");
          blueGradient.addColorStop(0, "rgba(6, 121, 224, 1)");

          return blueGradient;
        },
        borderColor: "transparent",
        borderRadius: 6,
      },
      {
        label: "Green",
        data: [31, 18, 20],
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const greenGradient = ctx.createLinearGradient(0, 0, 0, 200);
          greenGradient.addColorStop(1, "rgba(154, 255, 203, 1)");
          greenGradient.addColorStop(0, "rgba(154, 255, 203, 1)");

          return greenGradient;
        },
        borderColor: "transparent",
        borderRadius: 6,
      },
    ],
  };

  return <Bar options={options} data={data} className="mt-[20px]" />;
}

export default ThreeMonthChart;

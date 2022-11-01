import React, { useEffect, useState } from "react";
import axios from "axios";
import { painCareful, painMiddle, painNo, painNotGood } from "../assets";
import OneMonthChart from "./OneMonthChart";
import ThreeMonthChart from "./ThreeMonthChart";
import SixMonthChart from "./SixMonthChart";

function ChartMainLayout() {
  const [oneMonthData, setOneMonthData] = useState([
    { headache_score: 0, headache_score_date: "2021-01-01" },
  ]);
  const [threeMonthData, setThreeMonthData] = useState([
    { headache_score: 0, headache_score_date: "2021-01-01" },
  ]);
  const [sixMonthData, setSixMonthData] = useState([
    { headache_score: 0, headache_score_date: "2021-01-01" },
  ]);
  const [period, setPeriod] = useState(1);

  const fetchOneMonthData = async () => {
    try {
      const result = await axios(
        "https://smile-migraine-api-2k6beg54tq-as.a.run.app/developers-headache/prev/30"
      );

      setOneMonthData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchThreeMonthData = async () => {
    try {
      const result = await axios(
        "https://smile-migraine-api-2k6beg54tq-as.a.run.app/developers-headache/prev/90"
      );

      setThreeMonthData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSixMonthData = async () => {
    try {
      const result = await axios(
        "https://smile-migraine-api-2k6beg54tq-as.a.run.app/developers-headache/prev/180"
      );

      setSixMonthData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOneMonthData();

    fetchThreeMonthData();

    fetchSixMonthData();
  }, [period]);

  const monthAndYear = (period) => {
    switch (period) {
      case 1:
        return new Date(oneMonthData[0].headache_score_date).toLocaleString(
          "TH",
          {
            month: "long",
            year: "numeric",
          }
        );

      case 3:
        const threeMonthsPeriod = `${new Date("2022-08-01").toLocaleString(
          "TH",
          {
            month: "long",
            year: "numeric",
          }
        )} - ${new Date(
          threeMonthData[threeMonthData.length - 1].headache_score_date
        ).toLocaleString("TH", {
          month: "long",
          year: "numeric",
        })}`;

        return threeMonthsPeriod;

      case 6:
        const sixMonthsPeriod = `${new Date(
          sixMonthData[0].headache_score_date
        ).toLocaleString("TH", {
          month: "long",
          year: "numeric",
        })} - ${new Date(
          sixMonthData[sixMonthData.length - 1].headache_score_date
        ).toLocaleString("TH", {
          month: "long",
          year: "numeric",
        })}`;

        return sixMonthsPeriod;

      default:
        break;
    }
  };
  //count no pain in one month

  const daysInMonthCounter = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const daysInOneMonth = new Date(oneMonthData[0].headache_score_date)
    .toLocaleDateString()
    .split("/");

  const lastDayInOneMonth = daysInMonthCounter(
    parseInt(daysInOneMonth[0]),
    parseInt(daysInOneMonth[2])
  );

  const painNoCount = lastDayInOneMonth - oneMonthData.length;
  //end

  const painMiddleCount = oneMonthData.filter(
    (item) => item.headache_score === 1
  ).length;

  const painNotGoodCount = oneMonthData.filter(
    (item) => item.headache_score === 2
  ).length;

  const painCarefulCount = oneMonthData.filter(
    (item) => item.headache_score === 3
  ).length;

  //count no pain in three month
  const findMonthsInThreeMonthData = threeMonthData.reduce((prev, curr) => {
    const date = new Date(curr.headache_score_date);
    const month = date.getMonth();
    const year = date.getFullYear();
    const monthAndYear = `${month + 1}-${year}`;
    if (!prev.includes(monthAndYear)) {
      prev.push(monthAndYear);
    }
    return prev;
  }, []);

  const totalDaysInThreeMonth = findMonthsInThreeMonthData.reduce(
    (prev, curr) => {
      const month = parseInt(curr.split("-")[0]);
      const year = parseInt(curr.split("-")[1]);
      const daysInMonth = daysInMonthCounter(month, year);
      prev += daysInMonth;
      return prev;
    },
    0
  );

  const painNoCountInThreeMonth = totalDaysInThreeMonth - threeMonthData.length;

  const painMiddleCountInThreeMonth = threeMonthData.filter(
    (item) => item.headache_score === 1
  ).length;

  const painNotGoodCountInThreeMonth = threeMonthData.filter(
    (item) => item.headache_score === 2
  ).length;

  const painCarefulCountInThreeMonth = threeMonthData.filter(
    (item) => item.headache_score === 3
  ).length;

  //end

  //count no pain in six month
  const findMonthsInSixMonthData = sixMonthData.reduce((prev, curr) => {
    const date = new Date(curr.headache_score_date);
    const month = date.getMonth();
    const year = date.getFullYear();
    const monthAndYear = `${month + 1}-${year}`;
    if (!prev.includes(monthAndYear)) {
      prev.push(monthAndYear);
    }
    return prev;
  }, []);

  const totalDaysInSixMonth = findMonthsInSixMonthData.reduce((prev, curr) => {
    const month = parseInt(curr.split("-")[0]);
    const year = parseInt(curr.split("-")[1]);
    const daysInMonth = daysInMonthCounter(month, year);
    prev += daysInMonth;
    return prev;
  }, 0);

  const painNoCountInSixMonth = totalDaysInSixMonth - sixMonthData.length;

  const painMiddleCountInSixMonth = sixMonthData.filter(
    (item) => item.headache_score === 1
  ).length;

  const painNotGoodCountInSixMonth = sixMonthData.filter(
    (item) => item.headache_score === 2
  ).length;

  const painCarefulCountInSixMonth = sixMonthData.filter(
    (item) => item.headache_score === 3
  ).length;

  //end

  const handleDisplayHeadache = (period) => {
    switch (period) {
      case 1:
        return oneMonthData.length;

      case 3:
        return threeMonthData.length;

      case 6:
        return sixMonthData.length;

      default:
        break;
    }
  };

  const handleDisplayMonths = (period) => {
    switch (period) {
      case 1:
        return monthAndYear(period);

      case 3:
        return monthAndYear(period);

      case 6:
        return monthAndYear(period);

      default:
        break;
    }
  };

  const handleDisplayPainNo = (period) => {
    switch (period) {
      case 1:
        return painNoCount;

      case 3:
        return painNoCountInThreeMonth;

      case 6:
        return painNoCountInSixMonth;

      default:
        break;
    }
  };

  const handleDisplayPainMiddle = (period) => {
    switch (period) {
      case 1:
        return painMiddleCount;

      case 3:
        return painMiddleCountInThreeMonth;

      case 6:
        return painMiddleCountInSixMonth;

      default:
        break;
    }
  };

  const handleDisplayPainNotGood = (period) => {
    switch (period) {
      case 1:
        return painNotGoodCount;

      case 3:
        return painNotGoodCountInThreeMonth;

      case 6:
        return painNotGoodCountInSixMonth;

      default:
        break;
    }
  };

  const handleDisplayPainCareful = (period) => {
    switch (period) {
      case 1:
        return painCarefulCount;

      case 3:
        return painCarefulCountInThreeMonth;

      case 6:
        return painCarefulCountInSixMonth;

      default:
        break;
    }
  };

  const chartRenderer = () => {
    switch (period) {
      case 1:
        return (
          <OneMonthChart
            data={oneMonthData}
            lastDayInMonth={lastDayInOneMonth}
          />
        );

      case 3:
        return <ThreeMonthChart data={threeMonthData} />;

      case 6:
        return <SixMonthChart data={sixMonthData} />;

      default:
        break;
    }
  };

  return (
    <div className="flex justify-center mt-[25px]">
      <div className="flex flex-col w-[500px] rounded-lg shadow-md  lg:max-w-xl">
        <div className="flex flex-row justify-between mt-[25px] ml-[16px]">
          <div className="w-auto h-[44px]">
            <p className={`font-weight700`}>
              ปวดไมเกรน {handleDisplayHeadache(period)} วัน
            </p>
            <p className={`font-weight400`}>{handleDisplayMonths(period)}</p>
          </div>
          <div className="flex flex-row w-[166px] justify-end ml-[13px] h-[49px]">
            <div className="flex flex-col items-center mr-[18px]">
              <img src={painNo} alt="painNo" className="w-full h-full" />
              <p className="flex justify-center w-[28px] h-[16px] text-subPrimary font-bold">
                {handleDisplayPainNo(period)}
              </p>
            </div>
            <div className="flex flex-col items-center mr-[18px]">
              <img
                src={painMiddle}
                alt="painMiddle"
                className="w-full h-full"
              />
              <p className="flex justify-center w-[28px] h-[16px] text-infoBlue font-bold">
                {handleDisplayPainMiddle(period)}
              </p>
            </div>
            <div className="flex flex-col items-center mr-[18px]">
              <img
                src={painNotGood}
                alt="painNotGood"
                className="w-full h-full"
              />
              <p className="flex justify-center w-[28px] h-[16px] text-infoYellow font-bold">
                {handleDisplayPainNotGood(period)}
              </p>
            </div>
            <div className="flex flex-col items-center mr-[18px]">
              <img
                src={painCareful}
                alt="painCareful"
                className="w-full h-full"
              />
              <p className="flex justify-center w-[28px] h-[16px] text-infoOrange font-bold">
                {handleDisplayPainCareful(period)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mx-4">
          {chartRenderer()}
          <div className="mt-[16px] mb-[22px]">
            <button
              className={`w-[103px] h-[32px] rounded-[4px] border mr-[16px] hover:bg-lightGreenButton ${
                period === 1 ? "bg-greenButton" : "bg-white"
              }`}
              onClick={() => setPeriod(1)}
            >
              <p
                className={`font-weight700 ${
                  period === 1 ? "text-white" : "text-secondary"
                }`}
              >
                1 เดือน
              </p>
            </button>
            <button
              className={`w-[103px] h-[32px] rounded-[4px] border mr-[16px] hover:bg-lightGreenButton ${
                period === 3 ? "bg-greenButton" : "bg-white"
              }`}
              onClick={() => setPeriod(3)}
            >
              <p
                className={`font-weight700 ${
                  period === 3 ? "text-white" : "text-secondary"
                }`}
              >
                3 เดือน
              </p>
            </button>
            <button
              className={`w-[103px] h-[32px] rounded-[4px] border mr-[16px] hover:bg-lightGreenButton ${
                period === 6 ? "bg-greenButton" : "bg-white"
              }`}
              onClick={() => setPeriod(6)}
            >
              <p
                className={`font-weight700 ${
                  period === 6 ? "text-white" : "text-secondary"
                }`}
              >
                6 เดือน
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartMainLayout;

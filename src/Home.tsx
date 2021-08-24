import React, { useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Redirect } from "react-router";
import {
  useGetChartData1,
  useGetChartData2,
  useGetChartData3,
  useGetStartAndEndDate,
} from "./hooks";

const BarChart = React.memo(
  ({
    data,
    xName,
    yNames,
  }: {
    data: { [key: string]: string | number }[];
    xName: string;
    yNames: string[];
  }) => {
    const chartData = {
      labels: data.map((ele) => ele[xName]),
      datasets: yNames.map((yName) => ({
        label: yName,
        data: data.map((ele) => ele[yName]),
        backgroundColor: data.map(
          (_) =>
            `rgba(
            ${Math.floor(Math.random() * 255)},
            ${Math.floor(Math.random() * 255)},
            ${Math.floor(Math.random() * 255)},
            1
          )`
        ),
        borderColor: data.map(
          (_) =>
            `rgba(
          ${Math.floor(Math.random() * 255)},
          ${Math.floor(Math.random() * 255)},
          ${Math.floor(Math.random() * 255)},
          1
        )`
        ),
        borderWidth: 1,
      })),
    };
    console.log(chartData);
    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
    return (
      <div>
        <Bar data={chartData} options={options} />
      </div>
    );
  }
);

const NullData = ({ loading }: { loading: boolean }) => {
  if (loading) {
    return <div>Loading....</div>;
  }
  return (
    <div
      style={{
        height: "500px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      No Data Available
    </div>
  );
};

function Home() {
  const { endDate, startDate, setEndDate, setStartDate } =
    useGetStartAndEndDate();
  const { loading: cahrt1Loading, data: chart1Data } = useGetChartData1({
    endDate,
    startDate,
  });
  const { loading: chart2Loading, data: chart2Data } = useGetChartData2({
    endDate,
    startDate,
  });
  const { loading: chart3Loading, data: chart3Data } = useGetChartData3({
    endDate,
    startDate,
  });
  const chart1YNames = useRef(["impressions_offered"]);
  const chart2YNames = useRef(["impressions_offered"]);
  const chart3YNames = useRef(["CM001", "CM001_percent"]);
  const [logout, setLogout] = useState(false);
  if (!startDate || !endDate) {
    return <NullData loading={true} />;
  }
  if (logout) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <label htmlFor="start-date" style={{ marginRight: "10px" }}>
            Start Date
            <input
              type="date"
              name="startDate"
              id="start-date"
              onChange={(e) =>
                e.target.value &&
                setStartDate(new Date(e.target.value).getTime() + "")
              }
            />
          </label>
          <label htmlFor="end-date">
            End Date
            <input
              type="date"
              name="endDate"
              id="end-date"
              onChange={(e) =>
                e.target.value &&
                setEndDate(new Date(e.target.value).getTime() + "")
              }
            />
          </label>
        </div>
        <div>
          <button
            onClick={() => {
              localStorage.clear();
              setLogout(true);
            }}
          >
            Logout
          </button>
        </div>
      </div>
      {!cahrt1Loading && chart1Data?.result?.data ? (
        <BarChart
          data={chart1Data.result.data}
          xName="publisherId"
          yNames={chart1YNames.current}
        />
      ) : (
        <NullData loading={cahrt1Loading} />
      )}
      {!chart2Loading && chart2Data?.result?.data ? (
        <BarChart
          data={chart2Data?.result?.data}
          xName="appSiteId"
          yNames={chart2YNames.current}
        />
      ) : (
        <NullData loading={chart2Loading} />
      )}
      {!chart3Loading && chart3Data?.result?.data ? (
        <BarChart
          data={chart3Data?.result?.data}
          xName="advertiserId"
          yNames={chart3YNames.current}
        />
      ) : (
        <NullData loading={chart3Loading} />
      )}
    </div>
  );
}

export default Home;

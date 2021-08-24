import { useEffect, useState } from "react";

const useGetChartData1 = ({
  startDate,
  endDate,
}: {
  startDate?: string;
  endDate?: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] =
    useState<
      | {
          result: {
            data: { publisherId: string; impressions_offered: number }[];
          };
        }
      | undefined
    >();
  useEffect(() => {
    if (!startDate || !endDate) {
      return;
    }
    setLoading(true);
    fetch("https://sigviewauth.sigmoid.io/api/v1/getData", {
      method: "POST",
      body: JSON.stringify({
        _id: "dashboard1516252439345",
        emailId: "candidate@sigmoid.com",
        orgViewReq: { organization: "DemoTest", view: "Auction" },
        chartObject: {
          metadata: {
            title: "chartobject:1516252439345",
            img_thumbnail: "../img/chart.png",
            chartType: "table",
            dataLimit: 50,
          },
          requestParam: {
            granularity: "hour",
            timeZone: { name: "UTC (+00:00)", location: "UTC" },
            dateRange: { startDate, endDate },
            xAxis: ["D044"],
            yAxis: ["M002"],
            approxCountDistinct: [],
            specialCalculation: [],
            filter: [],
            orderBy: { metricOrdByList: [{ id: "M002", desc: true }] },
            percentCalList: [],
          },
        },
      }),
      headers: new Headers({
        "X-AUTH-TOKEN": localStorage.getItem("token") || "",
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((e) => setError(e))
      .finally(() => {
        setLoading(false);
      });
  }, [startDate, endDate]);
  return { loading, data, error };
};
const useGetChartData2 = ({
  startDate,
  endDate,
}: {
  startDate?: string;
  endDate?: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] =
    useState<
      | {
          result: {
            data: { appSiteId: string; impressions_offered: number }[];
          };
        }
      | undefined
    >();
  useEffect(() => {
    if (!startDate || !endDate) {
      return;
    }
    setLoading(true);
    fetch("https://sigviewauth.sigmoid.io/api/v1/getData", {
      method: "POST",
      body: JSON.stringify({
        _id: "dashboard1516252235693",
        emailId: "candidate@sigmoid.com",
        orgViewReq: { organization: "DemoTest", view: "Auction" },
        chartObject: {
          metadata: {
            title: "chartobject:1516252235693",
            img_thumbnail: "../img/chart.png",
            chartType: "bar",
            dataLimit: 50,
          },
          requestParam: {
            granularity: "hour",
            timeZone: { name: "UTC (+00:00)", location: "UTC" },
            dateRange: { startDate, endDate },
            xAxis: ["D017"],
            yAxis: ["M002"],
            approxCountDistinct: [],
            specialCalculation: [],
            filter: [],
            orderBy: { metricOrdByList: [{ id: "M002", desc: true }] },
            percentCalList: [],
          },
        },
      }),
      headers: new Headers({
        "X-AUTH-TOKEN": localStorage.getItem("token") || "",
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((e) => setError(e))
      .finally(() => {
        setLoading(false);
      });
  }, [startDate, endDate]);
  return { loading, data, error };
};
const useGetChartData3 = ({
  startDate,
  endDate,
}: {
  startDate?: string;
  endDate?: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] =
    useState<
      | {
          result: {
            data: {
              advertiserId: string;
              CM001: number;
              CM001_percent: number;
            }[];
          };
        }
      | undefined
    >();
  useEffect(() => {
    if (!startDate || !endDate) {
      return;
    }
    setLoading(true);
    fetch("https://sigview.sigmoid.io/api/v1/getData", {
      method: "POST",
      body: JSON.stringify({
        _id: "Datastory_ChartId_1535224664111",
        emailId: "candidate@sigmoid.com",
        orgViewReq: { organization: "DemoTest", view: "Auction" },
        chartObject: {
          metadata: {
            title: "",
            img_thumbnail: "images/pie.png",
            chartType: "pie",
            dataLimit: 500,
          },
          text: [],
          requestParam: {
            granularity: "hour",
            timeZone: { name: "UTC (+00:00)", location: "UTC" },
            dateRange: { startDate, endDate },
            xAxis: ["D005"],
            yAxis: [],
            approxCountDistinct: [],
            specialCalculation: ["CM001"],
            filter: [],
            orderBy: { customMetricOrdByList: [{ id: "CM001", desc: true }] },
            percentCalList: [{ id: "CM001" }],
          },
        },
      }),
      headers: new Headers({
        "X-AUTH-TOKEN": localStorage.getItem("token") || "",
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((e) => setError(e))
      .finally(() => {
        setLoading(false);
      });
  }, [startDate, endDate]);
  return { loading, data, error };
};

const useGetStartAndEndDate = () => {
  const [startDate, setStartDate] = useState<string | undefined>();
  const [endDate, setEndDate] = useState<string | undefined>();
  useEffect(() => {
    fetch("https://sigviewauth.sigmoid.io/api/v1/getDateRange", {
      body: JSON.stringify({
        organization: "DemoTest",
        view: "Auction",
      }),
      headers: new Headers({
        "X-AUTH-TOKEN": localStorage.getItem("token") || "",
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setStartDate(data.result.startDate);
        setEndDate(data.result.endDate);
      });
  }, []);
  return { startDate, endDate, setStartDate, setEndDate };
};

export {
  useGetChartData1,
  useGetChartData2,
  useGetChartData3,
  useGetStartAndEndDate,
};

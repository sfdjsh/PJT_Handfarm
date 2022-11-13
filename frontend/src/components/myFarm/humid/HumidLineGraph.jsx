import React, {useState, useEffect} from "react";
import { useRecoilState } from "recoil";
import { deviceSensor } from "../../../atom";
import { Line, XAxis, YAxis, Legend, LineChart } from "recharts";

const HumidLineGraph = ({ deviceId }) => {
  const [sensor, setSensor] = useRecoilState(deviceSensor);
  const [timer, setTimer] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    const datas = sensor[deviceId];

    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    setTimer(`${hours}:${minutes}`);

    setData((currentData) => [
      ...currentData,
      {
        name: "Temp",
        humid: datas.humid,
        time: timer,
      },
    ]);
  }, [sensor]);

  return (
    <LineChart width={350} height={300} data={data}
    margin={{left:0, top:20, right:15}}>
      <XAxis dataKey="time" />
      <YAxis />
      <Legend verticalAlign="top" align="right" />
      <Line type="monotone" dataKey="humid" stroke="#8884d8" />
    </LineChart>
  );
};

export default HumidLineGraph;
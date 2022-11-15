import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { deviceSensor } from "../../../atom";
import { BarChart, Bar, LabelList } from "recharts";

const HumidBarGraph = ({ humid }) => {
  const [data, setData] = useState([]);
  const [sensor, setSensor] = useRecoilState(deviceSensor);

  useEffect(() => {
    setData([
      {
        name: "humid",
        humid: humid,
      },
      {}
    ]);
  }, [sensor]);

  return (
    <BarChart
      layout="vertical"
      width={358}
      height={70}
      data={data}
      margin={{
        top: 20,
        left: 10,
      }}
    >
      <Bar
        dataKey="humid"
        barSize={20}
        fill="#2160CA"
      >
        <LabelList datakey="humid" position="right" fill="white" />
      </Bar>
    </BarChart>
  );
};

export default HumidBarGraph;

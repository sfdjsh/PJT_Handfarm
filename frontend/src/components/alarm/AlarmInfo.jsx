import { Typography, Card, Box, Button, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import Alarm from "../../pages/api/Alarm";
import AlarmDelete from "./AlarmDelete";
import { styled } from "@mui/material/styles";
import AlarmRead from "./AlarmRead"
import "./Alarm.css"

const CardContentNoPadding = styled(CardContent)(`
  padding: 16;
  &:last-child {
    padding-bottom: 0;
  }
`);

const AlarmInfo = () => {

  const [alarms, setAlarms] = useState([{}]);
  const [alarmType, setAlarmType] = useState("");
  const [alarmId, setAlarmId] = useState(0)
  const [readAlarmId, setReadAlarmId] = useState(0)

  useEffect(() => {
    async function AlarmList() {
      const data = await Alarm();
      setAlarms(data);
    }
    AlarmList();
  }, []);

  const changeWord = (type) => {
    if (type === "comment") {
      return <span style={{ color: "blue" }}>댓글</span>;
    } else if (type === "reply") {
      return <span style={{ color: "green" }}>답글</span>;
    } else if (type === "like") {
      return <span style={{ color: "red" }}>대댓글</span>;
    }
  };

  return (
    <div>
      {alarms.map((alarm) => {
        return (
          <Card className={alarm.isRead===true? "read-alarm" : "unread-alarm"} 
          sx={{m:2}} key={alarm.idx} 
          onClick={() => {setReadAlarmId(alarm.idx)}}>
            <Box sx={{ background: "#FFD900", p: 1 }} textAlign="center">
              알림 도착
            </Box>
            <CardContentNoPadding>
              {alarm.isRead===true? <span>(읽음)</span> : <></>}
              <Typography variant="h6" sx={{ mt: 1, color: "black" }}>
                {alarm.fromUserNickname}님이 {alarm.articeIdx}번 게시글에{" "}
                {changeWord(alarm.noticeType)}을 남겼습니다.
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "end", mb:1}}>
                <Button onClick={() => {setAlarmId(alarm.idx)}
              }>삭제</Button>
                {/* <Button onClick={() => {<AlarmDelete alarmId={alarm.idx}/>}}>삭제</Button> */}
              </Box>
            </CardContentNoPadding>
          </Card>
        );
      })}
      <AlarmDelete alarmId={alarmId} />
      <AlarmRead readId={readAlarmId}/>
    </div>
  );
};

export default AlarmInfo;

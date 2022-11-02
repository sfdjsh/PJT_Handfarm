import { Typography, Card, Box, Button, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import Alarm from "../../pages/api/Alarm";
import AlarmDelete from "./AlarmDelete";
import { styled } from "@mui/material/styles";
import AlarmRead from "./AlarmRead";
import "./Alarm.css";

const CardContentNoPadding = styled(CardContent)(`
  padding: 16;
  &:last-child {
    padding-bottom: 0;
  }
`);

const AlarmInfo = () => {
  const [alarms, setAlarms] = useState([{}]);
  const [alarmId, setAlarmId] = useState(0);
  const [readAlarmId, setReadAlarmId] = useState(0);
  const [noAlarm, setNoAlarm] = useState(false)

  useEffect(() => {
    async function AlarmList() {
      const data = await Alarm();
      setAlarms(data);
    }
    AlarmList();
  }, []);

  const changeWord = (type) => {
    if (type === "comment") {
      return <span>댓글</span>;
    } else if (type === "reply") {
      return <span>답글</span>;
    } else if (type === "like") {
      return <span>좋아요</span>;
    }
  };

  const test = () => {
    alarms.map((alarm) => {
      if (alarm.idx === undefined) {
        console.log('아니 여기는 찍히자나')
        return <p>???</p>
      };
      return (
        <div key={alarm.idx}>
          <Card
            sx={{ m: 2 }}
            onClick={() => {
              setReadAlarmId(alarm.idx);
            }}
            className={alarm.isRead===true? "read-alarm": "unread-alarm"}
          >
            <Box sx={{ background: "#FFD900", p: 1 }} textAlign="center">
              알림 도착
            </Box>
            <CardContentNoPadding 
            className={alarm.isRead===true? "read-alarm": "unread-alarm"}
            >
              {alarm.isRead === true ? <span>(읽음) </span> : <></>}
              <Typography variant="h7" sx={{ mt: 1, color: "black" }}>
                {alarm.fromUserNickname}님이 {alarm.userNickname}님의 게시글에{" "}
                {changeWord(alarm.noticeType)}을 남겼습니다.
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Button
                  onClick={() => {
                    setAlarmId(alarm.idx);
                  }}
                >
                  <span style={{color:"#EC6C3D"}}>삭제</span>
                </Button>
              </Box>
            </CardContentNoPadding>
          </Card>
        </div>
      );
    })
  }

  return (
    <>
      {test()}
    </>
  );
};

export default AlarmInfo;


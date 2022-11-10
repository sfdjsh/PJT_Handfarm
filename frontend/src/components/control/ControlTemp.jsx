// import React, {useState, useEffect} from "react";
// import { Card, CardContent, Typography, Box, ButtonGroup, Button, Switch } from "@mui/material"

// const ControlTemp = ({ controlTemp }) => {
//   let autoTemp = controlTemp.auto;
//   let manualTemp = controlTemp.manual;
//   const [tempSwitch, setTempSwitch] = useState(false)
//   const [tempDegree, setTempDegree] = useState(0)

//   useEffect(() => {
//     if (autoTemp === 1) {
//       setTempSwitch(true)
//     } else {
//       setTempSwitch(false)
//     }
//   }, [])

//   // const degreeChange = () => {
//   //   console.log(tempDegree)
//   // }

//   return (
//     <>
//       <Card sx={{ mt: 1, height: 120, backgroundColor: "#1E1E1E" }}>
//         <CardContent>
//           <Typography variant="h7" color="white">
//             온풍기
//           </Typography>
//           <Box display="flex">
//             <Box flexGrow={1} alignItems="center" sx={{p:0}}>
//               <Switch defaultChecked color="warning" 
//               checked={tempSwitch}
//               onChange={(event) => setTempSwitch(event.target.checked)}
//               />
//               {
//               tempSwitch===true? 
//               <span style={{ color: "white", fontSize: "12px" }}>자동</span> :
//               <span style={{ color: "white", fontSize: "12px" }}>수동</span>
//               }
//             </Box>
//             <ButtonGroup
//               sx={{background:'white', borderRadius: '20px'}}
//               display="flex"
//             >
//               <Button onClick={() => {setTempDegree(0)}} variant="subtitle2" sx={{borderRadius: '15px', m:0.5, p:0.5, fontWeight:'bold'}}>OFF</Button>
//               <Button onClick={() => {setTempDegree(1)}} variant="subtitle2" sx={{borderRadius: '15px', m:0.5, p:0.5, fontWeight:'bold'}}>COOL</Button>
//               <Button onClick={() => {setTempDegree(2)}} variant="subtitle2" sx={{borderRadius: '15px', background:'#FFA629', m:0.5, p:0.5, fontWeight:'bold'}}>HOT</Button>
//             </ButtonGroup>
//           </Box>
//           <Typography sx={{ mt: 1 }} fontSize={1} color="#FFA629">
//             * 온도를 높일 수 있습니다.
//           </Typography>
//         </CardContent>
//       </Card>
//     </>
//   );
// };

// export default ControlTemp;

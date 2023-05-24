import { useState } from "react";
import { $user } from "../states/user";
import useGlobal from "../hooks/useGlobal";
import { useNavigate } from "react-router-dom";
import Chart from "./Chart";
import { Text, Box, Flex, Spinner } from "@chakra-ui/react";
import DateInput from "./UI/DateInput";

const Statistics = () => {

  const user = useGlobal($user);
  const navigate = useNavigate();
  const [statistics, setStatistics] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Flex justifyContent={"center"} flexDirection={"column"}>
      <Text fontSize={"2xl"} fontFamily={'Shojumaru'} textAlign="center">Statisztika</Text>
      <DateInput setStatistics={setStatistics} setLoading={setLoading} />
      {loading && <Spinner color={"green"} size="xl" margin="0 auto"/>}
      {statistics && statistics==="No statistics found" && !loading && <Text fontSize={"xl"} textAlign="center">Nincs statisztika az adott időszakban</Text>}
      {statistics && statistics!=="No statistics found" &&
        <Flex width={"100%"} justifyContent={"center"}>
          <Box textAlign={"center"}>
            <p>A megadott időszakban <strong>összesen {statistics.solvedTasks} feladattal </strong> foglalkoztál. Ezek közül összesen <strong>{statistics.correctTasks} </strong> kijavított és <strong>helyes</strong> feladat van.</p>
            <p>A(z) {statistics.team} csoportban a megszerzett pontszámok alapján a(z) <strong>{statistics.pointRankInTeam}. helyen</strong>, a gyakorlással eltöltött idő alapján a(z) <strong>{statistics.practiceRankInTeam}. helyen</strong> állsz.</p>
            <Chart myArray={statistics.points} titleText={"Szerzett pontok"} labelText="napi pontszámok" keyPropertie="point" />
            <Chart myArray={statistics.practiceTime} titleText={"Gyakorlással eltöltött idő"} labelText="napi gyakorlási idő percekben" keyPropertie="time" />
          </Box>
        </Flex>
      }
    </Flex >
  )
};

export default Statistics;
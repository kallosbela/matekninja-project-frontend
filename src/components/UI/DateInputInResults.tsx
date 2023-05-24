import { useState, FC } from "react";
import { Input, Flex, Button, Text } from "@chakra-ui/react";
import { getSolutions } from "../../api/getSolutions";
import { SolutionType } from "../../zod/solution";
import { getMyTasks } from "../../api/getTasks";
import { TaskType } from "../../zod/task";

type Props = {
  setSolutions: (solutions: SolutionType[]) => void;
  setTasks: (tasks: TaskType[]) => void;
  setLoading: (loading: boolean) => void;
};

const DateInputInResults: FC<Props> = ({setSolutions, setTasks, setLoading}) => {

  const maxDate = (new Date()).toISOString().split("T")[0];
  const aWeekBefore = new Date(new Date().getTime()-7*24*3600*1000).toISOString().split("T")[0];
  const [startDate, setStartDate] = useState<string>(aWeekBefore);
  const [endDate, setEndDate] = useState<string>(maxDate);
  

  const downloadSolutionsFromStartToEnd = async () => {
    const start = new Date(startDate).getTime();
    const end = ((new Date(endDate)).getTime()+24*3600*1000+1);
    const mySolutions = await getSolutions(start,end);
    if (!mySolutions) return;
    setSolutions(mySolutions);
    const taskIds = mySolutions.map((solution) => solution.taskId);
    console.log("taskIds", taskIds)
    const myTasks = await getMyTasks(taskIds);
    console.log("myTasks", myTasks)
    if (!myTasks) return;
    setTasks(myTasks);
    setLoading(false)
  };

  const generateStatistics = async () => {
    setLoading(true);
    const start = (new Date(startDate||"")).getTime();
    const end = ((new Date(endDate||"")).getTime()+24*3600*1000+10);
    const response = await getSolutions(start,end);
    if (!response) {
      setSolutions([])
      setLoading(false);
      return;
    }
    setSolutions(response);
    setLoading(false);
  };

  return (
    <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
      <Flex justifyContent={"center"} alignItems={"center"} gap="10px" flexDirection={{base:"column", md:"row"}}>
        <Text fontSize={"xl"}>Eredmények letöltése</Text>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          width={"fit-content"}
          min="2023-04-25"
          max={maxDate}
          required
        />
        <Text fontSize={"xl"}>és</Text>
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          width={"fit-content"}
          min="2023-04-25"
          max={maxDate}
          required
        />
        <Text fontSize={"xl"}>közötti időszakból</Text>
      </Flex>
      <Button alignItems={"center"} justifyContent={"center"} margin={"1rem 0 2rem 0"} onClick={downloadSolutionsFromStartToEnd}
      >
        Kérem az eredményeket!
      </Button>
    </Flex>
  );
};

export default DateInputInResults;
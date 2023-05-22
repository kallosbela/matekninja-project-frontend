import { useEffect, useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks } from "../api/getTasks";
import { $user } from "../states/user";
import { $tasklist, $tasks, setTasks, $taskIndex } from "../states/tasks";
import useGlobal from "../hooks/useGlobal";
import Task from "./UI/Task";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import TaskListHeader from "./UI/TaskListHeader";
import { $solutions } from "../states/solutions";
import { saveSolution } from "../api/saveSolution";
import { $isAssessmentActive } from "../states/isAssesmentActive";
import AlertDialog_MissingSolution from "./UI/AlertDialog_MissingSolution";

const Assessment = () => {

  const tasklist = useGlobal($tasklist);
  const tasks = useGlobal($tasks);
  const taskIndex = useGlobal($taskIndex);
  const solutions = useGlobal($solutions);
  const [missingSolution, setMissingSolution] = useState(true);

  const navigate = useNavigate();


  const saveSolutions = async () => {

    for (const solution of solutions) {
      if (!solution.answer) continue;
      const response = await saveSolution(solution);
      if (!response) {
        console.log("error");
        return;
      }
    }
    $isAssessmentActive.next(false);
    navigate("/results");
  };

  const init = async () => {
    if (!tasklist?._id) return navigate("/");
    const response = await getTasks(tasklist._id);
    if (!response) {
      console.log("error");
      return;
    }
    setTasks(response, tasklist.sequence);
  };

  useEffect(() => {
    init()
  }, [tasklist]);

  useEffect(() => {
    const missingSolution = solutions.filter(solution => solution.answer.length === 0).length > 0;
    setMissingSolution(missingSolution);
  }, [solutions]);

  return (
    <Flex justifyContent={"center"} flexDirection={"column"} alignItems={"center"}>
      <TaskListHeader />
      <Flex flexDirection={"column"} gap={"10px"}>
        {taskIndex > 0 && <Heading fontSize="2xl" fontWeight="bold" textAlign={"center"}>Feladatok</Heading>}
        {tasks && taskIndex > 0 && <Task task={tasks[taskIndex - 1]} taskListId={tasklist?._id} />}
      </Flex>
      {taskIndex > 0 && <Flex justifyContent="center" gap="10px" mb={taskIndex===tasks.length ? "0" : "10rem"}>
        <Button onClick={() => { if (taskIndex > 1) return $taskIndex.next($taskIndex.getValue() - 1) }}>Előző feladat</Button>
        {taskIndex < tasks.length && <Button onClick={() => { if (taskIndex < tasks.length) return $taskIndex.next($taskIndex.getValue() + 1) }}>Következő feladat</Button>}
        {taskIndex === tasks.length && <AlertDialog_MissingSolution/>}
      </Flex>}
    </Flex>
  )
};

export default Assessment;
import { useState, useEffect, FC } from "react";
import { TaskType } from "../../zod/task";
import MathComponent from "../MathComponent";
import { $user } from "../../states/user";
import { $taskIndex, $tasks } from "../../states/tasks";
import useGlobal from "../../hooks/useGlobal";
import { $solutions } from "../../states/solutions";
import { Button, Flex, Text, Input, Image, Box } from "@chakra-ui/react";

type Props = {
  taskListId?: string;
  task: TaskType;
};

const Task: FC<Props> = ({ taskListId, task }) => {

  const user = useGlobal($user);
  const taskIndex = useGlobal($taskIndex);
  const solutions = useGlobal($solutions);

  const [time, setTime] = useState<number>(0);
  const [solution, setSolution] = useState<string>("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (taskIndex === 0 || !solutions[taskIndex - 1].answer) setSolution("")
    else setSolution(solutions[taskIndex - 1].answer);
    setTime(0);
  }, [taskIndex]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSolution(e.target.value);
  };

  const checkAnswer = (answer: string, correctAnswers: string[]): boolean => {
    for (const correctAnswer of correctAnswers) {
      if (answer === correctAnswer) return true;
    }
    return false;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const now = new Date();
    solutions[taskIndex - 1].duringTime += time;
    solutions[taskIndex - 1].answer = solution;
    solutions[taskIndex - 1].date = now.getTime();
    if (checkAnswer(solutions[taskIndex - 1].answer, task.answer)) {
      solutions[taskIndex - 1].correct = true;
      solutions[taskIndex - 1].points = task.score;
      solutions[taskIndex - 1].checked = true;
    }
    else if (!!task.answer) {
      solutions[taskIndex - 1].correct = false;
      solutions[taskIndex - 1].points = 0;
      solutions[taskIndex - 1].checked = true;
    }
    $solutions.next(solutions);
    if (taskIndex !== $tasks.getValue().length) {
      $taskIndex.next(taskIndex + 1);
    }
  };

  return (
    <Box margin={{ base: "0 1rem", md: "0 8rem" }} p={"1rem"}>
      {task && (<>
        <Text fontSize={"xl"} textAlign={"center"}><b>{taskIndex}. feladat</b></Text>
        <Text fontSize={"xl"} mb={"1rem"} textAlign={"center"}>({task.name})</Text>
        <MathComponent text={task.text} />
      </>)
      }
      {task && task.illustration.length > 0 && <Image src={task.illustration[0]} alt="task" maxWidth={"100%"} w="50%" />}
      {task && (<Flex flexDirection={"column"} gap="10px" mb="10px" >
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={solution}
            onChange={handleChange}
            placeholder="Add meg a megoldást"
            autoFocus={true}
            margin={"0.5rem 0"}
          />
          <Button onClick={handleSubmit} >Eredmény mentése</Button>
      </form>
      </Flex>)
}
    </Box >
  )
};

export default Task;
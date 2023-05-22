import { useState, useEffect } from "react";
import { $user } from "../states/user";
import useGlobal from "../hooks/useGlobal";
import { useNavigate } from "react-router-dom";
import { Text, Accordion, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel, Image, Tooltip, Spinner, Flex } from '@chakra-ui/react'
import { SolutionType } from "../zod/solution";
import { getSolutions } from "../api/getSolutions";
import { getMyTasks } from "../api/getTasks";
import { TaskType } from "../zod/task";
import MathComponent from "./MathComponent";

const Results = () => {

  const user = useGlobal($user);
  const navigate = useNavigate();
  const [solutions, setSolutions] = useState<SolutionType[]>([]);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      if (!user) return;
      const mySolutions = await getSolutions();
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
    init();
  }, [user]);

  const checkLastSolution = (taskId: string) => {
    const lastSolution = solutions.filter((solution) => solution.taskId === taskId).sort((a, b) => b.date - a.date)[0];
    if (!lastSolution) return false;
    return lastSolution.correct;
  };

  return (
    <div>
      <Tooltip label="A zölddel keretezett feladatoknak az utolsó megoldása helyes, a pirosaknak rossz.">
        <Text fontSize={"2xl"} textAlign={"center"} fontFamily={'Shojumaru'}>Eredményeim</Text>
      </Tooltip>
      {loading && <Flex justifyContent={"center"}><Spinner color={"green"} size="xl"/></Flex>}
      {tasks.length === 0 && !loading && <Text fontSize={"xl"} textAlign={"center"}>(Nincs még elmentett eredményed...)</Text>}
      <ul>
        <Accordion allowMultiple>
          {tasks.map((task, index) => (
            <AccordionItem key={index} style={{ listStyle: "none" }}>
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left' border={checkLastSolution(task._id!) ? "1px solid green" : "1px solid red"}>
                    <b>Feladat: {task.name}</b>
                    <MathComponent text={task.text} />
                    {task.illustration.length > 0 && <Image src={task.illustration[0]} alt="task" maxWidth={"400px"} />}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} height={"auto"}>
        
                <b>Megoldás: </b>
                <ul>
                  {solutions.filter((solution) => solution.taskId === task._id).map((solution, index) => (
                    <li key={index} style={{ listStyle: "none" }}>
                      <Text borderBottom={"0.5px solid grey"}>
                        <p>{solution.answer}</p>
                        <p>{solution.correct ? "Helyes" : (solution.checked ? "Helytelen" : "Nincs ellenőrizve")}</p>
                        <p>{new Date(solution.date).toISOString().split("T")[0]}</p>
                      </Text>

                    </li>
                  ))}
                </ul>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </ul>
    </div>
  )
};

export default Results;
import { useState, useEffect } from "react";
import { $user } from "../states/user";
import useGlobal from "../hooks/useGlobal";
import { getTaskLists } from "../api/getTaskLists";
import { TaskListType } from "../zod/task";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, Text, Button, Flex, Box, Spinner } from '@chakra-ui/react'
import { resetTaskIndex, setTaskList } from "../states/tasks";
import getUserIP from "../api/getUserIP";

const TaskLists = () => {

  const user = useGlobal($user);
  const navigate = useNavigate();
  const [taskLists, setTaskLists] = useState<TaskListType[]>([]);
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      if (!user) return;
      const taskLists = await getTaskLists(user);
      if (!taskLists) return;
      setTaskLists(taskLists);
      setLoading(false)
    };
    init();
  }, [user]);

  useEffect(() => {getUserIP()}, []);

  return (
    <div>
      <Flex justifyContent={"center"} flexDirection={"column"} alignItems={"center"}>
        <Text fontSize={{base:"2xl",md:"3xl"}} p={{base:"1rem",md:"0"}}>Elérhető feladatsorok a(z) <strong>{user?.team}</strong> csoport számára</Text><br />
        {loading && <Spinner color={"green"} size="xl"/>}
        {taskLists.length === 0 && !loading && <h2>Nincs elérhető feladatsor</h2>}

        <ul>
          {taskLists.map((taskList, index) => (
            <li key={index} style={{ listStyle: "none" }}>
              <Card>
                <CardBody >
                  <Text background={"blue.50"} border={"1px solid blue"} borderRadius={"10px"} padding="10px" >
                    <b>Név: {taskList.name}</b>
                    <br />
                    <b>A feladatsor megoldható {taskList.startTime.split("T")[0]} és {taskList.deadline.split("T")[0]} között</b>
                  </Text>
                  <Button colorScheme="teal" variant="outline" onClick={() => {
                    resetTaskIndex()
                    setTaskList(taskList)
                    navigate(`/assessment/?tasklist=${taskList._id}`)
                  }}>Megoldás elkezdése</Button>
                </CardBody>
              </Card>
            </li>
          ))}
        </ul>
        
        <Box height="10rem"></Box>
      </Flex>
    </div>
  )
};

export default TaskLists;

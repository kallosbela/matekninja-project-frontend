import { $tasklist, $taskIndex, $tasks } from "../../states/tasks";
import useGlobal from "../../hooks/useGlobal";
import { Button, Box } from "@chakra-ui/react";
import { FC, useState } from "react";
import { initialSolutions, $solutions } from "../../states/solutions";
import { $user } from "../../states/user";
import { $isAssessmentActive } from "../../states/isAssesmentActive";

const TaskListHeader: FC = () => {
  const user = useGlobal($user);
  const tasklist = useGlobal($tasklist);
  const tasks = useGlobal($tasks);
  const [visible, setVisible] = useState<boolean>(true);

  return (<Box p={"1rem"}>
    {visible && <div>
      <h1>Feladatsor neve: <b>{tasklist?.name}</b> </h1>
      <h2>Csoport neve: <b>{tasklist?.team}</b> </h2>
      <h2>A feladatsor megoldható {tasklist?.startTime.split("T")[0]} és {tasklist?.deadline.split("T")[0]} között</h2>
      <h2>A feladatsorban {tasklist?.tasks.length} feladat van</h2>
      <Button onClick={() => {
        if (!user || !tasklist || !tasks) return
        initialSolutions(user, tasks, tasklist)
        $taskIndex.next(1)
        setVisible(false)
        $isAssessmentActive.next(true)
        }}>Megoldás elkezdése</Button>
    </div>}
  </Box>
  )
}

export default TaskListHeader;
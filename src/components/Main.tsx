import useGlobal from "../hooks/useGlobal";
import { $user } from "../states/user";
import { Routes, Route, useNavigate } from 'react-router-dom';
import StudentProfile from "./StudentProfile";
import TaskLists from "./TaskLists";
import Assessment from "./Assessment";
import Callback from './Callback';
import { Protected } from "./Protected"
import Results from "./Results";
import Statistics from "./Statistics";
import LandingPage from "./LandingPage";
import { Box } from "@chakra-ui/react";

const Main = () => {
  const user = useGlobal($user);
  const navigate = useNavigate();

  return (
    <Box marginBottom="5rem" marginTop={{base: "2rem", md: "8rem"}}>
      <Routes>
        <Route path="/studentprofile" element={<Protected hasAccess={!!user}>
          <StudentProfile />
        </Protected>} />
        <Route path="/tasklists" element={<Protected hasAccess={!!user}>
          <TaskLists />
        </Protected>} />
        <Route path="/assessment" element={<Protected hasAccess={!!user}>
          <Assessment />
        </Protected>} />
        <Route path="/results" element={<Protected hasAccess={!!user}>
          <Results />
        </Protected>} />
        <Route path="/statistics" element={<Protected hasAccess={!!user}>
          <Statistics />
        </Protected>} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/" element={<LandingPage/>} />
        <Route path="/*" element={<div>404 Hiba</div>} />
      </Routes>
    </Box>
  );
};

export default Main;
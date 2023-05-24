import { FC, useEffect } from 'react';
import { login } from '../states/user';
import { useNavigate } from 'react-router-dom';
import { Flex, Spinner } from '@chakra-ui/react';

const Callback: FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const code = urlSearchParams.get('code');
    if (code) {
      login(code, {
        onSuccess: () => navigate("/studentprofile"),
        onError: () => navigate("/"),
      });
    }
  }, []);
  return <Flex justifyContent={"center"} alignItems={"center"}>
    <Spinner color={"green"} size="xl" margin="0 auto" />  
  </Flex>;
};

export default Callback;


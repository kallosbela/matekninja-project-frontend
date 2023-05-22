import { FC, useEffect } from 'react';
import { login } from '../states/user';
import { useNavigate } from 'react-router-dom';

const Callback: FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const code = urlSearchParams.get('code');
    console.log('code: ', code);
    if (code) {
      login(code, {
        onSuccess: () => navigate("/studentprofile"),
        onError: () => navigate("/"),
      });
    }
  }, []);
  return <div>Logging in...</div>;
};

export default Callback;


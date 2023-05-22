import { FC, useEffect, useState } from 'react';
import useGlobal from '../hooks/useGlobal';
import { $user } from '../states/user';
import { Box, Text } from '@chakra-ui/react';
import { $isAssessmentActive } from '../states/isAssesmentActive';
import formatTime from '../api/formatTime';

const Footer: FC = () => {
  const user = useGlobal($user);
  const isAssessmentActive = useGlobal($isAssessmentActive);
  const [timer, setTimer] = useState(0)
  const [isHovered, setIsHovered] = useState<boolean>(false)

  useEffect(() => {
    setTimer(0)
  }, [isAssessmentActive])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const onMouseEnter = () => {
    setIsHovered(true)
  }

  const onMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <Box as="footer"  position="fixed" bottom={0} w={"100%"} h="4rem" borderTop={"1px"} backgroundColor={'white'} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
      {isAssessmentActive && <Text fontFamily={'Shojumaru'}> Eltelt idő: {formatTime(timer)}</Text>}
    </Box>
  );
}

export default Footer;
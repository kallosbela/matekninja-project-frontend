import { AlertDialogOverlay, Button, useDisclosure, AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useToast } from '@chakra-ui/react';
import { useRef, FC } from 'react';
import { $solutions } from '../../states/solutions';
import { saveSolution } from '../../api/saveSolution';
import { $isAssessmentActive } from '../../states/isAssesmentActive';
import { useNavigate } from 'react-router-dom';
import { $user } from '../../states/user';
import useGlobal from '../../hooks/useGlobal';

const AlertDialog_MissingSolution: FC= () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const user = useGlobal($user);
  const solutions = useGlobal($solutions);
 
  const navigate = useNavigate();
  const toast = useToast();

  const saveSolutions = async () => {

    for (const solution of solutions) {
      if (!solution.answer) continue;
      const response = await saveSolution(solution);
      if (!response) {
        console.log("error");
        return;
      }
    }
    const totalTime = solutions.reduce((acc, solution) => acc + solution.duringTime, 0);
    const minute = Math.floor(totalTime / 60);
    const second = totalTime % 60;
    toast({
      title: "Megoldások mentése",
      description: `A megoldásaidat sikeresen elmentettük. Összesen ${minute} percet és ${second} másodpercet töltöttél a feladatok megoldásával.`,
      status: "info",
      duration: 15000,
      isClosable: true,
      position: "top",
    });
    $isAssessmentActive.next(false);
    navigate("/results");
  };

  return (
    <>
      <Button colorScheme='blue' onClick={onOpen}>
      Megoldás befejezése
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Befejezés
            </AlertDialogHeader>

            <AlertDialogBody>
              A megoldás befejezése és leadása.
              {solutions.filter(solution => solution.answer.length === 0).length > 0 && <p>Figyelem! Vannak még megoldatlan vagy el nem mentett feladatok!</p>}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme='green' ref={cancelRef} onClick={onClose}>
                Visszavonás
              </Button>
              <Button colorScheme='blue' onClick={saveSolutions} ml={3}>
                Megoldás befejezése és leadása
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default AlertDialog_MissingSolution;
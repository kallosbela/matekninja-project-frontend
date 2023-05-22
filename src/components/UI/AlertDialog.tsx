import { AlertDialogOverlay, Button, useDisclosure, AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { deleteUser } from '../../api/deleteUser';
import { logout, $user } from '../../states/user';
import useGlobal from '../../hooks/useGlobal';

const AlertDialogComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const user = useGlobal($user);

  const onDeleteProfile = async () => {
    const response = await deleteUser(user);
    logout();
  };

  return (
    <>
      <Button colorScheme='red' onClick={onOpen}>
      Profil törlése
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Profil törlése
            </AlertDialogHeader>

            <AlertDialogBody>
              Biztos vagy benne? Minden adatod végérvényesen törlődik!
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Visszavonás
              </Button>
              <Button colorScheme='red' onClick={onDeleteProfile} ml={3}>
                Törlés
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default AlertDialogComponent;
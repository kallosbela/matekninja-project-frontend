import React, { useState } from "react";
import useGlobal from "../hooks/useGlobal";
import { $user, decodeUser, logout } from "../states/user";
import { Button, Heading, Flex, Avatar, Stack, Image, Box, Input, Text, useToast, useDisclosure, AlertDialog, AlertDialogOverlay } from "@chakra-ui/react";
import { updateUserData } from "../api/updateUserData";
import { deleteUser } from "../api/deleteUser";
import AlertDialogComponent from "./UI/AlertDialog"; //can delete user!!!

type ProfileFormValues = {
  name: string;
  email: string;
  school: string;
  team: string;
}

const StudentProfile: React.FC = () => {
  const user = useGlobal($user);
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState<ProfileFormValues>({
    name: user?.name || "",
    email: user?.email || "",
    school: user?.school || "",
    team: user?.team || "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (!isEditing) {
      toast({
        title: "Profil módosítása",
        description: 'Az email kivételével minden adatodat módosíthatod. A módosításokat a "Profil mentése" gombra kattintva tudod elmenteni.',
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setIsEditing(true);
      return;
    }
    const response = await updateUserData(user, formValues);
    const newUser = decodeUser(localStorage.getItem("token"))
    console.log("Új profiladatok: ", newUser)
    $user.next(newUser);
    setIsEditing(false);
    toast({
      title: "Profil módosítása",
      description: "A módosításokat sikeresen elmentettük.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  const onDeleteProfile = async () => {
    const response = await deleteUser(user);
    console.log("response: ", response);
    await logout();
    console.log("Profil törölve");
  };

  return (
    <Flex justifyContent={"center"}>
      <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"} gap="1rem" >
        <Text fontSize={"2xl"} fontFamily={'Shojumaru'}>{user?.role === "student" ? "Tanulói profil" : "Tanulói profil"}</Text>
        <Avatar src={user?.picture} size='2xl'
          name={user?.name} referrerPolicy="no-referrer" />
        <Stack >
          <div>
            <label htmlFor="name">Név:</label>
            <Input
              name="name"
              type="text"
              value={formValues.name}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <Input
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleChange}
              readOnly={true}
            />
          </div>
          <div>
            <label htmlFor="school">Iskola:</label>
            <Input
              name="school"
              type="text"
              value={formValues.school}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
          <div>
            <Text>Csoport neve:</Text>
            <Input
              name="team"
              type="text"
              value={formValues.team}
              onChange={handleChange}
              readOnly={!isEditing}
              
            />
          </div>
          <Button type="button" onClick={onSubmit}>
            {isEditing ? "Profil mentése" : "Profil módosítása"}
          </Button>
          <AlertDialogComponent />
        </Stack>
      </Flex>
    </Flex>

  );
};

export default StudentProfile;
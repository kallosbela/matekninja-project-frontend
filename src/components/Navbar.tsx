import { Flex, Text, Button, Avatar, Image } from "@chakra-ui/react"
import useGlobal from "../hooks/useGlobal"
import { $user } from "../states/user"
import LoginButton from "./UI/LoginButton"
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { $isAssessmentActive } from "../states/isAssesmentActive"

const Navbar: FC = () => {
  const user = useGlobal($user)
  const name = user?.name
  const navigate = useNavigate()

  const toLanding = () => {
    navigate("/")
  }

  return (
    <Flex p="8" mb="8" borderBottom="1px" borderColor="gray.300" justifyContent={{base: "center", md: "space-between"}} alignItems="center" flexWrap={"wrap"} position={{base: "relative", md: "fixed"}} top="0" w="100%" overflow={"hidden"} backgroundColor={"white"} zIndex={"10"} flexDirection={{base: "column", md: "row"}}>
      <Flex gap="2rem" alignItems={"center"} minWidth={"20%"} flexShrink={"0"} flexDirection={{base: "column", md: "row"}}>
        <Image src="../../images/ninja.png" alt='logo' width="50px" height="50px" onClick={toLanding} cursor={"pointer"} />
        <Text fontSize={"2xl"} fontWeight='bold' objectFit='cover' fontFamily={'Shojumaru'} color={"#309794"} onClick={toLanding} cursor={"pointer"}> MatekNinja </Text>
      </Flex>
      <Flex gap="4" alignItems="center" flexShrink={"0"} flexDirection={{base: "column", md: "row"}}>
        {user && <Text fontFamily={'Shojumaru'}>Üdv, {name}!</Text>}
        {user && <Avatar src={user?.picture} referrerPolicy="no-referrer" size="sm" bg="teal.100"></Avatar>}
        {user && <Button onClick={() => {
          $isAssessmentActive.next(false)
          navigate("/studentprofile")
        }} variant="outline">Profil</Button>}
        {user && <Button onClick={() => {
          $isAssessmentActive.next(false)
          navigate("/tasklists")
        }} variant="outline">Feladatsorok</Button>}
        {user && <Button onClick={() => {
          $isAssessmentActive.next(false)
          navigate("/results")
        }} variant="outline">Eredmények</Button>}
        {user && <Button onClick={() => {
          $isAssessmentActive.next(false)
          navigate("/statistics")
        }} variant="outline">Statisztikák</Button>}
        <LoginButton />
      </Flex>
    </Flex>
  )
}

export default Navbar
import { Heading, Text, Flex, Image, Box } from "@chakra-ui/react"

const LandingPage = () => {
  return (
    <Flex gap={"100px"} m={"3rem"} justifyContent={"center"} alignItems={"stretch"} flexDirection={{base:"column", md:"row"}}>
      <Flex flexDirection={"column"} minWidth={"65%"}>
        <Text fontFamily={'Shojumaru'} textAlign={"center"} margin={"2rem"} fontSize={{base:"2xl", md:"3xl"}}>
          Üdvözlünk a MatekNinja oldalon!
        </Text>
        <Box fontSize={"2xl"} >
          <Text textAlign="justify">Készen állsz arra, hogy matematika mesterévé válj? Merülj el a számok, egyenletek és logika világában a MatekNinjával! Ez az izgalmas tanulási platform vonzó matematikai kihívásokat kínál minden szinten. Nyomon követheted a fejlődésedet, kihívhatod a barátaidat, sőt, csoportokban is versenyezhetsz.</Text>
          <br/>
          <Text style={{textAlign:"justify"}}>Minél többet gyakorolsz, annál erősebbek lesznek a matematikai készségeid. Ne feledd, a matematika minden mestere egyszer kezdő volt, és a MatekNinjával a matematika tanulása kalanddá válik.
          Csatlakozz a MatekNinja közösséghez ma, és hódítsuk meg együtt a matematikát!</Text>
          <br/>
          <Text style={{textAlign:"justify"}}>Jelentkezz be a Google fiókoddal, és kezdődjön a kihívás!</Text>
          <br/>
          <Text style={{textAlign:"justify"}}>További kérdésekkel fordulj az oldal fejlesztőjéhez: Kallós Béla (<a href="mailto:kallosbela@gmail.com">kallosbela@gmail.com</a>)</Text>
        </Box>
      </Flex>
      <Flex flexDirection={"column"} justifyContent={"center"} margin={"2rem"} height={"100%"}>
        <Image src="../../images/david-emrich-VCM99u6HltA-unsplash.jpg" alt="Japanese garden" />
        <Text fontSize={"xs"}>
          Fotó: <a href="https://unsplash.com/@davidemrich?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">David Emrich</a> <a href="https://unsplash.com/s/photos/japan-garden?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">(Unsplash)</a>
        </Text>
      </Flex>
    </Flex>
  )
}

export default LandingPage



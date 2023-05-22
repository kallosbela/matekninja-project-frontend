import { ChakraProvider, extendTheme, withDefaultColorScheme } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import Main from './components/Main'
import Footer from './components/Footer'
import { $isAssessmentActive } from './states/isAssesmentActive'
import useGlobal from './hooks/useGlobal'

const theme = extendTheme(withDefaultColorScheme({ colorScheme: "teal" }))

const App = () => {

  const isAssessmentActive = useGlobal($isAssessmentActive)

  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Main />
      {isAssessmentActive && <Footer />}
    </ChakraProvider>
  )
}

export default App

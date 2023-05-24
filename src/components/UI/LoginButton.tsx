import { Button } from "@chakra-ui/react"
import useGlobal from "../../hooks/useGlobal"
import { $user, logout } from "../../states/user"
// import { googleUrl } from "../../api/googleUrl"

// const googleUrl = "https://accounts.google.com/o/oauth2/v2/auth?client_id=822244209556-ot5dnerigu5skj1o29hj6kpfiu9jo980.apps.googleusercontent.com&redirect_uri=https://coral-app-rbarg.ondigitalocean.app/callback&response_type=code&scope=openid%20profile%20email&prompt=consent"
const googleUrl = "https://accounts.google.com/o/oauth2/v2/auth?client_id=822244209556-ot5dnerigu5skj1o29hj6kpfiu9jo980.apps.googleusercontent.com&redirect_uri=https://matekninja.hu/callback&response_type=code&scope=openid%20profile%20email&prompt=consent"

const LoginButton = () => {
  const user = useGlobal($user)

  return (
    <div>
    { user 
      ? <Button onClick={logout}>Kilépés</Button>
      : (<>
          <Button as="a" href={googleUrl}>Belépés</Button>
        </>)
    }
    </div>
  )
}

export default LoginButton
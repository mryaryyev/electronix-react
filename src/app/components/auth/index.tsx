import { useState } from "react"
import Modal from "@mui/material/Modal"
import Backdrop from "@mui/material/Backdrop"
import Fade from "@mui/material/Fade"
import { Fab, Stack, TextField, Typography } from "@mui/material"
import LoginIcon from "@mui/icons-material/Login"
import { Messages } from "../../../libs/config"
import { LoginInput, MemberInput } from "../../../libs/types/member"
import MemberService from "../../services/MemberService"
import { sweetErrorHandling } from "../../../libs/sweetAlert"
import { useGlobals } from "../../hooks/useGlobals"

interface AuthenticationModalProps {
  signupOpen: boolean
  loginOpen: boolean
  handleSignupClose: () => void
  handleLoginClose: () => void
  setSignupOpen: (isOpen: boolean) => void
  setLoginOpen: (isOpen: boolean) => void
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const {
    signupOpen,
    loginOpen,
    handleSignupClose,
    handleLoginClose,
    setSignupOpen,
    setLoginOpen,
  } = props
  const [memberNick, setMemberNick] = useState<string>("")
  const [memberPhone, setMemberPhone] = useState<string>("")
  const [memberPassword, setMemberPassword] = useState<string>("")
  const { setAuthMember } = useGlobals()

  /** HANDLERS **/

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberNick(e.target.value)
  }
  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberPhone(e.target.value)
  }
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberPassword(e.target.value)
  }
  const handlePasswordKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && signupOpen) {
      handleSignupRequest().then()
    } else if (e.key === "Enter" && loginOpen) {
      handleLoginRequest().then()
    }
  }

  const handleSignupRequest = async () => {
    try {
      const isFulfill =
        memberNick !== "" && memberPhone !== "" && memberPassword !== ""
      if (!isFulfill) throw new Error(Messages.error3)

      const signupInput: MemberInput = {
        memberNick: memberNick,
        memberPhone: memberPhone,
        memberPassword: memberPassword,
      }

      const member = new MemberService()
      const result = await member.signup(signupInput)

      setAuthMember(result)
      handleSignupClose()
    } catch (err) {
      console.log(err)
      handleSignupClose()
      sweetErrorHandling(err).then()
    }
  }

  const handleLoginRequest = async () => {
    try {
      const isFulfill = memberNick !== "" && memberPassword !== ""
      if (!isFulfill) throw new Error(Messages.error3)

      const loginInput: LoginInput = {
        memberNick: memberNick,
        memberPassword: memberPassword,
      }

      const member = new MemberService()
      const result = await member.login(loginInput)

      setAuthMember(result)
      handleLoginClose()
    } catch (err) {
      console.log(err)
      handleLoginClose()
      sweetErrorHandling(err).then()
    }
  }

  const switchToSignup = () => {
    handleLoginClose()
    setSignupOpen(true)
  }

  const switchToLogin = () => {
    handleSignupClose()
    setLoginOpen(true)
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        // slots={{ backdrop: Backdrop }}
        // slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={signupOpen}>
          <Stack
            direction="row"
            sx={{
              width: "800px",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 2,
            }}
          >
            <img
              src="/img/auth.webp"
              alt="signup"
              style={{
                width: "62%",
                height: "100%",
                borderRadius: "10px",
                background: "#000",
                marginTop: "9px",
                marginLeft: "10px",
              }}
            />
            <Stack sx={{ marginLeft: "69px", alignItems: "center" }}>
              <h2>Signup Form</h2>
              <TextField
                sx={{ marginTop: "7px" }}
                id="outlined-basic"
                label="username"
                variant="outlined"
                onChange={handleUsername}
              />
              <TextField
                sx={{ my: "17px" }}
                id="outlined-basic"
                label="phone number"
                variant="outlined"
                onChange={handlePhone}
              />
              <TextField
                id="outlined-basic"
                label="password"
                variant="outlined"
                type="password"
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
              />
              <Fab
                sx={{ marginTop: "30px", width: "120px" }}
                variant="extended"
                color="primary"
                onClick={handleSignupRequest}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Signup
              </Fab>
              <Typography sx={{ mt: 2, fontSize: 13, cursor: "pointer" }}>
                Already have an account?{" "}
                <span
                  style={{ color: "#1976d2", fontWeight: 600 }}
                  onClick={switchToLogin}
                >
                  Login
                </span>
              </Typography>
            </Stack>
          </Stack>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        // slots={{ backdrop: Backdrop }}
        // slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={loginOpen}>
          <Stack
            direction="row"
            sx={{
              width: "700px",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 2,
            }}
          >
            <img
              src="/img/auth.webp"
              alt="login"
              style={{
                width: "62%",
                height: "100%",
                borderRadius: "10px",
                background: "#000",
                marginTop: "9px",
                marginLeft: "10px",
              }}
            />
            <Stack
              sx={{
                marginLeft: "65px",
                marginTop: "25px",
                alignItems: "center",
              }}
            >
              <h2>Login Form</h2>
              <TextField
                id="outlined-basic"
                label="username"
                variant="outlined"
                sx={{ my: "10px" }}
                onChange={handleUsername}
              />
              <TextField
                id="outlined-basic"
                label="password"
                variant="outlined"
                type="password"
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
              />
              <Fab
                sx={{ marginTop: "27px", width: "120px" }}
                variant="extended"
                color="primary"
                onClick={handleLoginRequest}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Login
              </Fab>
              <Typography sx={{ mt: 2, fontSize: 13 }}>
                Don't have an account?{" "}
                <span
                  style={{
                    color: "#1976d2",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  onClick={switchToSignup}
                >
                  Sign up
                </span>
              </Typography>
            </Stack>
          </Stack>
        </Fade>
      </Modal>
    </div>
  )
}

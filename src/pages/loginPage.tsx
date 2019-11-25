import React, { FormEvent, useState } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"

import { Auth } from "aws-amplify"
import { Copyright } from "../components/copyright"
import { useStyles } from "../styles/styles"
import ConfirmaLogin from "../components/confirma-login"
import { Link, RouteProps, useHistory, useLocation } from "react-router-dom"
import { RootState } from "../store/rootReducer"
import { connect } from "react-redux"

interface LoginPageProps {
  currentUser: { status: string }
}

function LoginPage({ currentUser }: LoginPageProps) {
  // todo: redirecionar automaticamente se já estiver logado
  const history = useHistory()
  const location = useLocation()
  if (currentUser.status === "logged-in") {
    const { from } = location.state || { from: { pathname: "/" } }
    history.replace(from)
  }

  const classes = useStyles()
  const [fields, setFields] = useState({
    username: localStorage.getItem(`phone`) || ``, //todo???
    password: ``,
  })
  const [loginStatus, setLoginStatus] = useState(`initial`)
  const [userObj, setUserObj] = useState(null)

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFields({
      ...fields,
      [name]: value,
    })
  }

  function handleSubmission(event: React.FormEvent) {
    event.preventDefault()
    Auth.signIn(fields.username, fields.password)
      .then(user => {
        if (user.challengeName === "SMS_MFA") {
          localStorage.setItem(`phone`, fields.username) //todo this is sooo wrooooong
          setUserObj(user)
          setLoginStatus(`MFA`)
        } else {
          if (currentUser.status === "logged-in") {
            const { from } = location.state || { from: { pathname: "/" } }
            history.replace(from)
          }
        }
      })
      .catch(reason => {
        // todo: tratativa dos erros de login
        console.warn(reason)
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpenOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Acesso
        </Typography>
        {loginStatus === `initial` ? (
          <form className={classes.form} onSubmit={handleSubmission}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Seu telefone"
                  autoFocus
                  value={fields.username}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="current-password"
                  name="password"
                  variant="outlined"
                  required
                  fullWidth
                  id="password"
                  label="Senha"
                  autoFocus
                  type={`password`}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Confirmar
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Link to={`/cadastro`}>
                  Cadastre-se
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Link to={`/recuperar-senha`}>
                  Esqueci minha senha?
                </Link>
              </Grid>
            </Grid>
          </form>
        ) : (
          loginStatus === `MFA` && <ConfirmaLogin userObject={userObj} />
        )}
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default connect((state: RootState) => {
  return ({
    currentUser: state.currentUser,
  })
})(LoginPage)
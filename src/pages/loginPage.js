import React, { useEffect, useState } from "react"
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

export default function LoginPage() {
  const classes = useStyles()
  const [fields, setFields] = useState({
    username: localStorage.getItem(`phone`),
  })
  const [loginStatus, setLoginStatus] = useState(`initial`)
  const [userObj, setUserObj] = useState(null)

  function handleInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    setFields({
      ...fields,
      [name]: value,
    })
  }

  function handleSubmission(event) {
    event.preventDefault()
    console.log(fields.username, fields.password)
    Auth.signIn(fields.username, fields.password)
      .then(user => {
        if (user.challengeName === "SMS_MFA") {
          localStorage.setItem(`phone`, fields.username)
          setUserObj(user)
          setLoginStatus(`MFA`)
        } else {

        }
        Auth.currentUserInfo().then(value => {
          console.log(value)
        })
      })
      .catch(reason => {
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
                  autoComplete="phone"
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Seu telefone"
                  autoFocus
                  type={`phone`}
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Confirmar
            </Button>
          </form>
        ) : (
          loginStatus === `MFA` && <ConfirmaLogin user={userObj} />
        )}
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}

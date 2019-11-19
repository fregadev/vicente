// todo: reescrever no mesmo esquema do confirma-login
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
// import { navigate } from "gatsby"
import { Copyright } from "../components/copyright"
import { useStyles } from "../styles/styles"

export default function ConfirmaCadastro() {
  const classes = useStyles()
  const [fields, setFields] = useState({})
  const [userInfo, setUserInfo] = useState(null)

  Auth.currentAuthenticatedUser().then(value => {
    setUserInfo(value)
    console.log(value)
  })

  useEffect(() => {
    console.log(userInfo)
  })

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
    Auth.confirmSignUp(localStorage.getItem(`phone`), fields.otc)
      .then(value => {
        console.log(value)
        Auth.currentUserInfo().then(value => {
          setUserInfo(value)
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
          Verifique o seu telefone
        </Typography>
        <Typography component="p">
          Nós enviamos um código de verificação para o seu telefone (
          {localStorage.getItem(`phone`)}) por SMS. Para sua segurança, insira
          abaixo o código enviado.
        </Typography>
        <form className={classes.form} onSubmit={handleSubmission}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="one-time-code"
                name="otc"
                variant="outlined"
                required
                fullWidth
                id="otc"
                label="Código de verificação"
                autoFocus
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
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}

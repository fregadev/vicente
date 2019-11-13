import React, { useState } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"

import { Auth } from "aws-amplify"
import { navigate } from "gatsby"
import { Copyright } from "../components/copyright"
import { useStyles } from "../styles/styles"

export default function SignUp() {
  const classes = useStyles()
  const [fields, setFields] = useState({})

  function handleInputChange(event) {
    const target = event.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name

    setFields({
      ...fields,
      [name]: value,
    })
  }

  async function handleSubmission(event) {
    event.preventDefault()
    if (fields.password !== fields["password-confirmation"]) {
      return // todo: alert wrong password
    }
    await Auth.signUp({
      username: fields.phone,
      password: fields.password,
      attributes: {
        phone_number: fields.phone,
        email: fields.email,
        name: fields.name,
      },
    }).then(value => {
      if (value.userConfirmed === false) {
        navigate(`/mfa/`)
      }
    }).catch(reason => {
      if (reason.code === "UsernameExistsException") {
        alert(`Já existe um usuário com o telefone ${fields.phone}.
        Caso este seja seu número, faça o seu login.`) // todo: fazer um alerta bonito
        navigate(`/login/`)
      }
      console.warn(reason)
    })
  }

  return <Container component="main" maxWidth="xs">
    <CssBaseline/>
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon/>
      </Avatar>
      <Typography component="h1" variant="h5">
        Crie a sua conta
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmission}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="name"
              name="name"
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Seu nome"
              autoFocus
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Seu e-mail (opcional)"
              name="email"
              autoComplete="email"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="phone"
              label="Seu telefone"
              type="phone"
              id="phone"
              autoComplete="tel"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              disabled
              defaultValue="Macaé/RJ - Brasil"
              name="council"
              label="Seu conselho"
              id="council"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              disabled
              helperText="No momento o Vicente está em fase de testes e aceita inscrições apenas da conferência da Nossa Senhora da Glória, em Macaé."
              defaultValue="Nossa Senhora da Glória"
              name="conference"
              label="Sua conferência"
              id="conference"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              helperText={`Sua senha deve ter pelo menos 8 caracteres.`}
              autoComplete="new-password"
              name={`password`}
              id={`password`}
              label={`Sua nova senha`}
              type={`password`}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              helperText={`A mesma senha digitada acima.`}
              autoComplete="new-password"
              name={`password-confirmation`}
              id={`password-confirmation`}
              label={`Confirme sua nova senha`}
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
          Cadastrar
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link to="login" variant="body2">
              Já tem uma conta? Entre aqui!
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
    <Box mt={5}>
      <Copyright/>
    </Box>
  </Container>
}

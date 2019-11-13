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
import { navigate } from "gatsby"
import { Copyright } from "./copyright"
import { useStyles } from "../styles/styles"
import Paper from "@material-ui/core/Paper"

export default function ConfirmaLogin(props) {
  const classes = useStyles()
  const [fields, setFields] = useState({})
  const { user } = props

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
    Auth.confirmSignIn(user, fields.otc, `SMS_MFA`)
      .then(value => {
        console.log(value)
        Auth.currentUserInfo().then(value => {
          console.log(value)
        })
      })
      .catch(reason => {
        console.warn(reason)
      })
  }

  return (
    <div className={classes.paper}>
      <Typography component="p">
        Precisamos confirmar sua identidade novamente. Para sua segurança,
        insira abaixo o código enviado para o seu telefone.
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
  )
}

import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { Auth } from "aws-amplify"
import { useStyles } from "../styles/styles"
import { connect } from "react-redux"
import { RootState } from "../store/rootReducer"
import { useHistory, useLocation } from "react-router"

interface ConfirmaLoginProps {
  userObject: any
}

function ConfirmaLogin({ userObject }: ConfirmaLoginProps) {
  const classes = useStyles()
  const [fields, setFields] = useState({
    otc: "",
  })

  const history = useHistory()
  const location = useLocation()

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target
    const value = target.value
    const name = target.name

    setFields({
      ...fields,
      [name]: value,
    })
  }

  function handleSubmission(event: React.FormEvent) {
    event.preventDefault()
    Auth.confirmSignIn(userObject, fields.otc, `SMS_MFA`)
      .then(value => {
        const { from } = location.state || { from: { pathname: "/" } }
        history.replace(from)
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

export default connect((state: RootState) => {
  return ({
    currentUser: state.currentUser,
  })
})(ConfirmaLogin)
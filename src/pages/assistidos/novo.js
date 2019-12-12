import React from "react"
import { Formik, Field, Form, ErrorMessage } from "formik"
import { TextField } from "formik-material-ui"
import { LoggedIn } from "../../components/logged-in"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"

import * as Yup from "yup"

const assistidoSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "O nome da pessoa assistida precisa ter pelo menos 5 caracteres.")
    .required("O nome é obrigatório."),
  phoneNumber: Yup.string(),
  email: Yup.string().email("O endereço de email precisa ser válido."),
})

export default function(props) {
  return (
    <LoggedIn pageName={`Nova candidatura`}>
      <Formik
        initialValues={{
          name: ``,
          phoneNumber: ``,
          email: ``,
          address: ``,
          birthdate: ``,
          comments: ``,
        }}
        validationSchema={assistidoSchema}
      >
        {props => (
          <Form>
            <Grid container spacing={2}>
              <Grid item>
                <Field
                  name={`name`}
                  label={`Nome da pessoa`}
                  component={TextField}
                  fullWidth
                />
                <ErrorMessage name="name" />
              </Grid>
              <Grid item>
                <Field
                  name={`phoneNumber`}
                  label={`Telefone da pessoa`}
                  component={TextField}
                />
                <ErrorMessage name="phoneNumber" />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </LoggedIn>
  )
}

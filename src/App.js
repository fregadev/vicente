import React from "react"
import { withAuthenticator } from "aws-amplify-react/lib-esm/Auth"
import { UsernameAttributes } from "aws-amplify-react/lib-esm/Auth/common/types"
import { I18n } from "@aws-amplify/core"
import authScreenLabels from "./dict"
import logo from "./logo.svg"
import "./App.css"
import Amplify from "@aws-amplify/core"
import awsConfig from "./aws-exports"

Amplify.configure(awsConfig)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}


I18n.setLanguage("pt-BR")

I18n.putVocabularies(authScreenLabels)
export default withAuthenticator(App,
  {
    includeGreetings: true,
    authenticatorComponents: [],
    federated: null,
    theme: null,
    signUpConfig: { defaultCountryCode: 55 },
    usernameAttributes: UsernameAttributes.EMAIL,
  })

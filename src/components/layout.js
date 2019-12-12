/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import * as PropTypes from "prop-types"

import Header from "./header"
import "./layout.css"
import CssBaseline from "@material-ui/core/CssBaseline"

const Layout = ({ children }) => {


  return (
    <>
      <CssBaseline />
      {children}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

import { useStyles } from "../../styles/styles"
import { AppBar, CssBaseline } from "@material-ui/core"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import Typography from "@material-ui/core/Typography"
import React from "react"
import Container from "@material-ui/core/Container"

export const LoggedIn = ({ children, pageName }) => {
  const classes = useStyles()
  return (
    <>
      <CssBaseline />
      <AppBar position={`static`}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {pageName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.root} maxWidth={`sm`}>
        {children}
      </Container>
    </>
  )
}
import React from "react"
import { LoggedIn } from "../components/logged-in"
import { List, ListItem, ListItemAvatar, ListItemText, makeStyles, Zoom } from "@material-ui/core"
import Avatar from "@material-ui/core/Avatar"
import faker from "faker/locale/pt_BR"
import _ from "lodash"
import Fab from "@material-ui/core/Fab"
import AddIcon from "@material-ui/icons/Add"

const useStyles = makeStyles(theme => ({
  fab: { position: `fixed`, right: theme.spacing(2), bottom: theme.spacing(2) },
}))

const AddAssistedPersonButton = () => {
  const classes = useStyles()
  return <Zoom in>
    <Fab className={classes.fab} color={`primary`}>
      <AddIcon />
    </Fab>
  </Zoom>
}



export default function(props) {
  return (
    <LoggedIn pageName={`Assistidos`}>
      <List>
        {[...Array(50).keys()].map(n => {

          return <Zoom in style={{ transitionDelay: `${n * 40}ms` }} key={n}>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={`https://loremflickr.com/50/50/smile?fixed=${n}`} />
              </ListItemAvatar>
              <ListItemText primary={`${faker.name.firstName()} ${faker.name.lastName()}`}
                            secondary={[`assistido`, `candidato`, `promovido`][_.random(0, 2)]} />
            </ListItem>
          </Zoom>
        })}
      </List>
      <AddAssistedPersonButton />
    </LoggedIn>
  )
}

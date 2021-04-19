import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { FixedSizeList } from 'react-window'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: 600,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper
  }
}))

export function CollectionList ({ cards, addCard }) {
  const classes = useStyles()

  function renderRow (props) {
    const { index, style } = props
    const { Name, ['Magicka Cost']: cost } = cards[index]

    return (
      <ListItem
        button
        style={style}
        key={Name}
        onClick={() => addCard(cards[index])}
      >
        <ListItemText primary={Name} secondary={cost} />
      </ListItem>
    )
  }

  return (
    <div className={classes.root}>
      <FixedSizeList
        height={400}
        width={300}
        itemSize={46}
        itemCount={cards.length}
      >
        {renderRow}
      </FixedSizeList>
    </div>
  )
}

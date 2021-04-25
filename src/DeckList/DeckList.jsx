import React from 'react'
import _ from 'lodash'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Divider, List } from '@material-ui/core'
import { useWidth } from '../Utils/useWidthHook'
import './DeckList.css'
import { DeckListCard } from './DeckListCard'

const useStyles = makeStyles(theme => ({
  cardColumns: { display: 'flex' },
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper
  }
}))

function getNumberOfColumns (width) {
  switch (width) {
    case 'xl':
    case 'lg':
      return 5
    case 'md':
      return 4
    case 'sm':
      return 3
    case 'xs':
    default:
      return 2
  }
}

export const DeckList = ({ cardList, handleClickOpen }) => {
  const classes = useStyles()
  const width = useWidth()
  const maxNumColumns = getNumberOfColumns(width)
  const cardsByCount = Object.entries(
    cardList.sort(decklistCardComparator).reduce((acc, next) => {
      if (acc[next.Name]) {
        return {
          ...acc,
          [next.Name]: { ...acc[next.Name], count: acc[next.Name].count + 1 }
        }
      }
      return { ...acc, [next.Name]: { ...next, count: 1 } }
    }, {})
  )
  const numRowsLastColumn = cardsByCount.length % maxNumColumns
  const numRowsPerColumn =
    (cardsByCount.length - numRowsLastColumn) / maxNumColumns
  const columns = _.chunk(cardsByCount, numRowsPerColumn)

  return (
    <div className={clsx('DeckList', classes.cardColumns)}>
      {columns.map((cards, i) => (
        <List className={classes.root} key={`decklist-column-${i}`} dense>
          {cards.map(([cardName, card], index) => (
            <>
              <DeckListCard
                key={cardName}
                card={card}
                handleClickOpen={handleClickOpen}
              />
              {index !== cards.length - 1 ? (
                <Divider variant='middle' component='li' />
              ) : null}
            </>
          ))}
        </List>
      ))}
    </div>
  )
}

function decklistCardComparator(a, b) {
  const costComparison = cardCostComparator(a, b)

  if (costComparison !== 0) {
    return costComparison
  }

  return a.Name.localeCompare(b.Name)
}

export function cardCostComparator(a, b) {
  return parseInt(a['Magicka Cost']) - parseInt(b['Magicka Cost'])
}

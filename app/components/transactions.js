import React from 'react'
import SingleTransaction from './singleTransaction'

export default function Transactions (props) {
  const { coinInfo } = props
  return (
    <div id='transactions-container'>
      <div>
        <h3> Past Transaction History: </h3>
        {coinInfo.txs.map((tx, idx) => {
          return <SingleTransaction key={idx} tx={tx} />
        })}
      </div>
    </div>
  )
}

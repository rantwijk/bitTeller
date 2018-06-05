import React from 'react'
const Timestamp = require('react-timestamp')

export default function SingleTransaction (props) {
  const txInfo = props.tx
  const txUrl = `https://blockchain.info/tx/${txInfo.hash}`
  const txType = txInfo.result >= 0 ? 'recieved' : 'sent'
  return (
    <div className='transaction'>
      <ul>
        <li>
          <p>
            <label>Hash:</label>
            <a href={txUrl} rel='noopener noreferrer' target='_blank'>
              {txInfo.hash}
            </a>
          </p>
          <p>
            <label>Date:</label>
            <Timestamp time={txInfo.time} format='full' includeDay />{' '}
          </p>
          <p className={txType}>
            <label >Satoshi Amount:</label>
            {txInfo.result !== undefined ? txInfo.result : 'unconfirmed'}
          </p>
        </li>
      </ul>
      <br />
    </div>
  )
}

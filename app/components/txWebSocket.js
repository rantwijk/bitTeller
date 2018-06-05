import React, { Component } from 'react'
import SingleTransaction from './singleTransaction'

export default class TxWebSocket extends Component {
  constructor (props) {
    super(props)
    this.state = {
      incoming: []
    }
  }

  componentDidMount () {
    const { coinAddress } = this.props
    const connection = new WebSocket('wss://ws.blockchain.info/inv')
    coinAddress
      ? (connection.onopen = () => {
        connection.send(`{"op":"addr_sub", "addr":${coinAddress}}`)
        connection.send('{"op":"ping_tx"}')
      })
      : null

    console.log(connection)
    connection.onmessage = e => {
      const data = JSON.parse(e.data)
      this.setState({
        incoming: [...this.state.incoming, data.x]
      })
    }
  }

  render () {
    return (
      <div id='incoming-transactions-container'>
        <div>
          <h3> Incoming Transactions: </h3>
          <ul />
        </div>
        {this.state.incoming.map((tx, idx) => {
          return <SingleTransaction key={idx} tx={tx} />
        })}
      </div>
    )
  }
}

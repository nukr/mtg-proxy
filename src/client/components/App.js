import React, { Component } from 'react'
import urls from '../../../public/build/urls.json'

export default class App extends Component {
  render () {
    return (
      <div>
        {urls.map(url => <img className='card' src={url} />)}
      </div>
    )
  }
}

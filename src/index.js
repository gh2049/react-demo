import * as React from './Gooact'
import './index.scss'

class Main extends React.Component {
  constructor () {
    super()
    console.log(React)
  }
  render () {
    return <a>hello react </a>
  }
}

React.render(
  <Main />, document.getElementById('main')
)

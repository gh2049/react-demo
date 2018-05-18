import * as React from './Gooact'
import './index.scss'

class Main extends React.Component {
  constructor () {
    super()

    this.state = { total: 0 }
  }

  onClick = (type) => {
    if (type === 'add')   this.setState({ total: this.state.total + 1})
    if (type === 'minus') this.setState({ total: this.state.total - 1})
  }

  render () {
    const Result = (props) => `the result is: ${props.total}`
    return (
      <div class='center' >
        <Result total={this.state.total} />
        <p>
          <button onClick={this.onClick.bind(null, 'add')}>add</button> &nbsp;
          <button onClick={this.onClick.bind(null, 'minus')}>minus</button>
        </p>
      </div>
    )
  }
}

React.render(
  <Main />, document.getElementById('main')
)

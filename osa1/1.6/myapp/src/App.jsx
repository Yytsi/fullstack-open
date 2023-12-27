import { useState } from 'react'

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value} {props.perc ? "%" : ""}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad } = props;
  return (good + neutral + bad) !== 0 ? (
    <div>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={good + neutral + bad} />
          <StatisticsLine text="average" value={(good - bad) / (good + neutral + bad)} />
          <StatisticsLine text="positive" value={good / (good + neutral + bad) * 100} perc={true} />
        </tbody>
      </table>
    </div>
  ) : (
    <div>
      No feedback given
    </div>
  );
}

const Button = (props) => {
  return (
    <button onClick={props.handler}>
      {props.children}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Button handler={handleGoodClick}>
        good
      </Button>
      <Button handler={handleNeutralClick}>
        neutral
      </Button>
      <Button handler={handleBadClick}>
        bad
      </Button>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
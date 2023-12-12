import { useState } from "react"

const StatisticLine = ({text, value }) =>
   <tr>
    <td>
      {text}
    </td>
    <td>
      {value}
    </td>
   </tr>


const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const Statistics = ({ good, bad, neutral }) => {
  const total = good+neutral+bad;
  const average = (good-bad)/total;
  const positive = (good/total *100) + '%';

  return(
    <>
    {total !== 0 ? (
      <table>
        <thead>
          <tr>
            <td>Type</td>
            <td>Total</td>
          </tr>
        </thead>
        <tbody>
          <StatisticLine text={'neutral'} value={neutral}/>
          <StatisticLine text={'bad'} value={bad}/>
          <StatisticLine text={'all'} value={total}/>
          <StatisticLine text={'average'} value={average}/>
          <StatisticLine text={'positive'} value={positive}/>
        </tbody>
      </table>
    ) : (
      <div>No Feedback give</div>
    )}
    </>
  )
}
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const ToggleGood = () => {
    setGood(good+1)
  }
  const ToggleNeutral = () => {
    setNeutral(neutral+1)
  }
  const ToggleBad = () => {
    setBad(bad+1)
  }


  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <Button onClick={ToggleGood} text={'good'}/>
        <Button onClick={ToggleNeutral} text={'neutral'}/>
        <Button onClick={ToggleBad} text={'bad'}/>
      </div>
      <h1>Statistcs</h1>
      <div>
        <Statistics good={good} bad={bad} neutral={neutral} />
      </div>
    </div>
  )
}

export default App

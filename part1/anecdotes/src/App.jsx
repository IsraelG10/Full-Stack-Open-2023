import { useState } from "react"

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const Vote = ({ data, anecdotes }) => {
  let vote = 0;
  let index = 0;
  vote = Math.max(...data);
  index = data.indexOf(vote);

  return (
    <>
      {vote !== 0 &&
        <div>
          <h1>Anecdote with most votes</h1>
          <p>{anecdotes[index]}</p>
          <h4>has {vote} votes</h4>
        </div>
      }
    </>
  );
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const toggleNext = () => {
    const index = Math.floor(Math.random() * anecdotes.length)
    setSelected(index)
    setCount(0)

  }
  const toggleCount = () => {
    setCount(count+1)
    addVote(selected)
  }

  const addVote = (selected) => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
       {anecdotes[selected]}
      </p>
      <div>
        <Button onClick={toggleCount} text={'vote'}/>
        <Button onClick={toggleNext} text={'next anecdote'}/>
      </div>
      <Vote anecdotes={anecdotes} data={points} />
    </div>
  )
}

export default App

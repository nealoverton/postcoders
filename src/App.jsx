import { useEffect, useState } from 'react'
import { getAreaData } from './api'

import './App.css'

function App() {

  const [areas, setAreas] = useState([]);
  const [input, setInput] = useState('');
  const [outcode, setOutcode] = useState('');

  const load = async () => {
    try {
      const areaData = await getAreaData(outcode)
  
      setAreas(areaData);
    } catch (error) {
      window.alert("todo: fix app")
    }
  }

  useEffect(() => {
    if(!outcode){
      setAreas([]);
      return;
    }
    
    load();
  }, [outcode]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setOutcode(input.toUpperCase());
  }

  return (
    <div className="App">
      <h1>Postcoders</h1>
      <form>
        <p>Type in a UK postcode to see data for the localities it contains.<br/>
        You only need the outcode &#40;the first part&#41;, eg M5 or NW10.</p>
        <input onChange={(event) => setInput(event.target.value)}/>
        <button onClick={handleSubmit}>Go!</button>
      </form>
      <h2>{`Areas for " ${outcode} ": ${areas.length}`}</h2>
    </div>
  )
}

export default App

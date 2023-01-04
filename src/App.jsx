import { useEffect, useState } from 'react'
import { getAreaData } from './api'

import './App.css'
import { AreaCard } from './AreaCard';

function App() {

  const [areas, setAreas] = useState([]);
  const [input, setInput] = useState('');
  const [outcode, setOutcode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const load = async () => {
    const cachedAreas = sessionStorage.getItem(outcode);

    if(cachedAreas){
      setAreas(JSON.parse(cachedAreas));
      setIsLoading(false);
      return;
    }

    try {
      const areaData = await getAreaData(outcode)
      
      sessionStorage.setItem(outcode, JSON.stringify(areaData));
      setAreas(areaData);
    } catch (error) {
      window.alert("todo: fix app")
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if(!outcode){
      setAreas([]);
      return;
    }

    setIsLoading(true);
    load();
  }, [outcode]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setOutcode(input.toUpperCase());
  }

  return (
    <div className="App">
      <h1>Postcoders</h1>
      <form className='App__form'>
        <p>Type in a UK postcode to see data for the localities it contains.<br/>
        You only need the outcode &#40;the first part&#41;, eg M5 or NW10.</p>
        <input onChange={(event) => setInput(event.target.value)}/>
        <button onClick={handleSubmit}>Go!</button>
      </form>
      <h2>{`Areas for " ${outcode} ": ${areas.length}`}</h2>
      {
        isLoading ? <p>Loading...</p> : 
        areas.map((area, index) => <AreaCard key={index} area={area} />)
      }
      
    </div>
  )
}

export default App

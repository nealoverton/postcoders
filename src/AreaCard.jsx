import { Card } from '@mui/material';
import './AreaCard.css';

export const AreaCard = ({ area }) => {
  return (
    <Card className='AreaCard'>
      <h2>{area["place name"]}</h2>
      <p>state: {area.state}</p>
      <p>state abbreviation: {area["state abbreviation"]}</p>
      <p>latitude: {area.latitude}</p>
      <p>longitude: {area.longitude}</p>
    </Card>
  )
}
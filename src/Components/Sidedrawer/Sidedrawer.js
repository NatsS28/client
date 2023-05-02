import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { KenContext } from '../../Context/KenContext';
import './SideDrawer.css';

function Sidedrawer() {

    const { kenExisting,fetchKenData } = useContext(KenContext);
    const [currentKen, setCurrentKen] = useState();

    useEffect(() => {
        console.log(kenExisting);
    })

    const handleChange = (e) => {
        //fetchKenData(e.target.value);
        setCurrentKen(e.target.value);
    }
  return (
      <div>
          <h2>Ken Available</h2>
          <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Ken</InputLabel>
              <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={currentKen}
                  label="Ken"
                  onChange={handleChange}
              >
    
                  {kenExisting.map((ken) => {
                      return (
                          <MenuItem value={ken} onChange={()=>{handleChange()}}>{ken}</MenuItem>
                      )
                  })
                      
                  }
              </Select>
          </FormControl>
      </div>
  )
}

export default Sidedrawer
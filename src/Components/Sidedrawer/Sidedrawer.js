import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { KenContext } from '../../Context/KenContext';
import './SideDrawer.css';
import { fetchAccessToken } from '../../ApiCalls/Api';
import { fetchServiceOrdersList } from '../../ApiCalls/operational-api-supporting-functions';

function Sidedrawer() {

    var { kenExisting, showLoader, hideLoader, serviceOrdersList, setServiceOrdersList, setWorkOrderList } = useContext(KenContext);
    const [currentKen, setCurrentKen] = useState();
    const CLIENT_ID = '355a084b-3085-42cf-892f-8b89aaa17779';
    const CLIENT_SECRET = 'c84f0df1ac6ce103512e06e1938a45de0fc0a4b22cc7f204a860ebcaa494cad5';
    var scope = ['serviceinfo/']

    useEffect(() => {
        console.log(kenExisting);
    })

    const handleChange = async (e) => {
        setWorkOrderList([]);
        showLoader();
        localStorage.setItem('activeKen', (e.target.value));
        scope = [`serviceinfo/ken:${e.target.value}`]
        await fetchAccessToken(CLIENT_ID, CLIENT_SECRET, scope).then(async(value) => {
            var accessTokeServiceInfo = value;
            await fetchServiceOrdersList(accessTokeServiceInfo, `ken:${e.target.value}`).then((value) => {
                    console.log(value)
                    setServiceOrdersList(value);
            }).catch((error) => {
                    console.log(error+"npooooo")
                    setServiceOrdersList('');
                    hideLoader();
                });
            //console.log(serviceOrderList);
            hideLoader();
        }).catch((error) => {
            console.log(error + "npooooo")
            setServiceOrdersList('');
            hideLoader();
        })
    }
  return (
      <div>
          <h1>Ken Available</h1>
          <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Ken</InputLabel>
              <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={currentKen}
                  label="Ken"
                  onChange={(e)=>handleChange(e)}
              >
    
                  {kenExisting.map((ken) => {
                      return (
                          <MenuItem value={ken.id} onChange={(e)=>{handleChange(e)}}>{ken.id}</MenuItem>
                      )
                  })
                      
                  }
              </Select>
          </FormControl>
      </div>
  )
}

export default Sidedrawer
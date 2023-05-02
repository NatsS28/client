import React, { useContext } from 'react'
import Sidedrawer from './Sidedrawer/Sidedrawer'
import RightContainer from './RightContainer/RightContainer'
import './Container.css'
import { KenContext } from '../Context/KenContext';

function Container() {
    //const { equipmentStatus, serviceOrdersList, equipmentInfo, serviceiddetail } = useContext(KenContext);
  return (
      <div className="screen">
          <div className='sideDrawer child'>
              <Sidedrawer />
          </div>
          <div className='rightContainer child'>
              
              <RightContainer/>
          </div>
          
    </div>
  )
}

export default Container
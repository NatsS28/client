import React, { useContext, useEffect, useState } from 'react'
import './RightContainer.css';
import { KenContext } from '../../Context/KenContext';
import { fetchKenData } from '../../ApiCalls/Api';

function RightContainer() {
    //const { equipmentStatus, serviceOrdersList, equipmentInfo, serviceiddetail } = useContext(KenContext);
    const [kenValue, setKenValue] = useState([]);

    useEffect(() => {
        fetchKenData('ken:111111111').then((value) => {
            setKenValue(value);
            console.log(kenValue);
        })
    }, [])
    
    //console.log(kenValue.maintenance.technicianComment.length)

    return (
        <>
            <h2>Equipment Info</h2>
            <div className='right'>

                <div className='card'>
                    <br></br>
                    <h1>Custopmer Details </h1>
                    <br></br>
                    <h2 className='value'>{kenValue.description}</h2>
                </div>
                <div className='card'>
                    <br></br>
                    <h1>Type</h1>
                    <br></br>
                    <h2 className='value'>{kenValue.type}</h2>
                </div>
                <div className='card'>
                    <br></br>
                    <h1>Serial number</h1>
                    <br></br>
                    <h2 className='value'>{kenValue.serialNumber}</h2>
                </div>
                <div className='card'>
                    <br></br>
                    <h1>Name</h1>
                    <br></br>
                    <h2 className='value'>{kenValue.addressName}</h2>
                </div>
            </div>
            <h2>equipmentStatus</h2>
            <div className='right'>

                <div className='card'>
                    <br></br>
                    <h1>Entrapment</h1>
                    <br></br>
                    <h2 className='value'>{kenValue.entrapment === true ? "yes": "No"}</h2>
                </div>
                {/* <div className='card'>
                    <br></br>
                    <h1>status</h1>
                    <br></br>
                    <h2 className='value'>{kenValue.maintenance.status}</h2>
                </div>
                <div className='card'>
                    <br></br>
                    <h1>techy</h1>
                    <br></br>
                    <h2 className='value'>{kenValue.maintenance.technicianComment.length > 20 ? kenValue.maintenance.technicianComment.substring(0,20)+'...' : kenValue.maintenance.technicianComment}</h2>
                </div> */}
            </div>
            
        </>
  )
}

export default RightContainer
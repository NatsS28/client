import React, { useContext, useEffect } from 'react'
import './RightContainer.css';
import { KenContext } from '../../Context/KenContext';

function RightContainer() {
    //const { equipmentStatus, serviceOrdersList, equipmentInfo, serviceiddetail } = useContext(KenContext);

    const {serviceOrdersList}  = useContext(KenContext);

    return (
        <>
            <h2>Service Order List</h2>
            {serviceOrdersList.map((orderlist) => {
                return (
                    <div className='right'>

                        <div className='card'>
                            <div className='prompt'><h1>Activity Type</h1></div>
                            <br></br>
                            <h2 className='value'>{orderlist.activityType}</h2>
                        </div>
                        <div className='card'>
                            <div className='prompt'><h1>Equipment Number</h1></div>
                            <br></br>
                            <h2 className='value'>{orderlist.customerEquipmentNumber}</h2>
                        </div>
                        <div className='card'>
                            <div className='prompt'><h1>Service Order ID number</h1></div>
                            <br></br>
                            <h2 className='value'>{orderlist.customerServiceOrderId}</h2>
                        </div>
                        <div className='card'>
                            <div className='prompt'><h1>ServiceOrderNumber</h1></div>
                            <br></br>
                            <h2 className='value'>{orderlist.serviceOrderNumber}</h2>
                        </div>
                        <div className='card'>
                            <div className='prompt'><h1>Work order Number</h1></div>
                            <br></br>
                            <h2 className='value'>{orderlist.workOrderNumber}</h2>
                        </div>
                    </div>
                )
            })

            }
            <h2>equipmentStatus</h2>
          
            
        </>
  )
}

export default RightContainer

//     < div className = 'right' >

//         <div className='card'>
//             <br></br>
//             <h1>Entrapment</h1>
//             <br></br>
//             <h2 className='value'>{kenValue.entrapment === true ? "yes" : "No"}</h2>
//         </div>
// <div className='card'>
//                     <br></br>
//                     <h1>status</h1>
//                     <br></br>
//                     <h2 className='value'>{kenValue.maintenance.status}</h2>
//                 </div>
//                 <div className='card'>
//                     <br></br>
//                     <h1>techy</h1>
//                     <br></br>
//                     <h2 className='value'>{kenValue.maintenance.technicianComment.length > 20 ? kenValue.maintenance.technicianComment.substring(0,20)+'...' : kenValue.maintenance.technicianComment}</h2>
//                 </div>
//             </div >
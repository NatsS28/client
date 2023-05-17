import React, { useContext, useEffect, useState } from 'react'
import './RightContainer.css';
import { KenContext } from '../../Context/KenContext';
import { fetchAccessToken } from '../../ApiCalls/Api';
import { fetchMovementList, fetchWorkServiceOrdersList } from '../../ApiCalls/operational-api-supporting-functions';
import { CLIENT_ID, CLIENT_SECRET, scope } from '../Common';

function RightContainer() {
    //const { equipmentStatus, serviceOrdersList, equipmentInfo, serviceiddetail } = useContext(KenContext);

    const { serviceOrdersList, hideLoader, showLoader, setWorkOrderList, workOrderList, movementList, setMovementList } = useContext(KenContext);
    var scope = ['serviceinfo/'];
    
    const handleClick = async (orderId) => {
        var currentKen = localStorage.getItem('activeKen')
        showLoader();
        scope = [`serviceinfo/ken:${currentKen}`]
        await fetchAccessToken(CLIENT_ID, CLIENT_SECRET, scope).then(async (value) => {
            var accessTokeServiceInfo = value;
            await fetchWorkServiceOrdersList(accessTokeServiceInfo, `ken:${currentKen}`,orderId).then((value) => {
                console.log(value);
                setWorkOrderList(value);
                console.log(Object.keys(workOrderList).length);
            }).catch((error) => {
                setWorkOrderList('');
                hideLoader();
            });
            scope = [`rtm/ken:${currentKen}`]
            
            await fetchAccessToken(CLIENT_ID, CLIENT_SECRET, scope).then(async (value) => {
                accessTokeServiceInfo = value
                await fetchMovementList(accessTokeServiceInfo,currentKen).then((value) => {
                    console.log(value);
                    setMovementList(value);
                })
            }).catch((err) => {
                console.log(err);
            })
            hideLoader();
        }).catch((error) => {
            setWorkOrderList('');
            hideLoader();
        })
    }

    return (
        <div className='container_right'>
            <h1>Service Order List</h1>
            {Object.keys(serviceOrdersList).length > 0 ? serviceOrdersList.map((orderlist) => {
                return (
                    <div className='right'>

                        <div className='card'>
                            <div className='prompt'><h1>Activity Type</h1></div>
                            <br></br>
                            <h2 className='value'>{orderlist.activityType}</h2>
                        </div>
                        {orderlist.activityType === 'Callout' && <div className='card'>
                            <div className='prompt'><h1>Equipment Number</h1></div>
                            <br></br>
                            <h2 className='value'>{orderlist.customerEquipmentNumber}</h2>
                        </div>}
                        {orderlist.activityType === 'Callout' && <div className='card'>
                            <div className='prompt'><h1>Service Order ID Number</h1></div>
                            <br></br>
                            <h2 className='value'>{orderlist.customerServiceOrderId}</h2>
                        </div>}
                        {orderlist.activityType === 'Callout' && <div className='card'>
                            <div className='prompt'><h1>ServiceorderNumber</h1></div>
                            <br></br>
                            <h2 className='value'>{orderlist.serviceOrderNumber}</h2>
                        </div>}
                        <div className='card' onClick={(e) => { handleClick(orderlist.workOrderNumber) }}>
                            <div className='prompt'><h1>Work Order Number</h1></div>
                            <br></br>
                            <h2 className='value'>{orderlist.workOrderNumber}</h2>
                        </div>
                    </div>
                )
            }) : <div>Select Ken to display data</div>

            }
            
            {Object.keys(workOrderList).length > 0 ?
                <>
                    <h1>Work order Info</h1>
                    <div className='right'>

                        <div className='card'>
                            <div className='prompt'><h1>Status</h1></div>
                            <br></br>
                            <h2 className='value'>{workOrderList.status}</h2>
                        </div>
                        {<div className='card'>
                            <div className='prompt'><h1>Job Description</h1></div>
                            <br></br>
                            <h2 className='value desc'>{workOrderList.jobDescription}</h2>
                        </div>}
                        {<div className='card'>
                            <div className='prompt'><h1>Customer</h1></div>
                            <br></br>
                            <h2 className='value'>{workOrderList.customer}</h2>
                        </div>}
                        {<div className='card'>
                            <div className='prompt'><h1>Work Time</h1></div>
                            <br></br>
                            <h2 className='value'>{workOrderList.workTime} hours</h2>
                        </div>}
                        <div className='card' >
                            <div className='prompt'><h1>Company Code</h1></div>
                            <br></br>
                            <h2 className='value'>{workOrderList.companyCode}</h2>
                        </div>
                    </div> 
                </> : 
                <div>{Object.keys(serviceOrdersList).length > 0 ? <h3>Click work order to display data</h3>:null}</div>

            }

            {Object.keys(workOrderList).length > 0 && Object.keys(movementList).length > 0 ?
                <div className='right'>

                    <div className='card'>
                        <div className='prompt'><h1>Load Percent</h1></div>
                        <br></br>
                        <h2 className='value'>{movementList[0].decks[0].loadPercentage}</h2>
                    </div>
                    <div className='card'>
                        <div className='prompt'><h1>Starting from</h1></div>
                        <br></br>
                        <h2 className='value'>Floor {movementList[0].decks[0].startFloor.floorIndex}</h2>
                    </div>
                    <div className='card'>
                        <div className='prompt'><h1>To </h1></div>                                                                                                              
                        <br></br>
                        <h2 className='value'>Floor {movementList[0].decks[0].stopFloor.floorIndex}</h2>
                    </div>
                    </div>
                : null
                
            }

        </div>
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
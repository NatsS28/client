import react, { createContext, useEffect, useState } from "react";
import axios  from "axios";
import querystring from 'querystring';
import { fetchAccessToken, fetchAllKen } from "../ApiCalls/Api";
import { fetchEquipmentBasicInformation, fetchEquipmentStatus, fetchServiceOrdersList, fetchSingleServiceOrder } from "../ApiCalls/operational-api-supporting-functions";
const CLIENT_ID = '355a084b-3085-42cf-892f-8b89aaa17779';
const CLIENT_SECRET = 'c84f0df1ac6ce103512e06e1938a45de0fc0a4b22cc7f204a860ebcaa494cad5';
const scope = ['equipmentstatus/*', 'serviceinfo/*', 'application/inventory'] 


export const KenContext = createContext();

export function KenProvider({ children }) {

    const [kenExisting, setKenExisting] = useState([]);
    const [equipmentStatus, setEquipmentStatus] = useState([]);
    const [serviceOrdersList, setServiceOrdersList] = useState([]);
    const [equipmentInfo, setEquipmentInfo] = useState([]);
    const [serviceiddetail, setServiceiddetail] = useState([]);



    useEffect(() => {
        fetchAllKen().then((ken_array) => {
            console.log(ken_array);
            setKenExisting(ken_array);
        });
    }, [])

    const fetchKenData = async (ken_id) => {

        var accessToken = await fetchAccessToken(CLIENT_ID, CLIENT_SECRET, scope);

        var equipmentStatus = ''
        var serviceiddetail = ''
        var equipmentInfo = ''

        equipmentStatus = await fetchEquipmentStatus(accessToken, ken_id);
        var serviceOrdersList = await fetchServiceOrdersList(accessToken, ken_id);
        if (!(serviceOrdersList.includes("Error"))) {
            var id = serviceOrdersList.pop()
            serviceOrdersList.push(id)
            serviceiddetail = await fetchSingleServiceOrder(accessToken, ken_id, id['serviceOrderId']);
        }


        equipmentInfo = await fetchEquipmentBasicInformation(accessToken, ken_id);

        console.log(equipmentStatus);
        setEquipmentStatus(equipmentStatus);
        console.log(serviceOrdersList);
        setServiceOrdersList(serviceOrdersList);
        console.log(equipmentInfo);
        setEquipmentInfo(equipmentInfo);
        console.log(serviceiddetail);
        setServiceiddetail(serviceiddetail);
    }
    
    
    return (
        <KenContext.Provider
            value={{
                kenExisting,
                equipmentStatus,
                serviceOrdersList,
                equipmentInfo,
                serviceiddetail,
                setEquipmentStatus,
                setServiceOrdersList,
                setEquipmentInfo,
                setServiceiddetail,fetchKenData
            }}>
            {children}
        </KenContext.Provider>
    )
    
}
import axios from 'axios';
import querystring from 'querystring';
import { fetchEquipmentBasicInformation, fetchEquipmentStatus, fetchServiceOrdersList, fetchSingleServiceOrder } from './operational-api-supporting-functions';
const CLIENT_ID = '355a084b-3085-42cf-892f-8b89aaa17779';
const CLIENT_SECRET = 'c84f0df1ac6ce103512e06e1938a45de0fc0a4b22cc7f204a860ebcaa494cad5';
const scope = ['equipmentstatus/*', 'serviceinfo/*', 'application/inventory'] 




export const fetchAllKen = async() => {
    
    var access_token,ken_array;
    await fetchAccessToken(CLIENT_ID, CLIENT_SECRET, scope).then((token) => {
        access_token = token;
    }).catch((err) => {
        console.log(err);
    })


    await fetchResources(access_token, 'ken').then((res) => {
        ken_array = res;
    })
    return Promise.resolve(ken_array);
}

export const fetchAccessToken = async (CLIENT_ID, CLIENT_SECRET, scope) => {
    const requestConfig = {
        method: 'POST',
        url: `https://dev.kone.com/api/v1/oauth2/token`,
        timeout: 1000 * 10,
        auth: {
            username: CLIENT_ID,
            password:CLIENT_SECRET,
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: querystring.stringify({
            grant_type: 'client_credentials',
            scope: scope ? scope.join(' ') : '',
        }),
    }
    const requestResult = await axios(requestConfig)
    return Promise.resolve(requestResult.data.access_token);
}


export const fetchResources = async (accessToken, resourceType) => {

    const requestConfig = {
        method: 'GET',
        url: `https://dev.kone.com/api/v1/application/self/resources`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    }
    // Execute the request
    const result = await axios(requestConfig)

    var resources = (result.data).filter((resource) => resource.startsWith(`${resourceType}:`))

    return Promise.resolve(resources);

    // If no buildings are accessible the throw an error
    // if (_.isEmpty(resources))
    //     resources = "Error: No resources are available for the provided credentials
}


export const fetchKenData = async (ken_id) => {

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
    console.log(serviceOrdersList);
    console.log(equipmentInfo);
    console.log(serviceiddetail);
    let values = {
        ...equipmentStatus,
        ...serviceOrdersList,
        ...equipmentInfo,
        ...serviceiddetail
    }
    return Promise.resolve(values);
}
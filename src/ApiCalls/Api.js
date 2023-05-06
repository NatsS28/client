import axios from 'axios';
import querystring from 'querystring';
import { fetchAvailability, fetchEquipmentBasicInformation, fetchEquipmentStatus, fetchServiceOrdersList, fetchSingleServiceOrder } from './operational-api-supporting-functions';
const CLIENT_ID = '355a084b-3085-42cf-892f-8b89aaa17779';
const CLIENT_SECRET = 'c84f0df1ac6ce103512e06e1938a45de0fc0a4b22cc7f204a860ebcaa494cad5';
const scope = [] 




export const fetchAllKen = async() => {
    
    var access_token,ken_array;
    await fetchAccessToken(CLIENT_ID, CLIENT_SECRET, scope).then((token) => {
        access_token = token;
    }).catch((err) => {
        console.log(err);
    })


    await fetchResources(access_token, 'ken').then((res) => {
        ken_array = res;
        console.log(ken_array);
    })
    return Promise.resolve(ken_array);
}

export const fetchAccessToken = async (CLIENT_ID, CLIENT_SECRET, scope) => {
    if (scope) {
        console.log(scope);
    }
    //console.log(scope);
    const requestConfig = {
        method: 'POST',
        url: `https://dev.kone.com/api/v2/oauth2/token`,
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
    if (scope) {
        console.log(requestResult.data.access_token);
    }
    return Promise.resolve(requestResult.data.access_token);
}


export const fetchResources = async (accessToken, resourceType) => {

    const requestConfig = {
        method: 'GET',
        url: `https://dev.kone.com/api/v2/application/self/resources`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    }
    // Execute the request
    const result = await axios(requestConfig)
    console.log(result);
    console.log(result.data.equipments);

    var resources = result.data.equipments;

    return Promise.resolve(resources);

    // If no buildings are accessible the throw an error
    // if (_.isEmpty(resources))
    //     resources = "Error: No resources are available for the provided credentials
}


export const fetchKenData = async (ken_id) => {

    var accessToken = await fetchAccessToken(CLIENT_ID, CLIENT_SECRET, scope);

    // var equipmentStatus = ''
    // var serviceiddetail = ''
    // var equipmentInfo = ''

    // equipmentStatus = await fetchEquipmentStatus(accessToken, ken_id);
    // var serviceOrdersList = await fetchServiceOrdersList(accessToken, ken_id);
    // if (!(serviceOrdersList.includes("Error"))) {
    //     var id = serviceOrdersList.pop()
    //     serviceOrdersList.push(id)
    //     serviceiddetail = await fetchSingleServiceOrder(accessToken, ken_id, id['serviceOrderId']);
    // }


    // equipmentInfo = await fetchEquipmentBasicInformation(accessToken, ken_id);
    
    // console.log(equipmentStatus);
    // console.log(serviceOrdersList);
    // console.log(equipmentInfo);
    // console.log(serviceiddetail);
    // let values = {
    //     ...equipmentStatus,
    //     ...serviceOrdersList,
    //     ...equipmentInfo,
    //     ...serviceiddetail
    // }
    // return Promise.resolve(values);

    //availability
    var availability = await fetchAvailability(accessToken,ken_id);
    //status
    console.log(availability);

    //movement

}


//"serviceinfov2/sken:SANDBOX:111111111 serviceinfov2/sken:SANDBOX:411111114 serviceinfov2/sken:SANDBOX:511111115 serviceinfov2/sken:SANDBOX:311111113 serviceinfov2/sken:SANDBOX:211111112 application/inventory"
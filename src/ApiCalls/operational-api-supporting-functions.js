import axios from 'axios';

const API_HOSTNAME = process.env.API_HOSTNAME || 'dev.kone.com'
const API_EQUIPMENT_ENDPOINT = `https://${API_HOSTNAME}/api/v2/equipment`

async function executeRequest(accessToken, url, errorMessage) {
  const requestConfig = {
    method: 'GET',
    url,
    headers: {
      Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      
      },
    
    
  }
  // Execute the request
  try {
      const result = await axios(requestConfig)
    return result.data
  } catch (error) {
    console.error(errorMessage, error?.message)
    return ("Error: "+errorMessage)
  }
}

async function executePOSTRequest(accessToken, url, errorMessage,equipmentId) {
    const requestConfig = {
        method: 'POST',
        url,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',

        },
        data: 
            {
                "equipmentIds": [
                    `ken:${equipmentId}`
                ]
            }
        
    }
    // Execute the request
    try {
        const result = await axios(requestConfig)
        return result.data
    } catch (error) {
        console.error(errorMessage, error?.message)
        return ("Error: " + errorMessage)
    }
}


/**
 * Function to fetch basic information of an equipment
 * @param accessToken valid access token
 * @param equipmentId equipment identifier with ken prefix. e.g ken:123456789
 */
export async function fetchEquipmentBasicInformation(accessToken, equipmentId) {
  return executeRequest(accessToken, `${API_EQUIPMENT_ENDPOINT}/${equipmentId}`, 'Failed to fetch information of the equipment:')
}

/**
 * Function to fetch status of an equipment
 * @param accessToken valid access token
 * @param equipmentId equipment identifier with ken prefix. e.g ken:123456789
 */
export async function fetchEquipmentStatus(accessToken, equipmentId) {
  return executeRequest(accessToken, `${API_EQUIPMENT_ENDPOINT}/${equipmentId}/status`, 'Failed to fetch maintenance status:')
}

/**
 * Function to fetch list of service orders for the equipment
 * @param accessToken valid access token
 * @param equipmentId equipment identifier with ken prefix. e.g ken:123456789
 */
export async function fetchServiceOrdersList(accessToken, equipmentId){
  return executeRequest(accessToken, `${API_EQUIPMENT_ENDPOINT}/${equipmentId}/serviceOrders`, 'Failed to fetch list of service orders:')
}

/**
 * Function to fetch list of service orders for the equipment
 * @param accessToken valid access token
 * @param equipmentId equipment identifier with ken prefix. e.g ken:123456789
 */
export async function fetchWorkServiceOrdersList(accessToken, equipmentId,orderId) {
    return executeRequest(accessToken, `${API_EQUIPMENT_ENDPOINT}/${equipmentId}/serviceOrders/${orderId}`, 'Failed to fetch list of service orders:')
}


/**
 * Function to fetch details of an service order for the equipment
 * @param accessToken valid access token
 * @param equipmentId equipment identifier with ken prefix. e.g ken:123456789
 * @param serviceOrderId service order identifier
 */
export async function fetchSingleServiceOrder(accessToken, equipmentId, serviceOrderId){
  return executeRequest(accessToken, `${API_EQUIPMENT_ENDPOINT}/${equipmentId}/serviceOrders/${serviceOrderId}`, 'Failed to fetch details of the service order:')
}

export async function fetchAvailability(accessToken, equipmentId,) {
    console.log(equipmentId);
    return executePOSTRequest(accessToken, `${API_EQUIPMENT_ENDPOINT}/search/availability/`, 'Failed to fetch details of the service order:')
}


export async function fetchMovementList(accessToken,equipmentId) {
    return executePOSTRequest(accessToken, `${API_EQUIPMENT_ENDPOINT}/search/movement`, 'Failed to fetch details of the service order:',equipmentId)
}




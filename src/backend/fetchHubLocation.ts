import { coreApiClient } from "@/lib/axios/coreApiClient"



export const getHubLocation = async (payload:{op:string}) => {
    const response = await coreApiClient.post("/Locations", payload)
    return response.data.result.data;
}
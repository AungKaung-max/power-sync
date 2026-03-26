import { coreApiClient } from "@/lib/axios/coreApiClient"



export const saveSession = async (payload:{appId:string,duration:number,locationId:string}) => {
    const response = await coreApiClient.post("/saveSession", payload)
    return response.data.result;
}
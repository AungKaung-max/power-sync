import { coreApiClient } from "@/lib/axios/coreApiClient"



export const getSession = async (payload:{appId:string}) => {
    const response = await coreApiClient.post("/getSession", payload)
    return response.data.result;
}
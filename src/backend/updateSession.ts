import { coreApiClient } from "@/lib/axios/coreApiClient";




export const UpdateSession = async (payload:{sessionId:string}) => {
    const response = await coreApiClient.post("/updateSession", payload)
    return response.data.result;
}
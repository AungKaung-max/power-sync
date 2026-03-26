import { coreApiClient } from "@/lib/axios/coreApiClient"



export const getUserInfo = async (payload:{authCode:string}) => {
    const response = await coreApiClient.post("/AutoLogin", payload)
    return response.data.result;
}
export const GetAuthCode = (
  success?: (code: string) => void,
  fail?: (error: unknown) => void,
) => {
  window.ma.getAuthCode({
    scopes: ["AUTH_BASE", "USER_NICKNAME", "PLAINTEXT_MOBILE_PHONE", "USER_GENDER", "USER_BIRTHDAY"],
    success: (res: any) => {
      console.log("Auth Code:", res.authCode);
      success?.(res.authCode);
    },
    fail: (err: unknown) => {
      console.error("Failed to get auth code:", err);
      fail?.(err);
    },
  });
};

export const StartPay = (payload: IStartPay, cb?: () => void) => {
  window.ma?.callNativeAPI("startPay", payload, (res: any) => {
    console.log("payment response:", res);
    if (res.resultCode == 1) {
      console.log("start pay success");
      cb?.();
    }
  });
};

export interface IStartPay {
  prepayId: string;
  orderInfo: string;
  sign: string;
  signType: string;
  useMiniResultFlag?: boolean;
}

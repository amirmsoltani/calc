import { NextApiRequest, NextApiResponse } from "next";
import { ApiHandler } from "./apiHandler";

export type MethodType = "get" | "post" | "put" | "patch" | "delete" | "option";
export const withApiHandler = (classhandler: typeof ApiHandler) => {
  return async (
    req: NextApiRequest,
    res: NextApiResponse,
  ) => {
    const method = req.method!.toLocaleLowerCase();
    const handler = new classhandler(req, res);
    if (method in handler) {
      await handler[method as MethodType]();
      return void 0;
    }
    await handler.default();
  };
};

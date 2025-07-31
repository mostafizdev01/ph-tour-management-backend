import { NextFunction, Request, Response } from "express";

/* eslint-disable @typescript-eslint/no-explicit-any */
type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void> // asynchandler req, res, next function ta nitese

export const catchAsync = (fn: AsyncHandler) => (req: Request, res: Response, next: NextFunction) => {  /// Fn ta asynchandler function ta nitese and req, res, next function ta reutrn kortese
    Promise.resolve(fn(req, res, next)).catch((err: any) => {
        next(err) //// and error hoile next kore err ta k pathiaya ditese
    })
}
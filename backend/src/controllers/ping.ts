import { Request, Response } from "express";

export async function getPing(req: Request, res: Response){
    res.status(200).json({message: "pong"});
}

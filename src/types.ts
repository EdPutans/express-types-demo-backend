import { Request, Response } from "express";

type DefaultParams = { id: string };
export type DP = DefaultParams

export type Req<P = DefaultParams, B = {}> = Request<P, unknown, B>
export type Res<T> = Response<{ data: T } | { error: string }>
export type NoId<T> = Omit<T, 'id'>
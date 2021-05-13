import { Response } from "express";

export class CustomError extends Error {
    constructor(public message: string, public code: ErrorCode, public status?: number) {
        super();
    }
}

export const handleError = (res: Response, err: Error) => {
    if (err instanceof CustomError) {
        return res.status(err.status || 500).send({
            error: err.code,
            message: err.message
        });
    }
    return res.status(500).send({
        error: ErrorCode.INTERNAL,
        message: err?.message || "Internal Server Error"
    });
};

export enum ErrorCode {
    MALFORMED_DATA = "request/malformed-data",
    NOT_FOUND = "request/not-found",
    INTERNAL = "request/internal-error"
}

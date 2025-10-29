import { ResponseStatus } from "../utils/enum.util";

export type ResponseType = {
    status: ResponseStatus;
    message: string;
    data?: object | string | number;
};

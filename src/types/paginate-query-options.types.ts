import {Order} from "../constants/order.ts";
import {OrderBy} from "../constants/order-by.ts";

export type TPaginateQueryOptions = {
    order?: Order;
    orderBy?: OrderBy;
    page?: number;
    take?: number;
}
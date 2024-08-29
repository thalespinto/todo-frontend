import { TPaginateQueryOptions } from "../../types/paginate-query-options.types.ts";

export type TGetQueryOptions = {
    title?: string
    done?: boolean;
} & TPaginateQueryOptions;
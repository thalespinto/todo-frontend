import { TPaginateQueryOptions } from "../../types/paginate-query-options.types.ts";

export type TGetQueryOptions = {
    done?: boolean;
} & TPaginateQueryOptions;
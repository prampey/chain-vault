import { Reader, Writer } from "protobufjs/minimal";
import { Params } from "../chainvault/params";
import { Cards } from "../chainvault/cards";
import { PageRequest, PageResponse } from "../cosmos/base/query/v1beta1/pagination";
export declare const protobufPackage = "prampey.chainvault.chainvault";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
    /** params holds all the parameters of this module. */
    params: Params | undefined;
}
export interface QueryGetCardsRequest {
    id: number;
}
export interface QueryGetCardsResponse {
    Cards: Cards | undefined;
}
export interface QueryAllCardsRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllCardsResponse {
    Cards: Cards[];
    pagination: PageResponse | undefined;
}
export declare const QueryParamsRequest: {
    encode(_: QueryParamsRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryParamsRequest;
    fromJSON(_: any): QueryParamsRequest;
    toJSON(_: QueryParamsRequest): unknown;
    fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest;
};
export declare const QueryParamsResponse: {
    encode(message: QueryParamsResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryParamsResponse;
    fromJSON(object: any): QueryParamsResponse;
    toJSON(message: QueryParamsResponse): unknown;
    fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse;
};
export declare const QueryGetCardsRequest: {
    encode(message: QueryGetCardsRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetCardsRequest;
    fromJSON(object: any): QueryGetCardsRequest;
    toJSON(message: QueryGetCardsRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetCardsRequest>): QueryGetCardsRequest;
};
export declare const QueryGetCardsResponse: {
    encode(message: QueryGetCardsResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetCardsResponse;
    fromJSON(object: any): QueryGetCardsResponse;
    toJSON(message: QueryGetCardsResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetCardsResponse>): QueryGetCardsResponse;
};
export declare const QueryAllCardsRequest: {
    encode(message: QueryAllCardsRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllCardsRequest;
    fromJSON(object: any): QueryAllCardsRequest;
    toJSON(message: QueryAllCardsRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllCardsRequest>): QueryAllCardsRequest;
};
export declare const QueryAllCardsResponse: {
    encode(message: QueryAllCardsResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllCardsResponse;
    fromJSON(object: any): QueryAllCardsResponse;
    toJSON(message: QueryAllCardsResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllCardsResponse>): QueryAllCardsResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** Parameters queries the parameters of the module. */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    /** Queries a Cards by id. */
    Cards(request: QueryGetCardsRequest): Promise<QueryGetCardsResponse>;
    /** Queries a list of Cards items. */
    CardsAll(request: QueryAllCardsRequest): Promise<QueryAllCardsResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    Cards(request: QueryGetCardsRequest): Promise<QueryGetCardsResponse>;
    CardsAll(request: QueryAllCardsRequest): Promise<QueryAllCardsResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};

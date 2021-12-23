import { Reader, Writer } from "protobufjs/minimal";
export declare const protobufPackage = "prampey.chainvault.chainvault";
export interface MsgAddCard {
    creator: string;
    cardNo: string;
    doe: string;
    cvv: string;
}
export interface MsgAddCardResponse {
    idValue: string;
}
export declare const MsgAddCard: {
    encode(message: MsgAddCard, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddCard;
    fromJSON(object: any): MsgAddCard;
    toJSON(message: MsgAddCard): unknown;
    fromPartial(object: DeepPartial<MsgAddCard>): MsgAddCard;
};
export declare const MsgAddCardResponse: {
    encode(message: MsgAddCardResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddCardResponse;
    fromJSON(object: any): MsgAddCardResponse;
    toJSON(message: MsgAddCardResponse): unknown;
    fromPartial(object: DeepPartial<MsgAddCardResponse>): MsgAddCardResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    /** this line is used by starport scaffolding # proto/tx/rpc */
    AddCard(request: MsgAddCard): Promise<MsgAddCardResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    AddCard(request: MsgAddCard): Promise<MsgAddCardResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};

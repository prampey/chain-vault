import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "prampey.chainvault.chainvault";
export interface Cards {
    id: number;
    cardNo: string;
    doe: string;
    cvv: string;
}
export declare const Cards: {
    encode(message: Cards, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Cards;
    fromJSON(object: any): Cards;
    toJSON(message: Cards): unknown;
    fromPartial(object: DeepPartial<Cards>): Cards;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};

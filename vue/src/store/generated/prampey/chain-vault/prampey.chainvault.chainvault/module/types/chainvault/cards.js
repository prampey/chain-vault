/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
export const protobufPackage = "prampey.chainvault.chainvault";
const baseCards = { id: 0, cardNo: "", doe: "", cvv: "" };
export const Cards = {
    encode(message, writer = Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        if (message.cardNo !== "") {
            writer.uint32(18).string(message.cardNo);
        }
        if (message.doe !== "") {
            writer.uint32(26).string(message.doe);
        }
        if (message.cvv !== "") {
            writer.uint32(34).string(message.cvv);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseCards };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = longToNumber(reader.uint64());
                    break;
                case 2:
                    message.cardNo = reader.string();
                    break;
                case 3:
                    message.doe = reader.string();
                    break;
                case 4:
                    message.cvv = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseCards };
        if (object.id !== undefined && object.id !== null) {
            message.id = Number(object.id);
        }
        else {
            message.id = 0;
        }
        if (object.cardNo !== undefined && object.cardNo !== null) {
            message.cardNo = String(object.cardNo);
        }
        else {
            message.cardNo = "";
        }
        if (object.doe !== undefined && object.doe !== null) {
            message.doe = String(object.doe);
        }
        else {
            message.doe = "";
        }
        if (object.cvv !== undefined && object.cvv !== null) {
            message.cvv = String(object.cvv);
        }
        else {
            message.cvv = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        message.cardNo !== undefined && (obj.cardNo = message.cardNo);
        message.doe !== undefined && (obj.doe = message.doe);
        message.cvv !== undefined && (obj.cvv = message.cvv);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseCards };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = 0;
        }
        if (object.cardNo !== undefined && object.cardNo !== null) {
            message.cardNo = object.cardNo;
        }
        else {
            message.cardNo = "";
        }
        if (object.doe !== undefined && object.doe !== null) {
            message.doe = object.doe;
        }
        else {
            message.doe = "";
        }
        if (object.cvv !== undefined && object.cvv !== null) {
            message.cvv = object.cvv;
        }
        else {
            message.cvv = "";
        }
        return message;
    },
};
var globalThis = (() => {
    if (typeof globalThis !== "undefined")
        return globalThis;
    if (typeof self !== "undefined")
        return self;
    if (typeof window !== "undefined")
        return window;
    if (typeof global !== "undefined")
        return global;
    throw "Unable to locate global object";
})();
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
    }
    return long.toNumber();
}
if (util.Long !== Long) {
    util.Long = Long;
    configure();
}

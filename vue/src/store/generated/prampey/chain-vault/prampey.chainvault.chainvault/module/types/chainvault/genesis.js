/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import { Params } from "../chainvault/params";
import { Cards } from "../chainvault/cards";
export const protobufPackage = "prampey.chainvault.chainvault";
const baseGenesisState = { cardsCount: 0 };
export const GenesisState = {
    encode(message, writer = Writer.create()) {
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.cardsList) {
            Cards.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.cardsCount !== 0) {
            writer.uint32(24).uint64(message.cardsCount);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseGenesisState };
        message.cardsList = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.params = Params.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.cardsList.push(Cards.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.cardsCount = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseGenesisState };
        message.cardsList = [];
        if (object.params !== undefined && object.params !== null) {
            message.params = Params.fromJSON(object.params);
        }
        else {
            message.params = undefined;
        }
        if (object.cardsList !== undefined && object.cardsList !== null) {
            for (const e of object.cardsList) {
                message.cardsList.push(Cards.fromJSON(e));
            }
        }
        if (object.cardsCount !== undefined && object.cardsCount !== null) {
            message.cardsCount = Number(object.cardsCount);
        }
        else {
            message.cardsCount = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.params !== undefined &&
            (obj.params = message.params ? Params.toJSON(message.params) : undefined);
        if (message.cardsList) {
            obj.cardsList = message.cardsList.map((e) => e ? Cards.toJSON(e) : undefined);
        }
        else {
            obj.cardsList = [];
        }
        message.cardsCount !== undefined && (obj.cardsCount = message.cardsCount);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseGenesisState };
        message.cardsList = [];
        if (object.params !== undefined && object.params !== null) {
            message.params = Params.fromPartial(object.params);
        }
        else {
            message.params = undefined;
        }
        if (object.cardsList !== undefined && object.cardsList !== null) {
            for (const e of object.cardsList) {
                message.cardsList.push(Cards.fromPartial(e));
            }
        }
        if (object.cardsCount !== undefined && object.cardsCount !== null) {
            message.cardsCount = object.cardsCount;
        }
        else {
            message.cardsCount = 0;
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

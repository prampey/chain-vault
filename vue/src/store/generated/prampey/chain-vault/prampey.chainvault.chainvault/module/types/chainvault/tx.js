/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";
export const protobufPackage = "prampey.chainvault.chainvault";
const baseMsgAddCard = { creator: "", cardNo: "", doe: "", cvv: "" };
export const MsgAddCard = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
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
        const message = { ...baseMsgAddCard };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
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
        const message = { ...baseMsgAddCard };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
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
        message.creator !== undefined && (obj.creator = message.creator);
        message.cardNo !== undefined && (obj.cardNo = message.cardNo);
        message.doe !== undefined && (obj.doe = message.doe);
        message.cvv !== undefined && (obj.cvv = message.cvv);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgAddCard };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
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
const baseMsgAddCardResponse = { idValue: "" };
export const MsgAddCardResponse = {
    encode(message, writer = Writer.create()) {
        if (message.idValue !== "") {
            writer.uint32(10).string(message.idValue);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgAddCardResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.idValue = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgAddCardResponse };
        if (object.idValue !== undefined && object.idValue !== null) {
            message.idValue = String(object.idValue);
        }
        else {
            message.idValue = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.idValue !== undefined && (obj.idValue = message.idValue);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgAddCardResponse };
        if (object.idValue !== undefined && object.idValue !== null) {
            message.idValue = object.idValue;
        }
        else {
            message.idValue = "";
        }
        return message;
    },
};
export class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    AddCard(request) {
        const data = MsgAddCard.encode(request).finish();
        const promise = this.rpc.request("prampey.chainvault.chainvault.Msg", "AddCard", data);
        return promise.then((data) => MsgAddCardResponse.decode(new Reader(data)));
    }
}

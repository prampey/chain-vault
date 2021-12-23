/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";

export const protobufPackage = "prampey.chainvault.chainvault";

export interface MsgAddCard {
  creator: string;
  cardNo: string;
  doe: string;
  cvv: string;
}

export interface MsgAddCardResponse {
  idValue: string;
}

const baseMsgAddCard: object = { creator: "", cardNo: "", doe: "", cvv: "" };

export const MsgAddCard = {
  encode(message: MsgAddCard, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): MsgAddCard {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgAddCard } as MsgAddCard;
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

  fromJSON(object: any): MsgAddCard {
    const message = { ...baseMsgAddCard } as MsgAddCard;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.cardNo !== undefined && object.cardNo !== null) {
      message.cardNo = String(object.cardNo);
    } else {
      message.cardNo = "";
    }
    if (object.doe !== undefined && object.doe !== null) {
      message.doe = String(object.doe);
    } else {
      message.doe = "";
    }
    if (object.cvv !== undefined && object.cvv !== null) {
      message.cvv = String(object.cvv);
    } else {
      message.cvv = "";
    }
    return message;
  },

  toJSON(message: MsgAddCard): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.cardNo !== undefined && (obj.cardNo = message.cardNo);
    message.doe !== undefined && (obj.doe = message.doe);
    message.cvv !== undefined && (obj.cvv = message.cvv);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgAddCard>): MsgAddCard {
    const message = { ...baseMsgAddCard } as MsgAddCard;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.cardNo !== undefined && object.cardNo !== null) {
      message.cardNo = object.cardNo;
    } else {
      message.cardNo = "";
    }
    if (object.doe !== undefined && object.doe !== null) {
      message.doe = object.doe;
    } else {
      message.doe = "";
    }
    if (object.cvv !== undefined && object.cvv !== null) {
      message.cvv = object.cvv;
    } else {
      message.cvv = "";
    }
    return message;
  },
};

const baseMsgAddCardResponse: object = { idValue: "" };

export const MsgAddCardResponse = {
  encode(
    message: MsgAddCardResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.idValue !== "") {
      writer.uint32(10).string(message.idValue);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAddCardResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgAddCardResponse } as MsgAddCardResponse;
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

  fromJSON(object: any): MsgAddCardResponse {
    const message = { ...baseMsgAddCardResponse } as MsgAddCardResponse;
    if (object.idValue !== undefined && object.idValue !== null) {
      message.idValue = String(object.idValue);
    } else {
      message.idValue = "";
    }
    return message;
  },

  toJSON(message: MsgAddCardResponse): unknown {
    const obj: any = {};
    message.idValue !== undefined && (obj.idValue = message.idValue);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgAddCardResponse>): MsgAddCardResponse {
    const message = { ...baseMsgAddCardResponse } as MsgAddCardResponse;
    if (object.idValue !== undefined && object.idValue !== null) {
      message.idValue = object.idValue;
    } else {
      message.idValue = "";
    }
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** this line is used by starport scaffolding # proto/tx/rpc */
  AddCard(request: MsgAddCard): Promise<MsgAddCardResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  AddCard(request: MsgAddCard): Promise<MsgAddCardResponse> {
    const data = MsgAddCard.encode(request).finish();
    const promise = this.rpc.request(
      "prampey.chainvault.chainvault.Msg",
      "AddCard",
      data
    );
    return promise.then((data) => MsgAddCardResponse.decode(new Reader(data)));
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

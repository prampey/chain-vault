/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "prampey.chainvault.chainvault";

export interface Cards {
  id: number;
  cardNo: string;
  doe: string;
  cvv: string;
}

const baseCards: object = { id: 0, cardNo: "", doe: "", cvv: "" };

export const Cards = {
  encode(message: Cards, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): Cards {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCards } as Cards;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
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

  fromJSON(object: any): Cards {
    const message = { ...baseCards } as Cards;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
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

  toJSON(message: Cards): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.cardNo !== undefined && (obj.cardNo = message.cardNo);
    message.doe !== undefined && (obj.doe = message.doe);
    message.cvv !== undefined && (obj.cvv = message.cvv);
    return obj;
  },

  fromPartial(object: DeepPartial<Cards>): Cards {
    const message = { ...baseCards } as Cards;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
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

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

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

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}

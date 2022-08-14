import { immerable } from "immer";
import Operand from "./operand";

// TODO: turn into a type
const REGISTER_NAMES = ["ip", "rax", "rbx", "rbp", "rcx", "rdx", "rdi", "eax", "esi", "edi"];

export default class Register implements Operand {
  [immerable] = true;
  readonly name: string;
  value: number;

  constructor(name: string) {
    this.name = name;
    this.value = 0;
  }

  static isValidName(name: string): boolean {
    return REGISTER_NAMES.includes(name);
  }
}

import Operand from "./operand";

// TODO: turn into a type/enum
const REGISTER_NAMES = ["ip", "rax", "rbx", "rbp", "rcx", "rdx", "rdi", "eax", "esi", "edi"];

export default class Register implements Operand {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  static isValidName(name: string): boolean {
    return REGISTER_NAMES.includes(name);
  }
}

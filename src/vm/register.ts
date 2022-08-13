import Operand from "./operand";

export default class Register implements Operand {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  static isValidName(name: string): boolean {
    return ["rax", "rbx", "rbp", "rcx", "rdx", "rdi", "eax", "esi", "edi"].includes(name);
  }
}

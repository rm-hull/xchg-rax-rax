import { immerable } from "immer";
import { Failure, Result } from "parsimmon";
import { parse } from "../parser";
import Address from "./address";
import Instruction from "./instruction";
import Literal from "./literal";
import Register from "./register";

export class Machine {
  [immerable] = true;

  private registers: Record<string, Register>;
  private memory: Record<number, number>;
  private program: Result<Instruction[]>;
  private sourceCode: string;

  constructor() {
    this.registers = {
      ip: new Register("ip"),
    };
    this.memory = {};
    this.program = parse("");
    this.sourceCode = "";
  }

  public get ip(): number {
    return this.registers.ip.value;
  }

  public get error(): Failure | undefined {
    return hasError(this.program) ? this.program : undefined;
  }

  public get code(): string {
    return this.sourceCode;
  }

  public set code(code: string) {
    this.sourceCode = code;
    this.program = parse(code + "\n");
  }

  public step() {
    // TODO: execute instruction
    if (!hasError(this.program) && this.ip < this.program.value.length - 1) {
      this.registers.ip.value++;
    } else {
      this.stop();
    }
  }

  public stop() {
    this.registers.ip.value = 0;
  }

  public restart() {
    this.registers.ip.value = 0;
  }

  public poke(address: Address, value: Literal) {
    this.memory[address.address] = value.value;
  }

  public setRegister(name: string, value: Literal) {
    this.registers[name].value = value.value;
  }

  public *peek(startAddress: Address, endAddress: Address = startAddress) {
    for (let addr = startAddress.address; addr < endAddress.address; addr++) {
      yield this.memory[addr] || 0;
    }
  }

  public isExecuting(lineNumber: number): boolean {
    if (hasError(this.program)) {
      return false;
    }

    const metadata = this.program.value[this.ip]?.metadata;
    if (!metadata) {
      return false;
    }

    return metadata.start.line <= lineNumber && lineNumber < metadata.end.line;
  }
}

function hasError<T>(result: Result<T>): result is Failure {
  return !result.status;
}

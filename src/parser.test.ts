import { Result } from "parsimmon";
import { parse } from "./parser";
import Address from "./vm/address";
import { Instruction } from "./vm/instruction";
import Literal from "./vm/literal";
import Reference from "./vm/reference";
import Register from "./vm/register";

const stripMetadata = (result: Result<Instruction[]>): Result<Instruction[]> => {
  if (result.status) {
    result.value.map((i) => {
      i.metadata = undefined;
      return i;
    });
  }

  return result;
};

describe("NASM parser", () => {
  it("should not fail with an empty input", () => {
    const result = parse("");
    stripMetadata(result);
    expect(result).toEqual({ status: true, value: [] });
  });

  it("should parse an instruction with multiple register operands", () => {
    const instr: Instruction = { opcode: "xor", operands: [new Register("rax"), new Register("rdx")] };
    const result = parse("xor      rax,rdx");
    stripMetadata(result);
    expect(result).toEqual({ status: true, value: [instr] });
  });

  it("should parse an instruction with register and literal operands", () => {
    const instr: Instruction = { opcode: "mov", operands: [new Register("rdx"), new Literal(0)] };
    const result = parse("mov      rdx,0");
    stripMetadata(result);
    expect(result).toEqual({ status: true, value: [instr] });
  });

  it("should parse an instruction with register and address operands", () => {
    const instr: Instruction = { opcode: "lea", operands: [new Register("rbx"), new Address(0)] };
    const result = parse("lea rbx,[0]");
    stripMetadata(result);
    expect(result).toEqual({ status: true, value: [instr] });
  });

  it("should parse an instruction with a label", () => {
    const instr: Instruction = {
      label: ".loop",
      opcode: "inc",
      operands: [new Register("rdi")],
    };
    const result = parse(".loop:\n  inc      rdi");
    stripMetadata(result);
    expect(result).toEqual({ status: true, value: [instr] });
  });

  it("should parse an instruction with a ref", () => {
    const instr: Instruction = {
      opcode: "loop",
      operands: [new Reference("$")],
    };
    const result = parse("loop $");
    stripMetadata(result);
    expect(result).toEqual({ status: true, value: [instr] });
  });

  it.skip("should parse a full program", () => {
    const input = `
      xor      eax,eax
      lea      rbx,[0]
      loop     $
      mov      rdx,0
      and      esi,0
      sub      edi,edi
      push     0
      pop      rbp
    `;
    const program: Instruction[] = [];
    const result = parse(input);
    stripMetadata(result);
    console.log(result);
    console.log(input);
    expect(result).toEqual({ status: true, value: program });
  });
});

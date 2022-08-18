import { Result } from "parsimmon";
import { parse } from "./parser";
import Address from "./vm/address";
import Instruction from "./vm/instruction";
import Literal from "./vm/literal";
import Reference from "./vm/reference";
import Register from "./vm/register";

const stripMetadata = (result: Result<Instruction[]>): Result<Instruction[]> => {
  if (result.status) {
    return {
      status: true,
      value: result.value.map((i) => new Instruction(i.opcode, i.operands, i.label)),
    };
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
    const result = stripMetadata(parse("xor      rax,rdx"));
    expect(result).toEqual({ status: true, value: [instr] });
  });

  it("should parse an instruction with register and literal operands", () => {
    const instr: Instruction = { opcode: "mov", operands: [new Register("rdx"), new Literal(BigInt(0))] };
    const result = parse("mov      rdx,0");
    expect(stripMetadata(result)).toEqual({ status: true, value: [instr] });
  });

  it("should parse an instruction with a hexadecimal literal operands", () => {
    const instr: Instruction = { opcode: "ror", operands: [new Register("rcx"), new Literal(BigInt(13))] };
    const result = parse("ror      rcx,0xd");
    expect(stripMetadata(result)).toEqual({ status: true, value: [instr] });
  });

  it("should parse an instruction with register and address operands", () => {
    const instr: Instruction = { opcode: "lea", operands: [new Register("rbx"), new Address(0)] };
    const result = parse("lea rbx,[0]");
    expect(stripMetadata(result)).toEqual({ status: true, value: [instr] });
  });

  it("should parse an instruction with a label", () => {
    const instr: Instruction = {
      label: ".loop",
      opcode: "inc",
      operands: [new Register("rdi")],
    };
    const result = parse(".loop:\n  inc      rdi");
    expect(stripMetadata(result)).toEqual({ status: true, value: [instr] });
  });

  it("should parse an instruction with a ref", () => {
    const instr: Instruction = {
      opcode: "loop",
      operands: [new Reference("$")],
    };
    const result = parse("loop $");
    expect(stripMetadata(result)).toEqual({ status: true, value: [instr] });
  });

  it("should parse a full program", () => {
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
    const program: Instruction[] = [
      { opcode: "xor", operands: [new Register("eax"), new Register("eax")] },
      { opcode: "lea", operands: [new Register("rbx"), new Address(0)] },
      { opcode: "loop", operands: [new Reference("$")] },
      { opcode: "mov", operands: [new Register("rdx"), new Literal(BigInt(0))] },
      { opcode: "and", operands: [new Register("esi"), new Literal(BigInt(0))] },
      { opcode: "sub", operands: [new Register("edi"), new Register("edi")] },
      { opcode: "push", operands: [new Literal(BigInt(0))] },
      { opcode: "pop", operands: [new Register("rbp")] },
    ];
    const result = parse(input);
    expect(stripMetadata(result)).toEqual({ status: true, value: program });
  });

  it("should parse an instruction with no operands", () => {
    const input = `
      cqo
      xor      rax,rdx
      sub      rax,rdx
    `;
    const program: Instruction[] = [
      { opcode: "cqo", operands: [] },
      { opcode: "xor", operands: [new Register("rax"), new Register("rdx")] },
      { opcode: "sub", operands: [new Register("rax"), new Register("rdx")] },
    ];
    const result = parse(input);
    expect(stripMetadata(result)).toEqual({ status: true, value: program });
  });
});

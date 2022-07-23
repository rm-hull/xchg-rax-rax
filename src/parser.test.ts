import parse from "./parser";
import Instruction from "./vm/instruction";
import Register from "./vm/register";

describe("NASM parser", () => {
  it.skip("should parse an instruction with multiple operands", () => {
    const instr = new Instruction("xor", new Register("rax"), new Register("rdx"));
    expect(parse("xor      rax,rdx")).toEqual({ status: true, value: [instr] });
  });
});

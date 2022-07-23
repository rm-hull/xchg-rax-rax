import { alt, digits, Index, newline, optWhitespace, regexp, seqObj, string, whitespace } from "parsimmon";
import Address from "./vm/address";
import { Instruction } from "./vm/instruction";
import Literal from "./vm/literal";
import Reference from "./vm/reference";
import Register from "./vm/register";

const comma = string(",");

const label = regexp(/(\.?[a-z]+):/, 1).desc("label");

const opcode = regexp(/[a-z]{3,}/).desc("opcode");
const register = regexp(/(rax|rbx|rbp|rdx|rdi|eax|esi|edi)/)
  .map((value) => new Register(value))
  .desc("register");
const literal = digits.map((value) => new Literal(parseInt(value))).desc("literal");
const address = digits
  .wrap(string("["), string("]"))
  .map((value) => new Address(parseInt(value)))
  .desc("address");
const reference = alt(string("$"), regexp(/\.?[a-z]/))
  .map((value) => new Reference(value))
  .desc("reference");
const operand = alt(register, reference, address, literal);

const instruction = seqObj<Instruction>(
  optWhitespace,
  ["label", label.fallback(undefined)],
  optWhitespace,
  newline.fallback(undefined),
  optWhitespace,
  ["opcode", opcode],
  whitespace,
  ["operands", operand.trim(optWhitespace).sepBy(comma)],
  optWhitespace
)
  .mark()
  .map((mark): Instruction => ({ ...mark.value, metadata: { start: mark.start, end: mark.end } }));

const program = instruction.sepBy(newline.atLeast(1));

export const parse = (input: string) => program.parse(input);

export const index = (offset: number, line: number, column: number): Index => ({ offset, line, column });

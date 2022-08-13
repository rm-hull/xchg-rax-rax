import { alt, digits, Index, newline, optWhitespace, regexp, seqObj, string } from "parsimmon";
import Address from "./vm/address";
import Instruction from "./vm/instruction";
import Literal from "./vm/literal";
import Operand from "./vm/operand";
import Reference from "./vm/reference";
import Register from "./vm/register";

const comma = string(",").desc("comma");
const optSpace = regexp(/[ \t]*/).desc("whitespace");
const space = regexp(/[ \t]+/).desc("whitespace");
const linebreak = newline.trim(optSpace).many();

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
const operand = alt(register, reference, address, literal).trim(optSpace);

type Instr = {
  opcode: string;
  operands: Operand[];
  label?: string;
};

const instruction = seqObj<Instr>(
  optSpace,
  ["label", label.trim(linebreak).fallback(undefined)],
  optSpace,
  ["opcode", opcode],
  space,
  ["operands", operand.sepBy(comma)]
)
  .mark()
  .map((mark): Instruction => ({ ...mark.value, metadata: { start: mark.start, end: mark.end } }));

const program = instruction.sepBy(linebreak);

export const parse = (input: string) => program.trim(optWhitespace).parse(input);

export const index = (offset: number, line: number, column: number): Index => ({ offset, line, column });

import { alt, digit, digits, newline, optWhitespace, regexp, Result, seq, seqObj, string } from "parsimmon";
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

const opcode = regexp(/[a-z]{2,}/)
  .desc("opcode")
  .assert(Instruction.isValidOpcode, "invalid opcode");

const register = regexp(/[a-z]{2,3}/)
  .desc("register")
  .assert(Register.isValidName, "invalid register name")
  .map((value) => new Register(value));

const decimalNumber = seq(string("-").fallback(""), digit, digits).tie().map(BigInt);
const hexadecimalNumber = string("0x")
  .then(regexp(/[0-9a-fA-F]+/))
  .map((value) => BigInt(`0x${value}`))
  .desc("hexadecimal number");

const number = alt(hexadecimalNumber, decimalNumber);

const literal = number.map((value) => new Literal(value)).desc("literal");
const address = number
  .wrap(string("["), string("]"))
  .map((value) => new Address(Number(value)))
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
  ["operands", space.then(operand.sepBy(comma)).fallback([])]
)
  .mark()
  .trim(optWhitespace)
  .map(({ value, start, end }) => new Instruction(value.opcode, value.operands, value.label, { start, end }));

const program = instruction.sepBy(linebreak);

export const parse = (input: string): Result<Instruction[]> => program.trim(optWhitespace).parse(input);

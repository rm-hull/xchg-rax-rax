import Parsimmon from "parsimmon";

const parser = Parsimmon.alt(
  // Use `parser.desc(string)` in order to have meaningful failure messages
  Parsimmon.string("a").desc("'a' character"),
  Parsimmon.string("b").desc("'b' character")
);

const parse = (input: string) => parser.parse(input);
export default parse;

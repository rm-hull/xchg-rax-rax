import { clsx } from "clsx";
import { Failure } from "parsimmon";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-nasm";
import "prismjs/themes/prism-dark.css";
import Editor from "react-simple-code-editor";
import LineNumberRange from "../LineNumberRange";
import { ErrorMarker } from "./ErrorMarker";
import "./styles.css";

type EditorProps = {
  code: string;
  currentLine?: LineNumberRange;
  failure?: Failure;
  onCodeChange: (code: string) => void;
};

const hightlightWithLineNumbers = (
  input: string,
  language: string,
  range?: LineNumberRange,
  failure?: Failure
): JSX.Element =>
  highlight(input, language)
    .split("\n")
    .map((line: string, i: number) => {
      const currentLine = i + 1;
      return (
        <div key={i} className={clsx({ currentLine: range?.inRange(currentLine) })}>
          <span className="editorLineNumber">{currentLine}</span>
          <span dangerouslySetInnerHTML={{ __html: line }} />
          <ErrorMarker failure={failure} currentLine={currentLine} />
          <br />
        </div>
      );
    });

export function CodeEditor({ code, onCodeChange, currentLine, failure }: EditorProps) {
  return (
    <Editor
      value={code}
      onValueChange={onCodeChange}
      highlight={(code) => hightlightWithLineNumbers(code, languages.nasm, currentLine, failure)}
      padding={10}
      textareaId="codeArea"
      className="editor"
      style={{
        fontFamily: "JetBrainsMono, monospace",
        fontSize: 12,
      }}
    />
  );
}

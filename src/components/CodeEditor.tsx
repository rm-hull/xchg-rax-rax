import { clsx } from "clsx";
import { Failure } from "parsimmon";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-nasm";
import "prismjs/themes/prism-dark.css";
import { useCallback } from "react";
import Editor from "react-simple-code-editor";
import "./CodeEditor.styles.css";
import { ErrorMarker } from "./ErrorMarker";

type EditorProps = {
  code: string;
  isExecuting: (lineNumber: number) => boolean;
  failure?: Failure;
  onCodeChange: (code: string) => void;
};

const hightlightWithLineNumbers = (
  input: string,
  language: string,
  isExecuting: (lineNumber: number) => boolean,
  failure?: Failure
) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return (highlight(input, language) ?? input).split("\n").map((line: string, i: number) => {
    const currentLine = i + 1;
    return (
      <div key={i} className={clsx({ currentLine: isExecuting(currentLine) })}>
        <span className="editorLineNumber">{currentLine}</span>
        <span dangerouslySetInnerHTML={{ __html: line }} />
        <ErrorMarker failure={failure} currentLine={currentLine} />
        <br />
      </div>
    );
  });
};

export default function CodeEditor({ code, onCodeChange, isExecuting, failure }: EditorProps) {
  return (
    <Editor
      value={code}
      onValueChange={onCodeChange}
      highlight={useCallback(
        (code: string) => hightlightWithLineNumbers(code, languages.nasm, isExecuting, failure),
        [isExecuting, failure]
      )}
      padding={10}
      textareaId="codeArea"
      className="editor"
    />
  );
}

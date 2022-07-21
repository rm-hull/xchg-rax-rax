import { clsx } from "clsx";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-nasm";
import "prismjs/themes/prism-dark.css";
import Editor from "react-simple-code-editor";
import "./styles.css";

type EditorProps = {
  code: string;
  currentLine?: number;
  onCodeChange: (code: string) => void;
};

const hightlightWithLineNumbers = (input: string, language: string, currentLine?: number): JSX.Element =>
  highlight(input, language)
    .split("\n")
    .map((line: string, i: number) => (
      <div key={i} className={clsx({ currentLine: currentLine === i + 1 })}>
        <span className="editorLineNumber">{i + 1}</span>
        <span dangerouslySetInnerHTML={{ __html: line }} />
        <br />
      </div>
    ));

export function CodeEditor({ code, onCodeChange, currentLine }: EditorProps) {
  return (
    <Editor
      value={code}
      onValueChange={onCodeChange}
      highlight={(code) => hightlightWithLineNumbers(code, languages.nasm, currentLine)}
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

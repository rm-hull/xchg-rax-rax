import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-nasm";
import "prismjs/themes/prism-dark.css";
import Editor from "react-simple-code-editor";
import "./styles.css";

type EditorProps = {
  code: string;
  onCodeChange: (code: string) => void;
};

const hightlightWithLineNumbers = (input: string, language: string): string =>
  highlight(input, language)
    .split("\n")
    .map((line: string, i: number) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
    .join("\n");

export function CodeEditor({ code, onCodeChange }: EditorProps) {
  return (
    <Editor
      value={code}
      onValueChange={onCodeChange}
      highlight={(code) => hightlightWithLineNumbers(code, languages.nasm)}
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

import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-nasm";
import "prismjs/themes/prism-dark.css"; //Example style, you can use another
import Editor from "react-simple-code-editor";

type EditorProps = {
  code: string;
  onCodeChange: (code: string) => void;
};

export function CodeEditor({ code, onCodeChange }: EditorProps) {
  return (
    <Editor
      value={code}
      onValueChange={onCodeChange}
      highlight={(code) => highlight(code, languages.nasm)}
      padding={10}
      style={{
        // eslint-disable-next-line quotes
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
      }}
    />
  );
}

import { Failure } from "parsimmon";

type ErrorMarkerProps = {
  failure?: Failure;
  currentLine: number;
};

export function ErrorMarker({ failure, currentLine }: ErrorMarkerProps) {
  if (!failure || failure.index.line !== currentLine) return null;

  const padding = " ".repeat(failure.index.column);
  return (
    <>
      <span className="editorErrorMarker">{padding}</span>
      <span className="editorErrorMessage">Expected: {failure.expected.join(", ")}</span>
    </>
  );
}

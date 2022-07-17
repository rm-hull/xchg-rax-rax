import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAsync } from "react-use";
import { CodeEditor } from "../components/CodeEditor";

export default function Child() {
  const { id } = useParams();
  const [code, setCode] = useState("");
  const state = useAsync(async () => {
    const response = await fetch(`assembly/${id}.nasm`);
    if (response.ok) {
      const result = await response.text();
      setCode(result);
      return result;
    } else {
      throw Error(`Response status: ${response.status}`);
    }
  }, [id, setCode]);

  if (state.loading) {
    return <div>Loading...</div>;
  }

  if (state.error) {
    return <div>Error: {state.error.message}</div>;
  }

  return (
    <div>
      <h3>ID: {id}</h3>
      <CodeEditor code={code} onCodeChange={setCode} />
    </div>
  );
}

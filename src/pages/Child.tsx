import { Container, HStack, IconButton, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import { VscDebugContinue, VscDebugRestart, VscDebugStop } from "react-icons/vsc";
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
    return <Container>Loading...</Container>;
  }

  if (state.error) {
    return <Container>Error: {state.error.message}</Container>;
  }

  return (
    <Container>
      <HStack justifyContent="space-between">
        <h3>ID: {id}</h3>
        <HStack>
          <Tooltip label="Single step" color="white">
            <IconButton variant="outline" icon={<VscDebugContinue />} aria-label="Single step" textColor="green" />
          </Tooltip>
          <Tooltip label="Stop" color="white">
            <IconButton variant="outline" icon={<VscDebugStop />} aria-label="Stop" textColor="red" />
          </Tooltip>
          <Tooltip label="Restart" color="white">
            <IconButton variant="outline" icon={<VscDebugRestart />} aria-label="Restart" textColor="yellow" />
          </Tooltip>
        </HStack>
      </HStack>
      <CodeEditor code={code} onCodeChange={setCode} />
    </Container>
  );
}

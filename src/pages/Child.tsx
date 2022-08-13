import { Container, HStack, IconButton, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import { VscDebugContinue, VscDebugRestart, VscDebugStepOver, VscDebugStop } from "react-icons/vsc";
import { useParams } from "react-router-dom";
import { useAsync } from "react-use";
import { CodeEditor } from "../components/CodeEditor";
import LineNumberRange from "../LineNumberRange";

export default function Child() {
  const { id } = useParams();
  const [code, setCode] = useState("");
  const [instructionPointer, setInstructionPointer] = useState(0);
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

  const handleContinue = () => {
    setInstructionPointer(0);
  };

  const handleSingleStep = () => {
    setInstructionPointer((prev) => (prev < code.split("\n").length ? prev + 1 : 0));
  };

  const handleRestart = () => {
    setInstructionPointer(1);
  };

  const handleStop = () => {
    setInstructionPointer(0);
  };

  return (
    <Container>
      <HStack justifyContent="space-between">
        <h3>ID: {id}</h3>
        <HStack>
          <Tooltip label="Continue" color="white">
            <IconButton
              variant="outline"
              icon={<VscDebugContinue />}
              aria-label="Continue"
              textColor="#86bcf9"
              onClick={handleContinue}
            />
          </Tooltip>
          <Tooltip label="Single step" color="white">
            <IconButton
              variant="outline"
              icon={<VscDebugStepOver />}
              aria-label="Single step"
              textColor="#86bcf9"
              onClick={handleSingleStep}
            />
          </Tooltip>
          <Tooltip label="Stop" color="white">
            <IconButton
              variant="outline"
              icon={<VscDebugStop />}
              aria-label="Stop"
              textColor="#e58c77"
              onClick={handleStop}
              disabled={instructionPointer === 0}
            />
          </Tooltip>
          <Tooltip label="Restart" color="white">
            <IconButton
              variant="outline"
              icon={<VscDebugRestart />}
              aria-label="Restart"
              textColor="#9acf8c"
              onClick={handleRestart}
              disabled={instructionPointer < 2}
            />
          </Tooltip>
        </HStack>
      </HStack>
      <CodeEditor code={code} onCodeChange={setCode} currentLine={new LineNumberRange(instructionPointer)} />
    </Container>
  );
}

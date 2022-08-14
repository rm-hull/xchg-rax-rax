import { Container, HStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useImmer } from "use-immer";
import CodeEditor from "../components/CodeEditor";
import Toolbar from "../components/Toolbar";
import VirtualMachine from "../components/VirtualMachine";
import { useFetchAssembly } from "../hooks/useFetchAssembly";
import { Machine } from "../vm/machine";

const initialVM = new Machine();

export default function Debugger() {
  const { id } = useParams();
  const [vm, update] = useImmer<Machine>(initialVM);

  const handleCodeChange = (sourceCode: string) =>
    update((vm) => {
      vm.code = sourceCode;
    });

  const { loading, error } = useFetchAssembly(id, handleCodeChange);

  if (loading) {
    return (
      <Container>
        <h3>Loading...</h3>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <h3>Error: {error.message}</h3>
      </Container>
    );
  }

  return (
    <Container>
      <HStack justifyContent="space-between">
        <h3>ID: {id}</h3>
        <Toolbar vm={vm} update={update} />
      </HStack>
      <CodeEditor
        code={vm.code}
        onCodeChange={handleCodeChange}
        failure={vm.error}
        currentLine={(lineNumber) => vm.isExecuting(lineNumber)}
      />
      <VirtualMachine vm={vm} />
    </Container>
  );
}

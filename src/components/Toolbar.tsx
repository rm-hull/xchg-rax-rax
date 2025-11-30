import { HStack, IconButton } from "@chakra-ui/react";
import { VscDebugContinue, VscDebugRestart, VscDebugStepOver, VscDebugStop } from "react-icons/vsc";
import { Updater } from "use-immer";
import { Machine } from "../vm/machine";
import { Tooltip } from "./ui/tooltip";

type ToolbarProps = {
  vm: Machine;
  update: Updater<Machine>;
};

export default function Toolbar({ vm, update }: ToolbarProps) {
  const hasError = !!vm.error;

  const handleContinue = () => {
    update((vm) => {
      vm.stop();
    });
  };

  const handleSingleStep = () => {
    update((vm) => {
      vm.step();
    });
  };

  const handleRestart = () => {
    update((vm) => {
      vm.restart();
    });
  };

  const handleStop = () => {
    update((vm) => {
      vm.stop();
    });
  };

  return (
    <HStack gap={0}>
      <Tooltip content="Continue">
        <IconButton fontSize={16} variant="ghost" color="#86bcf9" onClick={handleContinue} disabled={hasError}>
          <VscDebugContinue />
        </IconButton>
      </Tooltip>
      <Tooltip content="Single step">
        <IconButton fontSize={16} variant="ghost" color="#86bcf9" onClick={handleSingleStep} disabled={hasError}>
          <VscDebugStepOver />
        </IconButton>
      </Tooltip>
      <Tooltip content="stop">
        <IconButton
          margin={0}
          p={0}
          size="sm"
          variant="ghost"
          color="#e58c77"
          onClick={handleStop}
          disabled={hasError || vm.ip === 0}
        >
          <VscDebugStop />
        </IconButton>
      </Tooltip>
      <Tooltip content="Restart">
        <IconButton
          fontSize={16}
          variant="ghost"
          color="#9acf8c"
          onClick={handleRestart}
          disabled={hasError || vm.ip < 1}
        >
          <VscDebugRestart />
        </IconButton>
      </Tooltip>
    </HStack>
  );
}

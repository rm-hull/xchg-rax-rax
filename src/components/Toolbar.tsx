import { HStack, IconButton, Tooltip } from "@chakra-ui/react";
import { VscDebugContinue, VscDebugRestart, VscDebugStepOver, VscDebugStop } from "react-icons/vsc";
import { Updater } from "use-immer";
import { Machine } from "../vm/machine";

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
    <HStack spacing={0}>
      <Tooltip label="Continue">
        <IconButton
          fontSize={16}
          variant="ghost"
          icon={<VscDebugContinue />}
          aria-label="Continue"
          textColor="#86bcf9"
          onClick={handleContinue}
          disabled={hasError}
        />
      </Tooltip>
      <Tooltip label="Single step">
        <IconButton
          fontSize={16}
          variant="ghost"
          icon={<VscDebugStepOver />}
          aria-label="Single step"
          textColor="#86bcf9"
          onClick={handleSingleStep}
          disabled={hasError}
        />
      </Tooltip>
      <Tooltip label="Stop">
        <IconButton
          margin={0}
          p={0}
          size="sm"
          variant="ghost"
          icon={<VscDebugStop />}
          aria-label="Stop"
          textColor="#e58c77"
          onClick={handleStop}
          disabled={hasError || vm.ip === 0}
        />
      </Tooltip>
      <Tooltip label="Restart">
        <IconButton
          fontSize={16}
          variant="ghost"
          icon={<VscDebugRestart />}
          aria-label="Restart"
          textColor="#9acf8c"
          onClick={handleRestart}
          disabled={hasError || vm.ip < 1}
        />
      </Tooltip>
    </HStack>
  );
}

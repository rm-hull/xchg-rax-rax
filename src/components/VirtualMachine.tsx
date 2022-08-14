import { Machine } from "../vm/machine";

type VirtualMachineProps = {
  vm: Machine;
};

export default function VirtualMachine({ vm }: VirtualMachineProps) {
  return (
    <div>
      <pre>
        <code>IP: {vm.ip}</code>
      </pre>
    </div>
  );
}

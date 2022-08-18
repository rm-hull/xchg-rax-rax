import { Machine } from "../vm/machine";
import { Register } from "./Register";

type VirtualMachineProps = {
  vm: Machine;
};

export default function VirtualMachine({ vm }: VirtualMachineProps) {
  return (
    <div>
      <pre>
        <code>IP: 0x{vm.ip.toString(16).padStart(16, "0")}</code>
        <Register name="RAX" value={BigInt("0x6533AB020198BAFA")} />
        <Register name="RBX" value={BigInt("0x0")} />
      </pre>
    </div>
  );
}

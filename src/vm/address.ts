import Operand from "./operand";

export default class Address implements Operand {
  readonly name: string;
  readonly address: number;

  constructor(address: number) {
    this.name = `address(${address})`;
    this.address = address;
  }
}

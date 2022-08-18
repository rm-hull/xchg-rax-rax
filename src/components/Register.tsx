type RegisterProps = {
  name: string;
  value: bigint;
};

export function Register({ name, value }: RegisterProps) {
  const parts =
    value
      .toString(16)
      .padStart(16, "0")
      .toUpperCase()
      .match(/(.{8})(.{4})(.{2})(.{2})/)
      ?.slice(1, 5) ?? [];

  return (
    <div>
      {name}:<span style={{ border: "1px solid grey", borderRight: "initial" }}>0x{parts[0]}</span>
      <span style={{ border: "1px solid grey", borderRight: "initial" }}>{parts[1]}</span>
      <span style={{ border: "1px solid grey", borderRight: "initial" }}>{parts[2]}</span>
      <span style={{ border: "1px solid grey" }}>{parts[3]}</span>
    </div>
  );
}

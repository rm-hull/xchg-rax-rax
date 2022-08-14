import { useAsync } from "react-use";

export const useFetchAssembly = <T>(id: T, block?: (value: string) => void) => {
  const state = useAsync(async () => {
    const response = await fetch(`assembly/${id}.nasm`);
    if (response.ok) {
      const code = await response.text();
      block?.(code);
      return code;
    } else {
      throw Error(`Response status: ${response.status}`);
    }
  }, [id]);

  return state;
};

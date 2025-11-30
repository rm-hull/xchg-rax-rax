import { Alert, Code, Container, Heading } from "@chakra-ui/react";
import { FallbackProps } from "react-error-boundary";

export default function ErrorFallback({ error }: FallbackProps) {
  return (
    <Container maxWidth="container.lg">
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Something went wrong:</Alert.Title>
              <Alert.Description>{error.message}</Alert.Description>
            </Alert.Content>
          </Alert.Root>
      <Container m={5}>
        <Heading size="sm">Stack trace</Heading>
        <Code background="none">
          <pre>{error.stack}</pre>
        </Code>
      </Container>
    </Container>
  );
}

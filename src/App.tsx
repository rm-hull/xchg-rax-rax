import { ChakraProvider } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import Debugger from "./pages/Debugger";

// const theme = extendTheme(withDefaultColorScheme({ colorScheme: "red" }));

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route
          path="/about"
          element={
            <div>
              <h3>About page</h3>
            </div>
          }
        />
        <Route path="/" element={<Navigate to="/0x00" replace />} />
        <Route path="/:id" element={<Debugger />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;

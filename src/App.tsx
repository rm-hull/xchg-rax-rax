import { ChakraProvider } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import Child from "./pages/Child";

const theme = {
  style: {
    global: {},
  },
};

function App() {
  return (
    <ChakraProvider theme={theme}>
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
        <Route path="/:id" element={<Child />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;

import { Navigate, Route, Routes } from "react-router-dom";
import Child from "./pages/Child";

function App() {
  return (
    <Routes>
      <Route
        path="/about"
        element={
          <div>
            <h3>About page</h3>
          </div>
        }
      />
      <Route path="/" element={<Navigate to="/0x01" replace />} />
      <Route path="/:id" element={<Child />} />
    </Routes>
  );
}

export default App;

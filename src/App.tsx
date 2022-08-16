import { Navigate, Route, Routes } from "react-router-dom";
import Debugger from "./pages/Debugger";

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
      <Route path="/" element={<Navigate to="/0x00" replace />} />
      <Route path="/:id" element={<Debugger />} />
    </Routes>
  );
}

export default App;

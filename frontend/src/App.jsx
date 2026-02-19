import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Analytics from "./pages/Analytics";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </div>
  );
};

export default App;

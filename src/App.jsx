import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomeContent from "./components/HomeContent"; // Hero, About, etc.
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home route with shared header/footer */}
        <Route
          path="/"
          element={
            <Layout>
              <HomeContent />  {/* Hero, About, Services, etc. */}
            </Layout>
          }
        />

        {/* Login/Register standalone pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

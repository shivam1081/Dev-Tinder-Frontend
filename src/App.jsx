import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pageComponents/Login";
import Body from "./pageComponents/Body";
import Profile from "./pageComponents/Profile";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pageComponents/Login";
import Body from "./pageComponents/Body";
import Profile from "./pageComponents/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./pageComponents/Feed";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;

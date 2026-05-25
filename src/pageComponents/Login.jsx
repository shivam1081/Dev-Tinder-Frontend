import { useState } from "react";
import axios from "axios";
const Login = () => {
  const [emailId, setEmailId] = useState("aditya@gmail.com");
  const [password, setPassword] = useState("Aditya@1801");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        },
      );
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="flex justify-center items-center my-10">
      <div className="card card-border bg-base-300 w-96 shadow-xlßß">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email Id</legend>
              <input
                type="text"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="input"
              />
            </fieldset>
          </div>

          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="input"
              />
            </fieldset>
          </div>

          <div className="card-actions justify-center">
            <button onClick={handleLogin} className="btn btn-primary my-2">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

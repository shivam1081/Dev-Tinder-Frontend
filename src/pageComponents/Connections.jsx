import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addConnectionData } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  // Get Connetions List
  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnectionData(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchConnection();
    console.log("Connections: ", connections);
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-4 flex justify-center my-10">
        Your Connections {`(${connections?.length})`}
      </h1>
      <div className="flex flex-col items-center gap-6">
        {connections?.length > 0 &&
          connections.map((connection) => (
            <div
              key={connection?._id}
              className="card card-dash bg-base-100 w-full max-w-3xl mx-auto my-4 flex-row items-center gap-6 p-4 shadow-xl"
            >
              <img
                className="rounded-full w-32 h-32 object-cover"
                alt="photo"
                src={connection?.photoUrl}
              />
              <div className="card-body p-0 flex-1">
                <h2 className="card-title">
                  {connection?.firstName} {connection?.lastName}
                </h2>
                <p>{`${connection?.age} years old | Gender: ${connection?.gender} `}</p>
                <p>{connection?.about}</p>
              </div>
              <div className="flex items-center">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Connections;

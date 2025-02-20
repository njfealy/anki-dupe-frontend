import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [user, setUser] = useState({
    picture: "",
    decks: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    if (userId == auth._id) navigate("/library");
    const userFetcher = async () => {
      const response = await fetch("http://localhost:3000/user/" + userId);
      const resData = await response.json();
      setUser(resData);
    };
    if (loading) userFetcher();
    setLoading(false);
  }, [loading]);

  return (
    <div>
      {!loading && (
        <>
          <div className="flex flex-col items-center mt-10">
            <div className="flex flex-col w-[50rem]">
              <div className="flex items-end gap-3 my-3 p-3 bg-gray-300 rounded-2xl">
                <img src={user.picture} className="rounded-xl size-14" />
                <div className="text-3xl font-semibold text-gray-600 inline">
                  {user.username}
                </div>
              </div>
              <div className="text-xl text-gray-700 font-semibold">Decks</div>
              <div className="bg-gray-300 rounded-2xl p-3 flex">
                <ul className="flex">
                  {user.decks.map((deck) => {
                    return (
                      <li key={deck._id}>
                        <div className="bg-white flex flex-col p-3 rounded-xl">
                          <div>{deck.name}</div>
                          <div>
                            {deck.size} card{deck.size != 1 && "s"}
                          </div>
                          <button>View</button>
                          <button className="bg-blue-600 text-white font-semibold">
                            Add to Library
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserPage;

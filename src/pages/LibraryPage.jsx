import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import plus from "../assets/plus.png";

const LibraryPage = () => {
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addMenu, setAddMenu] = useState(false);
  const [newDeckName, setNewDeckName] = useState("");
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.isAuth) navigate("/");
    const fetchDecks = async () => {
      console.log(auth);
      const response = await fetch(
        "http://localhost:3000/user/" + auth._id + "/decks",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const resData = await response.json();
        console.log(resData)
        setLibrary(resData.decks);
      }
    };

    if (loading) fetchDecks();
    setLoading(false);
  }, [loading, auth, navigate]);

  const createDeckHandler = async () => {
    if (auth.isAuth) {
      const body = JSON.stringify({ userId: auth.userId, name: newDeckName });
      const response = await fetch("http://localhost:3000/deck/", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      });
      const resData = await response.json();
      setNewDeckName("");
      setAddMenu(false);
      setLoading(true);
    }
  };

  const addMenuHandler = () => {
    if (!addMenu) {
      return setAddMenu(true);
    }
    console.log("creating new deck");
    createDeckHandler();
  };

  const cancelAddHandler = () => {
    setAddMenu(false);
  };

  const newDeckNameChangeHandler = (event) => {
    setNewDeckName(event.target.value);
  };

  return (
    <>
      <div className="px-24 py-8">
        <div className="flex justify-between items-center py-2">
          <h1 className="text-2xl font-semibold text-gray-700">Library</h1>
          <div className="flex items-center gap-1">
            {addMenu && (
              <div>
                <input
                  placeholder="Enter deck name:"
                  onChange={newDeckNameChangeHandler}
                  className="px-2 mr-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                ></input>
                <button
                  onClick={cancelAddHandler}
                  className="bg-gray-300 px-2 rounded-md text-gray-600 font-semibold hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            )}
            <button
              onClick={addMenuHandler}
              className="flex bg-blue-600 p-1 rounded-md size-6 hover:bg-violet-700 duration-200"
            >
              <img src={plus} className="size-4 invert" />
            </button>
          </div>
        </div>
        <div className="bg-gray-300 rounded-xl p-5 min-h-[60vh]">
          <ul className="flex">
            {library.map((deck) => {
              return (
                <li key={deck._id} className="bg-white p-3 rounded-lg m-1">
                  <div className="flex flex-col">
                    <h2 className="text-gray-700 text-lg font-semibold">
                      {deck.name}
                    </h2>
                    <p className="text-gray-500 text-lg">
                      {deck.size} card{deck.size != 1 && "s"}
                    </p>
                    <p>{`${deck.new_today} card${deck.new_today != 1 && `s`} to learn`}</p>
                    <p>{`${deck.review_size} card${deck.review_size != 1 && `s`} to review`}</p>
                    <Link
                      to={"/study/" + deck._id}
                      className="rounded-lg px-4 py-2 mb-1 font-semibold text-white bg-blue-700 transition hover:bg-violet-700 hover:duration-200"
                    >
                      Study
                    </Link>
                    <Link
                      to={"/decks/" + deck._id}
                      className="rounded-lg px-4 py-2 mb-1 font-semibold text-gray-400 bg-gray-200 text-center transition hover:bg-gray-300 hover:duration-200"
                    >
                      Edit
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default LibraryPage;

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import plus from "../assets/plus.png";
import load from "../assets/loading.png";

const LibraryPage = () => {
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addMenu, setAddMenu] = useState(false);
  const [newDeckName, setNewDeckName] = useState("");
  const [nameValid, setNameValid] = useState(false);
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
        console.log(resData);
        setLibrary(resData.decks);
      }
      setLoading(false);
    };

    if (loading) fetchDecks();
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
    setNameValid(false)
  };

  const newDeckNameChangeHandler = (event) => {
    setNewDeckName(event.target.value);
    if (event.target.value.length > 0) return setNameValid(true);
    return setNameValid(false);
  };

  return (
    <>
      <div className="pt-24 w-[1000px] justify-self-center">
        <div className="flex justify-between items-center py-2">
          <h1 className="text-4xl font-semibold text-gray-800">Library</h1>
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
                  className="px-2 mr-1 bg-gray-300 rounded-md text-gray-600 font-semibold hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  className={
                    "px-2 rounded-md font-semibold " +
                    (nameValid
                      ? " text-white bg-blue-700 "
                      : " text-gray-400 bg-white border-[1px] border-gray-300")
                  }
                >
                  Create
                </button>
              </div>
            )}
            {!addMenu && <button
              onClick={addMenuHandler}
              className="flex bg-blue-600 p-1 rounded-md size-6 hover:bg-violet-700 duration-200"
            >
              <img src={plus} className="size-4 invert" />
            </button>}
          </div>
        </div>
        <div className="bg-gray-300 flex flex-col rounded-xl p-5 min-h-[60vh]">
          {loading && (
            <div className="flex w-96 h-96 justify-center m-auto flex-col items-center">
              <img src={load} className="size-24 animate-spin opacity-15" />
              <div className="text-gray-700">Loading...</div>
            </div>
          )}
          <ul className="flex flex-wrap">
            {library.map((deck) => {
              return (
                <li key={deck._id} className="bg-white p-3 rounded-lg m-1">
                  <div className="flex flex-col">
                    <h2 className="text-gray-700 text-xl font-semibold w-40 truncate">
                      {deck.name}
                    </h2>
                    <p className="text-gray-500">
                      {deck.size} card{deck.size != 1 && "s"}
                    </p>
                    <hr />
                    <p className="text-green-600 font-semibold">{`${
                      deck.new_today
                    } card${deck.new_today != 1 ? `s` : ""} to learn`}</p>
                    <p className="text-red-400 font-semibold">{`${
                      deck.review_size
                    } card${deck.review_size != 1 ? `s` : ""} to review`}</p>
                    <div className="h-3"></div>
                    <Link
                      to={"/study/" + deck._id}
                      className="rounded-lg px-4 py-2 mb-1 font-semibold text-white bg-blue-700 text-center transition hover:bg-violet-700 hover:duration-200"
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
          {!loading && library.length == 0 && (
            <div className="text-center m-auto">
              <p className="text-2xl text-gray-800">You have no decks!</p>
              <p className="text-lg text-gray-700">
                Click the plus sign to create a deck.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LibraryPage;

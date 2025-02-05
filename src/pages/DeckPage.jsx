import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import DeleteDeckModal from "../components/DeleteDeckModal";

import plus from "../assets/plus.png";
import load from "../assets/loading.png";

const DeckPage = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [deck, setDeck] = useState({});
  const [addMenu, setAddMenu] = useState(false);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [actionMenu, setActionMenu] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const dialog = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeck = async () => {
      const response = await fetch(
        "http://localhost:3000/decks/deck/" + params.deckId
      );
      const resData = await response.json();
      setDeck(resData.deck);
      setLoading(false);
    };
    if (loading) fetchDeck();
  }, [loading]);

  const deleteDeckHandler = async () => {
    const response = await fetch(
      "http://localhost:3000/decks/deck/" + params.deckId + "/delete",
      {
        method: "DELETE",
      }
    );
    const resData = await response.json();
    console.log(resData);
    navigate("/decks")
  };

  const addCardHandler = async () => {
    const body = JSON.stringify({ front, back });
    console.log(body);
    const response = await fetch(
      `http://localhost:3000/decks/deck/${params.deckId}/createCard`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      }
    );
    const resData = await response.json();
    console.log(resData);
    setFront("");
    setBack("");
    setAddMenu(false);
    setLoading(true);
  };

  const deleteCardHandler = async (cardId) => {
    const body = JSON.stringify({ cardId });
    const response = await fetch(
      `http://localhost:3000/decks/deck/${params.deckId}/deleteCard`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      }
    );
    const resData = await response.json();
    console.log(resData);
    setLoading(true);
  };

  const addMenuHandler = () => {
    setAddMenu(true);
  };

  const cancelAddHandler = () => {
    setAddMenu(false);
  };

  const frontChangeHandler = (event) => {
    setFront(event.target.value);
    console.log(front)
  };

  const backChangeHandler = (event) => {
    setBack(event.target.value);
    console.log(back)
  };

  const showActionMenuHandler = (event) => {
    event.stopPropagation();
    setActionMenu((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    const menu = document.getElementById("action-menu");
    if (menu && !menu.contains(event.target)) {
      setActionMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const deleteModalHandler = () => {
    if (dialog.current) {
      dialog.current.showModal();
      setDeleteModal(true);
    }
  };

  const cancelModalHandler = () => {
    setActionMenu(false);
    setDeleteModal(false);
  };

  return (
    <>
      <DeleteDeckModal
        id="dialog"
        ref={dialog}
        onConfirm={deleteDeckHandler}
        onCancel={cancelModalHandler}
      />
      <div className="flex flex-col px-24 py-8">
        <div className="flex justify-between items-center my-2">
          <div className="flex items-end gap-3">
            <h1 className="text-3xl font-semibold text-gray-700">
              {loading ? "Loading..." : deck.name}
            </h1>
            <h2 className="text-gray-600">
              {deck.size ? deck.size : 0} card{deck.size != 1 && "s"}
            </h2>
          </div>

          <div className="flex gap-1">
            {!addMenu && (
              <button
                onClick={addMenuHandler}
                className="flex bg-blue-600 p-1 rounded-md size-6 hover:bg-violet-700 duration-200"
              >
                <img src={plus} className="size-4 invert" />
              </button>
            )}
            <button
              onClick={showActionMenuHandler}
              className="bg-white size-6 rounded-md font-semibold text-gray-700 hover:bg-gray-300 transition duration-200"
            >
              ...
            </button>
            {actionMenu && (
              <div
                id="action-menu"
                onClick={(event) => event.stopPropagation()}
                className="absolute right-5 bg-white rounded-lg"
              >
                <ul className="py-3">
                  <li>
                    <button
                      onClick={deleteModalHandler}
                      className="w-full font-semibold text-red-500 hover:bg-red-500 hover:text-white px-3 transition duration-200"
                    >
                      Delete
                    </button>
                  </li>
                  <li>
                    <button className="w-full font-semibold text-gray-500 hover:bg-gray-300 transition duration-200">
                      Settings
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {addMenu && (
          <div className="flex justify-between bg-white rounded-xl p-3 h-32">
            <div className="flex flex-1 justify-center">
              <textarea
                placeholder="Front text"
                onChange={frontChangeHandler}
                className="flex-1 px-3 text-gray-700 font-semibold focus:outline-none"
              ></textarea>
              <div className="bg-gray-200 w-[3px] rounded-xl"></div>
              <textarea
                placeholder="Back text"
                onChange={backChangeHandler}
                className="flex-1 px-3 text-gray-700 font-semibold focus:outline-none"
              ></textarea>
            </div>
            <div className="flex flex-col justify-end p-2 space-y-1">
              <button
                onClick={addCardHandler}
                className="bg-blue-600 text-white font-semibold px-2 rounded-lg hover:bg-violet-700 duration-200"
              >
                Add
              </button>
              <button
                onClick={cancelAddHandler}
                className="bg-gray-300 text-gray-600 font-semibold px-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div
          className={`${
            deck.size == 0 && "flex justify-center items-center"
          } bg-gray-300 rounded-xl p-5 min-h-[60vh]`}
        >
          {!loading ? (
            <ul>
              {deck.size > 0 ? (
                <div className="flex flex-col gap-1 ">
                  {deck.cards.map((card) => {
                    return (
                      <li
                        key={card._id}
                        className="flex justify-between bg-white rounded-xl p-3 h-32"
                      >
                        <div className="flex flex-1 justify-center">
                          <div className="flex-1 px-3 text-gray-700 font-semibold">
                            {card.front}
                          </div>
                          <div className="bg-gray-200 w-[3px] rounded-xl"></div>
                          <div className="flex-1 px-3 text-gray-700 font-semibold">
                            {card.back}
                          </div>
                        </div>

                        <div className="flex flex-col justify-end p-2 space-y-1">
                          <button className="bg-gray-300 text-gray-600 font-semibold px-2 rounded-lg hover:bg-gray-400 transition duration-200">
                            Edit
                          </button>
                          <button
                            onClick={() => deleteCardHandler(card._id)}
                            className="bg-red-500 text-white font-semibold px-2 rounded-lg hover:bg-red-700 transition duration-200"
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </div>
              ) : (
                <div className="text-lg text-gray-500">This deck is empty.</div>
              )}
            </ul>
          ) : (
            <div className="flex size-full flex-col items-center">
              <img src={load} className="size-24 animate-spin opacity-15" />
              <div className="text-gray-700">Loading...</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DeckPage;

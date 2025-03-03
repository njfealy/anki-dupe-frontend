import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import DeleteDeckModal from "../components/DeleteDeckModal";
import Card from "../components/Card";

import plus from "../assets/plus.png";
import load from "../assets/loading.png";

const DeckPage = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [deck, setDeck] = useState({});
  const [deckName, setDeckName] = useState("");
  const [addMenu, setAddMenu] = useState(false);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [renaming, setRenaming] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [actionMenu, setActionMenu] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const dialog = useRef(null);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(auth);
    console.log(deck);
    const fetchDeck = async () => {
      const response = await fetch(
        "http://localhost:3000/deck/" + params.deckId
      );
      const resData = await response.json();
      setDeck(resData.deck);
      setDeckName(resData.deck.name);
      setLoading(false);
    };
    if (loading) fetchDeck();
  }, [loading]);

  const deleteDeckHandler = async () => {
    const response = await fetch(
      "http://localhost:3000/deck/" + params.deckId,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    //if (response.ok) {
    const resData = await response.json();
    console.log(resData);
    navigate("/library");
    //}
  };

  const addCardHandler = async () => {
    const body = JSON.stringify({ front, back });
    console.log(body);
    const response = await fetch(
      `http://localhost:3000/deck/${params.deckId}/card`,
      {
        method: "POST",
        credentials: "include",
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
    console.log(params.deckId, cardId);
    const response = await fetch(
      `http://localhost:3000/deck/${params.deckId}/cards/${cardId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    const resData = await response.json();
    console.log(resData);
    setLoading(true);
  };

  const editCardHandler = async (newCard) => {
    console.log(newCard);
    const body = JSON.stringify({
      newFront: newCard.newFront,
      newBack: newCard.newBack,
    });
    const response = await fetch(
      `http://localhost:3000/deck/${newCard.deckId}/cards/${newCard.cardId}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      }
    );
  };

  const addMenuHandler = () => {
    setAddMenu(true);
  };

  const cancelAddHandler = () => {
    setAddMenu(false);
  };

  const frontChangeHandler = (event) => {
    setFront(event.target.value);
    console.log(front);
  };

  const backChangeHandler = (event) => {
    setBack(event.target.value);
    console.log(back);
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

  const renameHandler = () => {
    setDeckName(deck.name);
    setRenaming(true);
    setNameValid(true)
  };

  const changeNameHandler = (event) => {
    console.log(event.target.value)
    setDeckName(event.target.value);
    if (event.target.value.length > 0) return setNameValid(true);
    console.log("not valid")
    return setNameValid(false);
  };

  const submitRenameHandler = () => {
    if(!nameValid) return;
    const body = JSON.stringify({
      newName: deckName,
    });
    const response = fetch("http://localhost:3000/deck/" + params.deckId, {
      method: "PATCH",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    });
    setRenaming(false);
    setLoading(true);
  };

  const cancelRenameHandler = () => {
    setRenaming(false);
  };

  return (
    <>
      <DeleteDeckModal
        id="dialog"
        ref={dialog}
        onConfirm={deleteDeckHandler}
        onCancel={cancelModalHandler}
      />
      <div className="flex flex-col pt-24 w-[1000px] justify-self-center">
        <div className="flex justify-between items-center my-2">
          <div className="flex ">
            <div className="flex items-end gap-3 ">
              {!renaming ? (
                <h1 className="text-3xl font-semibold text-gray-700">
                  {loading ? "Loading..." : deck.name}
                </h1>
              ) : (
                <div className="flex gap-1 pr-3">
                  <input
                    value={deckName}
                    onChange={changeNameHandler}
                    spellCheck="false"
                    className="text-3xl border-none focus:outline-none px-3 rounded-lg text-gray-800 font-semibold"
                  />
                  <button
                    onClick={submitRenameHandler}
                    className={"px-2  font-semibold rounded-md  duration-200 "+(nameValid ? "bg-blue-600 text-white hover:bg-violet-700" : "bg-white text-gray-300")}
                    disabled={!nameValid}
                  >
                    Rename
                  </button>
                  <button
                    onClick={cancelRenameHandler}
                    className="bg-gray-300 px-2 text-white font-semibold rounded-md hover:bg-gray-400 duration-200"
                  >
                    Cancel
                  </button>
                </div>
              )}
              <h2 className="text-gray-600">
                {deck.size ? deck.size : 0} card{deck.size != 1 && "s"}
              </h2>
            </div>
          </div>

          <div className="flex gap-1">
            {!loading && (
              <>
                {deck.creator._id === auth._id ? (
                  <>
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
                        className="absolute translate-x-14 bg-white rounded-lg"
                      >
                        <ul className="py-3">
                          <li>
                            <button
                              onClick={renameHandler}
                              className="w-full font-semibold text-gray-500 hover:bg-gray-300 transition duration-200"
                            >
                              Rename
                            </button>
                          </li>
                          {/* <li>
                            <button className="w-full font-semibold text-gray-500 hover:bg-gray-300 transition duration-200">
                              Settings
                            </button>
                          </li> */}
                          <li>
                            <button
                              onClick={deleteModalHandler}
                              className="w-full font-semibold text-red-500 hover:bg-red-500 hover:text-white px-3 transition duration-200"
                            >
                              Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={"/user/" + deck.creator._id}
                    className="flex gap-2 items-end bg-gray-300 p-2 rounded-xl"
                  >
                    <img
                      src={deck.creator.picture}
                      className="size-6 rounded-2xl"
                    />
                    <div className="font-semibold text-gray-600">
                      {deck.creator.username}
                    </div>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>

        {addMenu && (
          <div className={`flex justify-between bg-white rounded-xl p-3 h-32`}>
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
                        <Card
                          card={card}
                          deck={deck}
                          auth={auth}
                          onEdit={editCardHandler}
                        />
                      </li>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-2xl text-gray-800">This deck is empty.</p>
                  <p className="text-lg text-gray-700">
                    Click the plus sign to add a card.
                  </p>
                </div>
              )}
            </ul>
          ) : (
            <div className="flex h-96 flex-col items-center justify-center">
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

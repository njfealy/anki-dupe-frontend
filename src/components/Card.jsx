import { useState, useEffect } from "react";

const Card = (props) => {
  const [editing, setEditing] = useState(false);
  const [front, setFront] = useState(props.card.front);
  const [back, setBack] = useState(props.card.back);

  const setEditingHandler = () => {
    if (!editing) {
      setFront(props.card.front);
      setFront;
      return setEditing(true);
    }

    return submitEditHandler();
  };

  const changeFrontHandler = (event) => {
    setFront(event.target.value);
  };

  const changeBackHandler = (event) => {
    setBack(event.target.value);
  };

  const submitEditHandler = () => {
    props.onEdit({
      newFront: front,
      newBack: back,
      cardId: props.card._id,
      deckId: props.card.deck,
    });
    setEditing(false);
  };

  const handleClickOutside = (event) => {
    const menu = document.getElementById(props.card._id);
    if (menu && !menu.contains(event.target)) {
      setEditing(false);
      setFront(props.card.front);
      setBack(props.card.back);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div id={props.card._id} className="flex w-full">
      <div className="flex flex-1 justify-center">
        {!editing ? (
          <div className="flex-1 px-3 text-gray-700 font-semibold">{front}</div>
        ) : (
          <div className="w-[415px] pr-3">
            <textarea
              onChange={changeFrontHandler}
              value={front}
              className="resize-none size-full rounded-lg px-3 text-gray-700 font-semibold focus:outline-none ring-2 ring-gray-300 focus:ring-blue-300 transition"
            ></textarea>
          </div>
        )}

        <div className="bg-gray-200 w-[3px] rounded-xl"></div>

        {!editing ? (
          <div className="flex-1 px-6 text-gray-700 font-semibold">{back}</div>
        ) : (
          <div className="w-[439px] px-3">
            <textarea
              onChange={changeBackHandler}
              value={back}
              className="resize-none size-full rounded-lg pl-3 pr-3 mr-3 text-gray-700 font-semibold focus:outline-none ring-2 ring-gray-300 focus:ring-blue-300 transition"
            ></textarea>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-end p-2 space-y-1">
        {props.deck.creator._id == props.auth._id && (
          <>
            <button
              onClick={setEditingHandler}
              className="bg-gray-300 text-gray-600 font-semibold px-2 rounded-lg hover:bg-gray-400 transition duration-200"
            >
              {editing ? "Save" : "Edit"}
            </button>
            <button
              onClick={() => deleteCardHandler(card._id)}
              className="bg-red-500 text-white font-semibold px-2 rounded-lg hover:bg-red-700 transition duration-200"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;

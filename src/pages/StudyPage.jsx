import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import load from "../assets/loading.png";
import { Link } from "react-router-dom";

const StudyPage = () => {
  const [loading, setLoading] = useState(true);
  const [study, setStudy] = useState([]);
  const [currentCard, setCurrentCard] = useState(-1);
  const [flipped, setFlipped] = useState(false);
  const params = useParams();

  useEffect(() => {
    const studyFetcher = async () => {
      console.log("Fetching study");
      const getResponse = await fetch(
        "http://localhost:3000/deck/" + params.deckId + "/study",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const resData = await getResponse.json();
      if (getResponse.ok) {
        console.log(resData);
        setStudy(resData.study_cards);
        setCurrentCard(0);
      } else {
        console.log("Unknown error occurred!");
      }
      setLoading(false);
    };

    if (loading) studyFetcher();
  }, [loading]);

  const flipHandler = () => {
    setFlipped(true);
  };

  console.log(currentCard);
  console.log(study.length);

  const gradeCardHandler = async (grade) => {
    const body = JSON.stringify({
      grade,
    });
    const response = await fetch(
      "http://localhost:3000/deck/" +
        params.deckId +
        "/study/" +
        study[currentCard].card._id,
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
    const resData = await response.json();
    console.log(resData);
    setFlipped(false);
    setCurrentCard((prevState) => {
      return prevState + 1;
    });
  };

  const printCardHandler = () => {
    console.log(study[currentCard]);
  };

  return (
    <>
      <div className="flex justify-center size-full">
        {loading && (
          <div className="flex w-96 h-96 justify-center flex-col items-center">
            <img src={load} className="size-24 animate-spin opacity-15" />
            <div className="text-gray-700">Loading...</div>
          </div>
        )}

        {!loading && currentCard < study.length && (
          <div className="flex flex-col py-10">
            <div className="font-semibold text-xl text-gray-700 py-3">
              {currentCard + 1} / {study.length}
            </div>
            <div className="bg-white  mb-5 p-3 w-[42rem] h-[24rem] rounded-2xl text-center flex flex-col">
              <div className="flex justify-center items-center min-h-[11rem]">
                <div className="font-semibold text-lg text-gray-800">
                  {study[currentCard]?.card?.front}
                </div>
              </div>
              <hr className="border-[2px] border-gray-300 rounded-full" />

              <div className="flex justify-center items-center min-h-[11rem]">
                {flipped && (
                  <div className="font-semibold text-lg text-gray-800">
                    {study[currentCard]?.card?.back}
                  </div>
                )}
              </div>
            </div>

            {!flipped ? (
              <button
                onClick={flipHandler}
                className="bg-gray-300 p-3 rounded-xl font-semibold text-gray-700 hover:bg-gray-400 hover:text-white transition"
              >
                Show Answer
              </button>
            ) : (
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => gradeCardHandler(1)}
                  className="bg-red-500 p-3 rounded-xl font-semibold text-white hover:bg-red-600 transition"
                >
                  Again
                </button>
                <button
                  onClick={() => gradeCardHandler(2)}
                  className="bg-gray-300 p-3 rounded-xl font-semibold text-gray-500 hover:bg-gray-400 hover:text-white transition"
                >
                  Hard
                </button>
                <button
                  onClick={() => gradeCardHandler(3)}
                  className="bg-gray-300 p-3 rounded-xl font-semibold text-gray-500 hover:bg-gray-400 hover:text-white transition"
                >
                  Good
                </button>
                <button
                  onClick={() => gradeCardHandler(4)}
                  className="bg-gray-300 p-3 rounded-xl font-semibold text-gray-500 hover:bg-gray-400 hover:text-white transition"
                >
                  Easy
                </button>
              </div>
            )}
            <div></div>
          </div>
        )}

        {!loading && currentCard == study.length && (
          <div className="w-full h-96 flex flex-col items-center justify-center">
            <div className="text-3xl text-gray-700 font-semibold m-5">You completed your study!</div>
            <Link to="/library" className="bg-gray-300 p-2 font-semibold text-white rounded-xl hover:bg-gray-400 transition">Click here to go back to your Library</Link>
          </div>
        )}
      </div>
    </>
  );
};

export default StudyPage;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const StudyPage = () => {
  const [loading, setLoading] = useState(true);
  const [study, setStudy] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
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
        console.log(resData)
        return setStudy(resData.study_cards);
      }

      console.log("Unknown error occurred!");
    };

    if (loading) studyFetcher();
    setLoading(false);
  }, [loading]);

  const flipHandler = () => {
    setFlipped(true);
  };

  const gradeCardHandler = async (grade) => {
    console.log(
      "http://localhost:3000/deck/" +
        params.deckId +
        "/study/" +
        study[currentCard].card._id
    );
    const response = await fetch(
      "http://localhost:3000/deck/" +
        params.deckId +
        "/study/" +
        study[currentCard].card._id,
      {
        method: "PATCH",
        credentials: "include",
      }
    );
    const resData = await response.json();
    console.log(resData);
  };

  return (
    <>
      <div className="flex justify-center">
        <h1>{loading && "Loading..."}</h1>
        {!loading && (
          <div className="flex flex-col">
            <div className="bg-white mt-10 mb-5 p-3 w-[42rem] h-[24rem] rounded-2xl text-center flex flex-col">
              <div className="flex justify-center items-center min-h-[11rem]">
                <div className="font-semibold text-lg text-gray-800">
                  {study[currentCard]?.card?.front}
                </div>
              </div>
              <hr className="border-[2px] border-gray-300 rounded-full" />

              <div className="flex justify-center items-center min-h-[11rem]">
                <div className="font-semibold text-lg text-gray-800">
                  {study[currentCard]?.card?.back}
                </div>
              </div>
            </div>

            {!flipped ? (
              <button
                onClick={flipHandler}
                className="bg-gray-300 p-3 rounded-xl"
              >
                Show Answer
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => gradeCardHandler(1)}
                  className="bg-gray-300 p-3 rounded-xl"
                >
                  Again
                </button>
                <button
                  onClick={() => gradeCardHandler(2)}
                  className="bg-gray-300 p-3 rounded-xl"
                >
                  Hard
                </button>
                <button
                  onClick={() => gradeCardHandler(3)}
                  className="bg-gray-300 p-3 rounded-xl"
                >
                  Medium
                </button>
                <button
                  onClick={() => gradeCardHandler(4)}
                  className="bg-gray-300 p-3 rounded-xl"
                >
                  Hard
                </button>
              </div>
            )}
            <div></div>
          </div>
        )}
      </div>
    </>
  );
};

export default StudyPage;

import { Link } from "react-router-dom";

const Deck = (props) => {
  return (
    <Link to={"/study/"+props.id}>
      <div
        className="group bg-white rounded-xl pb-1 transition transform duration-300 
      hover:bg-gradient-to-t hover:from-gray-400 hover:via-white hover:via-10% hover:to-white
      hover:-translate-y-1"
      >
        <div className="bg-white rounded-xl p-3">
          <h1 className="font-semibold text-xl text-gray-700">{props.name}</h1>
          <h2 className="font-semibold text-gray-500">{props.size} cards</h2>
        </div>
      </div>
    </Link>
  );
};

export default Deck;

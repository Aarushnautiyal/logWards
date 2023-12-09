import { useState } from "react";
import CommentCreationBox from "./components/CommentCreationBox";
import Comments from "./components/Comments";

const App = () => {
  const [valueAdded, setValueAdded] = useState(true);
  const data = JSON.parse(localStorage.getItem("commentsData"));
  console.log("mailer data", data);
  return (
    <div className="container">
      <CommentCreationBox  setValueAdded={setValueAdded}/>
      {data&&data.map((ele, i) => (
        <Comments key={i} data={ele} parent={i} setValueAdded={setValueAdded}/>
      ))}
    </div>
  );
};

export default App;

import { useEffect, useRef, useState } from "react";
import CommentCreationBox from "./components/CommentCreationBox";
import Comments from "./components/Comments";

const App = () => {
  const [valueAdded, setValueAdded] = useState(true);
  const [sort, setSort] = useState(false);
  let data = useRef(JSON.parse(localStorage.getItem("commentsData")));
  useEffect(() => {
    if (sort) {
      data.current = data.current.sort(function (a, b) {
        return new Date(b.time) - new Date(a.time);
      });
    } else {
      data.current = data.current.sort(function (a, b) {
        return new Date(a.time) - new Date(b.time);
      });
    }
    setValueAdded((prev) => !prev);
    console.log("mailer data",data);
  }, [sort]);
  return (
    <div className="container">
      <CommentCreationBox setValueAdded={setValueAdded} />
      <div onClick={() => setSort((prev) => !prev)}>sort</div>
      {data.current &&
        data.current.map((ele, i) => (
          <Comments
            key={i}
            data={ele}
            parent={i}
            setValueAdded={setValueAdded}
          />
        ))}
    </div>
  );
};

export default App;

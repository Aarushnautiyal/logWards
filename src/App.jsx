import { useEffect, useRef, useState } from "react";
import CommentCreationBox from "./components/CommentCreationBox";
import Comments from "./components/Comments";

const App = () => {
  const [valueAdded, setValueAdded] = useState(true);
  const [sort, setSort] = useState(false);
  const localStorageData = JSON.parse(localStorage.getItem("commentsData"))||{}
  const [data,setData]=useState(localStorageData);
  useEffect(() => {
    let localdata={}
    if(!data)return
    if (sort) {
       localdata= data.sort(function (a, b) {
        return new Date(b.time) - new Date(a.time);
      });
      setData(localdata)
    } else {
      localdata= data.sort(function (a, b) {
        return new Date(a.time) - new Date(b.time);
      });
      setData(localdata)
    }
    console.log("mailer data",data);
  }, [sort,data]);
  return (
    <div className="container">
      <CommentCreationBox setData={setData} />
      <div onClick={() => setSort((prev) => !prev)}>sort</div>
      {data &&
        data.map((ele, i) => (
          <Comments
            key={i}
            data={ele}
            parent={i}
            setData={setData}
          />
        ))}
    </div>
  );
};

export default App;

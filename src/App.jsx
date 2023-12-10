import { useEffect, useState } from "react";
import CommentCreationBox from "./components/CommentCreationBox";
import Comments from "./components/Comments";
import styles from "./components/comment.module.scss"

const App = () => {
  const [sort, setSort] = useState(false);
  const localStorageData = JSON.parse(localStorage.getItem("commentsData"))||{}
  const [data,setData]=useState(localStorageData);
  useEffect(() => {
    let localdata={}
    if(!data)return
    if (!sort) {
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
  }, [sort,data]);
  return (
    <div className="container">
      <CommentCreationBox setData={setData} />
      <br />
      {sort?
      <div className={styles.sortByClass} onClick={() => setSort((prev) => !prev)}>Sort By: Date and Time &uarr;</div>:
      <div className={styles.sortByClass} onClick={() => setSort((prev) => !prev)}>Sort By: Date and Time &darr;</div>}
      <br />
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

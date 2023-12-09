import CommentCreationBox from "./components/CommentCreationBox";
import Comments from "./components/Comments";

const App = () => {
  const data = localStorage.getItem("commentsData");
  console.log("mailer data", typeof JSON.parse(data));
  return (
    <div className="container">
      <CommentCreationBox />
      {data.map((ele, i) => (
        <Comments key={i} data={ele} parent={i} />
      ))}
    </div>
  );
};

export default App;

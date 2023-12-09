import CommentCreationBox from "./components/CommentCreationBox"
import Comments from "./components/Comments"
import { data } from "./data"

const App = () => {

  return (
   <div className="container">
     <CommentCreationBox/>
     {data.map((ele,i)=><Comments key={i} data={ele}/>)}
   </div>

  )
}

export default App
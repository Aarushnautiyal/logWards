import styles from "./comment.module.scss"
import delIcon from "../images/delIcon.svg"
import { useState } from "react";
import CommentCreationBox from "./CommentCreationBox";

const Comments = ({data, parent,childIndex, setValueAdded}) => {
  const {userName,time,userComment,replies} = data
  const timestampDate = new Date(time);
  const [commenting, setCommenting] = useState({
    reply:false,
    editing:false
  });
const delTheComment= ()=>{
  console.log('mailer is -> parent',parent,"child index",childIndex)
  const localData = JSON.parse(localStorage.getItem("commentsData"))||[];
  if(!childIndex){
    localData.splice(parent,1)
  }else{
    localData.splice(childIndex,1)
  }
  setValueAdded(prev=>!prev)
  localStorage.setItem("commentsData", JSON.stringify(localData));
}
// Define options for formatting
const options = { day: '2-digit', month: 'long', year: 'numeric' };

// Format the Date object as desired
const formattedDate = timestampDate.toLocaleDateString('en-GB', options);

  return (
    <>
    <div className={styles.commentContainer}>
      <div className={styles.delImg}>
        <img src={delIcon} alt="delete" onClick={delTheComment} />
      </div>
      <div className={styles.commentHeadline}>
      <div className={styles.userName}>{userName}</div>
      <div>{formattedDate}</div>
      </div>
      <p className={styles.mainComment}>{userComment}</p>
      <div className={styles.operationbtnContainer}>
        <div onClick={()=>setCommenting(prev=>({
          "reply":!prev.reply
        }))}>Reply</div>
        <div onClick={()=>setCommenting(prev=>({
          "editing":!prev.editing
        }))}>Edit</div>
      </div>
      </div>
     {replies&& <div className={styles.repliesContainer}>
      {(commenting.reply||commenting.editing)&&<CommentCreationBox Editing={commenting.editing} indx={childIndex} Replying={commenting.reply} parent={parent} userName={userName}/>}
      {replies.map((ele,i)=><Comments key={i} childIndex={i} data={ele} parent={parent}/>)}
    </div>}
    </>
  )
}

export default Comments
import styles from "./comment.module.scss"
import delIcon from "../images/delIcon.svg"
import { useState } from "react";
import CommentCreationBox from "./CommentCreationBox";

const Comments = ({data}) => {
  const {userName,time,userComment,replies} = data
  const timestampDate = new Date(time);
  const [commenting, setCommenting] = useState({
    reply:false,
    editing:false
  });

// Define options for formatting
const options = { day: '2-digit', month: 'long', year: 'numeric' };

// Format the Date object as desired
const formattedDate = timestampDate.toLocaleDateString('en-GB', options);

  return (
    <>
    <div className={styles.commentContainer}>
      <div className={styles.delImg}>
        <img src={delIcon} alt="delete"  />
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
      {(commenting.reply||commenting.editing)&&<CommentCreationBox Editing={commenting.editing} Replying={commenting.reply} userName={userName}/>}
      {replies.map((ele,i)=><Comments key={i} data={ele}/>)}
    </div>}
    </>
  )
}

export default Comments
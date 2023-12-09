import styles from "./comment.module.scss"
import delIcon from "../images/delIcon.svg"
import { useState } from "react";
import CommentCreationBox from "./CommentCreationBox";

const Comments = ({data, parent,childIndex, setValueAdded,child}) => {
  const {userName,time,userComment,replies} = data
  const [commenting, setCommenting] = useState({
    reply:false,
    editing:false
  });
const delTheComment= ()=>{
  const localData = JSON.parse(localStorage.getItem("commentsData"))||[];
  if(childIndex!==undefined){
    localData[parent].replies.splice(childIndex,1)
  }else{
    localData.splice(parent,1)
  }
  setValueAdded(prev=>!prev)
  localStorage.setItem("commentsData", JSON.stringify(localData));
}
const timestampDate = new Date(time);

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
        {!child&&<div onClick={()=>setCommenting(prev=>({
          "reply":!prev.reply
        }))}>Reply</div>}
        <div onClick={()=>setCommenting(prev=>({
          "editing":!prev.editing
        }))}>Edit</div>
      </div>
      </div>
     {replies&& <div className={styles.repliesContainer}>
      {(commenting.reply||commenting.editing)&&<CommentCreationBox Editing={commenting.editing} indx={childIndex} Replying={commenting.reply} parent={parent} propsUserName={userName} setValueAdded={setValueAdded} setCommenting={setCommenting}/>}
      {replies.map((ele,i)=><Comments child={true}key={i} childIndex={i} data={ele} parent={parent} setValueAdded={setValueAdded}/>)}
    </div>}
    </>
  )
}

export default Comments
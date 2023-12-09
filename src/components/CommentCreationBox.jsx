import React, { useState } from "react";
import styles from "./comment.module.scss";

const CommentCreationBox = ({Editing, userName,Replying,indx,parent,setValueAdded}) => {
  const [formData, setFormData] = useState({
    userName: "",
    userComment: "",
  });
  const normalInsert = ()=>{
    const formFilled = Object.values(formData).every((e) => e.length > 0);
    if (formFilled) {
      const date = new Date();
      const obj = {
        ...formData,
        time: date,
        replies: [],
      };
      setFormData({
        userName: "",
        userComment: "",
      });
      setValueAdded(prev=>!prev)
      const localData = JSON.parse(localStorage.getItem("commentsData"))||[];
      localData.push(obj)
      localStorage.setItem("commentsData", JSON.stringify(localData));
    }
  }
  const insertInside = ()=>{
    if(Editing){

    }
    console.log("mailer",indx,parent)
  }
  const submitHandler = (e) => {
    e.preventDefault();
    if(Editing||Replying){insertInside()}else{normalInsert()}
  };
  const changeHandler = (e) => {
    const { value, name } = e.target;
    const letters = /^[a-zA-Z ]+$/;
    if (name === "userName" && !letters.test(value)) return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className={styles.container}>
      <span>Comment</span>
      <form onSubmit={(e) => submitHandler(e, formData)}>
        <input
          type="text"
          name="userName"
          placeholder="Name"
          onChange={(e) => changeHandler(e, setFormData)}
          value={Editing?userName:formData.userName}
          disabled={Editing}
        />
        <textarea
          type="text"
          name="userComment"
          placeholder="Comment"
          onChange={(e) => changeHandler(e, setFormData)}
          value={formData.userComment}
        />
        <button>Post</button>
      </form>
    </div>
  );
};

export default CommentCreationBox;

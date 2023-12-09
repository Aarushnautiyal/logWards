import React, { useState } from 'react'
import styles from "./comment.module.scss"

const CommentCreationBox = () => {
    const [formData,setFormData] = useState({
        userName:"",
        userComment:""
    });
     const submitHandler =(e)=>{
        e.preventDefault();
        const formFilled = Object.values(formData).every(e=>e.length>0)
        if(formFilled){
            const date = new Date();
            const obj = {
                ...formData,
                time:date,
                replies:[]
            }
            setFormData({
                userName:"",
                userComment:""
            })
            localStorage.setItem("commentsData",JSON.stringify(obj))
        }
    }
     const changeHandler = (e)=>{
        const {value,name} = e.target;
        const letters = /^[A-Za-z]+$/;
        if(name==="userName"&&!letters.test(value))return
    
        setFormData(prev=>({
            ...prev,
            [name]:value
        }))
    
    }
  return (
    <div className={styles.container}>
        <span>Comment</span>
      
    <form onSubmit={(e)=>submitHandler(e,formData)}>
    <input type="text" name="userName" placeholder='Name' onChange={(e)=>changeHandler(e,setFormData)} value={formData.userName}/>
    <textarea type="text" name="userComment" placeholder='Comment' onChange={(e)=>changeHandler(e,setFormData)} value={formData.userComment}/>
     <button>Post</button>
    </form>
     </div>
  )
}

export default CommentCreationBox
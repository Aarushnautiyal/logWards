export const submitHandler =(e,data)=>{
    e.preventDefault();
    const formFilled = Object.values(data).every(e=>e.length>0)
    console.log("mailer",formFilled);
    if(formFilled){
        const date = new Date();
        const obj = {
            ...data,
            time:date
        }
        console.log("mailer data",obj)
    }
}
export const changeHandler = (e,setter)=>{
    const {value,name} = e.target;
    const letters = /^[A-Za-z]+$/;
    if(name==="userName"&&!letters.test(value))return

    setter(prev=>({
        ...prev,
        [name]:value
    }))

}
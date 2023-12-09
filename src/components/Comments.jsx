import React from 'react'

const Coments = ({data}) => {
  return (
    <div>
      <span>{data.userName}</span>
      <div>{data.time}</div>
      <p>{data.userComment}</p>
      <div>
        <div>Reply</div>
        <div>Edit</div>
      </div>
    </div>
  )
}

export default Coments
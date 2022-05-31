import React from "react"

export const Avatar = ({ username }) => {
  const avatar = {
    verticalAlign: "middle",
    backgroundColor: "#f9fafb",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
  }
  const text = {
    fontSize: "0.625rem",
  }
  return (
    <>
      <img src={avatar} alt="avatar" style={avatar} />
      <p style={text}>{username}</p>
    </>
  )
}

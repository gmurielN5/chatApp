import "../Style/user.scss"

//toDo div user on click change color if selectedUser===user

export const User = ({ user, handleClick }) => {
  return (
    <div
      className={`user ${user.self ? "active" : ""}`}
      onClick={() => handleClick(user)}
    >
      <div>
        <p>
          {user.username} {user.self ? " (yourself)" : ""}
        </p>
      </div>
      <div className="status">
        <i className={`icon ${user.connected ? "connected" : ""}`}></i>
        <span>{user.connected ? "online" : "offline"}</span>
      </div>
      {/* conditionnaly render div if hasNewmessage is true */}
      <div className="new-message">
        {/* add icon and return number of messages waiting */}
      </div>
    </div>
  )
}

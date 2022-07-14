export const Messages = ({ msg }) => {
  return (
    <li className={`msg ${msg.fromSelf ? "msg-right" : ""}`}>
      <p>{msg.content}</p>
      {msg.fromSelf && <span>you</span>}
    </li>
  )
}

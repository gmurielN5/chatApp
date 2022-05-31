import React, { useState, useEffect, useContext, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useSpring, animated } from "react-spring"
import useMeasure from "react-use-measure"
import { MainContext } from "../../context"

import { Avatar } from "./Avatar"
import "../../Style/chat.scss"

export const Chat = ({ socket }) => {
  const { room, users, username, setUsername, setRoom } =
    useContext(MainContext)
  let navigate = useNavigate()
  const [text, setText] = useState("")
  const [messages, setMessages] = useState([])
  const [notification, setNotification] = useState("")
  const [open, setOpen] = useState(false)
  const messagesEndRef = useRef(null)
  const [ref, { height }] = useMeasure()
  const props = useSpring({ height: open ? height : 0 })

  window.onpopstate = (e) => logout()
  useEffect(() => {
    if (!username) return navigate("/")
  }, [username])

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((messages) => [...messages, msg])
    })

    socket.on("notification", (notif) => {
      setNotification(notif)
      setOpen(true)
    })
  }, [socket])

  useEffect(() => {
    if (notification !== "") {
      const timer = setTimeout(() => {
        setNotification("")
        setOpen(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const sendData = (e) => {
    if (text !== "") {
      socket.emit("sendMessage", text, () => setText(""))
      setText("")
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const logout = () => {
    socket.disconnect()
    setUsername("")
    setRoom("")
    navigate("/")
  }

  const messagesList = () => {
    const list = messages.map((msg, i) => {
      if (msg.user !== username) {
        return (
          <div className="message" key={i}>
            <p>{msg.text}</p>
            <span>{msg.user}</span>
          </div>
        )
      } else {
        return (
          <div className="message mess-right" key={i}>
            <p>{msg.text}</p>
            <span>You</span>
          </div>
        )
      }
    })
    return list
  }

  return (
    <main className="chat">
      <div className="chat-header">
        <div className="menu">
          <div className="profile">
            <Avatar username={username} />
          </div>
          <h1>{room.slice(0, 1).toUpperCase() + room.slice(1)}</h1>
          <button onClick={logout}>logout</button>
        </div>
        <div className="submenu" ref={ref}>
          <animated.div className="notification" style={props}>
            <h2>{notification.text}</h2>
          </animated.div>

          {users.length > 0 && (
            <div className="users">
              {users.map((user) => {
                if (user.username !== username) {
                  return (
                    <div key={user.id} className="profile">
                      <Avatar username={user.username} />
                    </div>
                  )
                }
              })}
            </div>
          )}
        </div>
      </div>
      <div className="chat-message">
        {messages.length > 0 ? messagesList() : <p>no messages</p>}
        <div ref={messagesEndRef} />
      </div>
      <div className="text">
        <input
          placeholder="enter your message"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendData()
            }
          }}
        />

        <button onClick={sendData}>Send</button>
      </div>
    </main>
  )
}

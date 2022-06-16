import { useContext } from "react"
import { context } from "../context"
import { Field, Form, Formik } from "formik"
import * as Yup from "yup"
import "../Style/chat.scss"

export const Chat = ({ player }) => {
  const { socket } = useContext(context)
  return (
    <div className="message-input">
      <Formik
        initialValues={{ message: "" }}
        validationSchema={Yup.object({
          message: Yup.string().min(1).max(255),
        })}
        onSubmit={(values, actions) => {
          socket.emit("private message", {
            content: values.message,
            to: player.userID,
          })
          console.log(values.message)
          console.log(player)
          actions.resetForm()
        }}
      >
        <Form>
          <Field
            id="message"
            name="message"
            placeholder="Type your message here..."
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  )
}

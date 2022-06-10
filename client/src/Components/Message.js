import { Field, Form, Formik } from "formik"
import * as Yup from "yup"
import "../Style/message.scss"

export const Message = ({ selectedUser, sendData }) => {
  return (
    <div className="message-panel">
      <div className="header">
        <div className="name">
          <p>{selectedUser.username}</p>
        </div>
        <div className="status">
          <i
            className={`icon ${selectedUser.connected ? "connected" : ""}`}
          ></i>
          <span>{selectedUser.connected ? "online" : "offline"}</span>
        </div>
      </div>
      <div className="message">
        <p>message</p>
      </div>
      <div className="message-input">
        <Formik
          initialValues={{ message: "" }}
          validationSchema={Yup.object({
            message: Yup.string().min(1).max(255),
          })}
          onSubmit={(values, actions) => {
            if (selectedUser) {
              console.log(values)
              console.log(selectedUser)
            }

            // actions.resetForm()
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
    </div>
  )
}

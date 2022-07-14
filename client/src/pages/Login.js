import { useContext } from "react"
import { context } from "../context"
import { Form, Field, Formik } from "formik"
import * as Yup from "yup"

import "../Style/login.scss"

export const Login = () => {
  const { socket, setIsLoggedIn } = useContext(context)

  const validateUsername = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Username required"),
  })
  return (
    <div className="login">
      <div className="homepage">
        <div className="header">
          <h1>Welcome </h1>
        </div>
        <Formik
          initialValues={{
            username: "",
          }}
          validationSchema={validateUsername}
          onSubmit={(values) => {
            const username = values.username
            if (username) {
              socket.auth = { username }
              socket.connect()
              setIsLoggedIn(true)
            }
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <label htmlFor="username">Player Name</label>
              <Field
                id="username"
                name="username"
                placeholder="Enter your player name..."
              />
              {touched.username && errors.username && (
                <div className="error">{errors.username}</div>
              )}
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

import React, { useState } from "react"
import validator from "validator"
import { Form, Button } from "react-bootstrap"
import { gql, useMutation } from "@apollo/client"
import { Navigate, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { changeLoggedIn, updateUserData } from "../redux/userSlice"

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const [values, setValues] = useState({
    email: "",
    password: "",
  })
  //   const [textDecoration, setTextDecoration] = useState("none")

  //   const changeTextDecoration = (e) => {
  //     if (e.target.style.textDecoration === "none")
  //       e.target.style.textDecoration = "underline"
  //     else e.target.style.textDecoration = "none"
  //   }
  const validateEmail = (e) => {
    const email = e.target.value
    onChange(e)
    if (validator.isEmail(email)) {
      setEmailError("Valid Email :)")
    } else if (email === "") {
      setEmailError("We'll never share your email with anyone else.")
    } else {
      setEmailError("Enter valid Email!")
    }
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      alert(`Login`)
    },
    variables: {
      email: values.email,
      password: values.password,
    },
  })
  const onSubmit = (event) => {
    event.preventDefault()

    loginUser()
      .then(({ data }) => {
        dispatch(changeLoggedIn())
        dispatch(updateUserData(data.login))
        localStorage.setItem("token", data.login.token)
        navigate("/")
      })
      .catch((e) => {
        alert(e)
      })
  }
  return (
    <Form className="d-grid rounded p-4 p-sm-2">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          name="email"
          onChange={(e) => validateEmail(e)}
          required
          type="email"
          placeholder="name@example.com"
        />
        <Form.Text className="text-muted">{emailError}</Form.Text>
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => onChange(e)}
        />

        <Form.Text>
          <a
            className="text-muted"
            href="/signup"
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
            style={{
              textDecoration: "none",
            }}
          >
            Forgot your password?
          </a>
        </Form.Text>
      </Form.Group>

      <Button className="mb-4" variant="dark" type="button" onClick={onSubmit}>
        Submit
      </Button>
      <a
        className=" text-center"
        href="/signup"
        onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
        onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
        style={{
          textDecoration: "none",
        }}
      >
        Don't have an account?
      </a>
    </Form>
  )
}
const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      token
      username
      role
    }
  }
`
export default LoginForm

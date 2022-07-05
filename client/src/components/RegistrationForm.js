import React, { useState } from "react"
import validator from "validator"
import { Form, Button } from "react-bootstrap"
import { gql, useMutation } from "@apollo/client"
import { useNavigate } from "react-router-dom"
const RegistrationForm = () => {
  const navigate = useNavigate()
  const [moneyError, setMoneyError] = useState("")
  const [emailError, setEmailError] = useState(
    "We'll never share your email with anyone else."
  )
  const [passwordError, setPasswordError] = useState("")
  const [money, setMoney] = useState(0)
  const [role, setRole] = useState("Investor")
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: role,
  })
  const isPositiveNumber = (value) => value >= 0
  const isNumber = (value) => !isNaN(value)
  const validatePositiveNumber = (e) => {
    const moneyField = e.target.value
    setMoney(moneyField)
    if (moneyField === "") {
      setMoneyError("")
    } else if (isNumber(moneyField) && isPositiveNumber(Number(moneyField))) {
      setMoneyError("Valid money :)")
    } else {
      setMoneyError("Please insert a valid number")
    }
  }
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
  const validatePassword = (password, confirmedPassword) => {
    if (password !== confirmedPassword) {
      setPasswordError("Password and Confirm Password must be the same")
    } else {
      setPasswordError("")
    }
  }
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const [addUser, { data, loading, error }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      alert(
        `Created the user ${result.data.register.username} with the mail ${result.data.register.email}`
      )
      console.log(result)
    },
    variables: {
      username: values.username,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      role: values.role,
      money: Number(money),
    },
  })
  const onSubmit = (event) => {
    event.preventDefault()

    addUser()
      .then(({ data }) => {
        navigate("/login")
      })
      .catch((e) => {
        console.log(e)
        alert(e)
      })
  }
  return (
    <Form className="d-grid rounded p-4 p-sm-2">
      <Form.Group className="mb-4" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          name="username"
          required
          type="text"
          placeholder="Username"
          onChange={(e) => onChange(e)}
        />
      </Form.Group>
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
          name="password"
          required
          type="password"
          placeholder="Password"
          onChange={(e) => {
            onChange(e)
            validatePassword(e.target.value, values.confirmPassword)
          }}
        />
      </Form.Group>
      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          name="confirmPassword"
          required
          type="password"
          placeholder="Password"
          onChange={(e) => {
            onChange(e)
            validatePassword(values.password, e.target.value)
          }}
        />
        <Form.Text className="text-muted">{passwordError}</Form.Text>
      </Form.Group>
      <Form.Label>Choose role of user</Form.Label>
      <Form.Select
        name="role"
        className="mb-4"
        aria-label="Default select example"
        onChange={(e) => {
          setRole(e.target.value)
          onChange(e)
          setMoney(0)
        }}
      >
        <option value="Investor">Investor</option>
        <option value="Founder">Founder</option>
      </Form.Select>
      {role === "Investor" && (
        <Form.Group className="mb-4" controlId="formBasicMoney">
          <Form.Label>Money</Form.Label>
          <Form.Control
            required
            name="money"
            type="text"
            placeholder="Amount"
            onChange={(e) => {
              validatePositiveNumber(e)
            }}
          />
          <Form.Text className="text-muted">{moneyError}</Form.Text>
        </Form.Group>
      )}

      <Button variant="dark" type="submit" onClick={onSubmit}>
        Submit
      </Button>
    </Form>
  )
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $role: String!
    $money: Float
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        role: $role
        money: $money
      }
    ) {
      id
      email
      token
      username
    }
  }
`

export default RegistrationForm

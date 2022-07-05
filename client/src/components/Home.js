import React from "react"
import Header from "./Header"
import Body from "./Body"
import { Container } from "react-bootstrap"
import Footer from "./Footer"
import { useDispatch, useSelector } from "react-redux"

const Home = () => {
  console.log(localStorage.getItem("token"))

  return (
    <div>
      <Header />
      <Container>
        <Body />
      </Container>
      <Footer />
    </div>
  )
}

export default Home

// import React from "react"
import ReactDOM from "react-dom"
// import App from "./App"
// import Signup from "./components/Signup"
// import Login from "./components/Login"
// import { BrowserRouter, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import ApolloProvider from "./ApolloProvider"

// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   useQuery,
//   gql,
// } from "@apollo/client"

// const client = new ApolloClient({
//   uri: `http://localhost:3001`,
//   cache: new InMemoryCache(),
// })

// ReactDOM.render(
//   <ApolloProvider client={client}>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<App />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </BrowserRouter>
//   </ApolloProvider>,
//   document.getElementById("root")
// )
ReactDOM.render(ApolloProvider, document.getElementById("root"))
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

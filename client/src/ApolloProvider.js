import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  createHttpLink,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import App from "./App"
import { store } from "../src/store"
import { Provider } from "react-redux"
const httpLink = createHttpLink({
  uri: "http://localhost:3001",
})
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists

  const token = localStorage.getItem("token")

  // return the headers to the context so httpLink can read them

  return {
    headers: {
      ...headers,

      authorization: token ? `Bearer ${token}` : "",
    },
  }
})
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
export default (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>
)

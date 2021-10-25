import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react"
import Home from './pages/Home';
import { client } from './config/config'
import './styles/style.scss'

function App() {
  return (
    <ApolloProvider client={client ? client : null}>
      <div className="App">
        <ChakraProvider>
          <Home />
        </ChakraProvider>
      </div>
    </ApolloProvider>
  );
}

export default App;

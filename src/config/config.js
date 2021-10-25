import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    ApolloLink,
    concat,
} from "apollo-boost";
import { onError } from "apollo-link-error";

export const SERVER_URL = `https://api.staging.tigerhall.io`

const httpLink = new HttpLink({ uri: `${SERVER_URL}/graphql` });

const authLink = new ApolloLink((operation, forward) => {
    return forward(operation);
});

const logoutLink = onError(({ networkError }) => {
});


export const client = new ApolloClient({
    link: concat(authLink, logoutLink.concat(httpLink)),
    cache: new InMemoryCache(),
    resolvers: {},
});

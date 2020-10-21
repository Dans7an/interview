import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { createApolloClient, restartWebsockets } from 'vue-cli-plugin-apollo/graphql-client';
import store from './store';

// Install the vue plugin
Vue.use(VueApollo);

// Config
const defaultOptions = {
  httpEndpoint: process.env.VUE_APP_GRAPHQL_HTTP,
  wsEndpoint: process.env.VUE_APP_GRAPHQL_WS || 'ws://localhost:4000/graphql',
  tokenName: '',
  persisting: false,
  websocketsOnly: false,
  ssr: false,
  getAuth: () => (store.state.loggedIn ? `Bearer ${store.state.token}` : ''),
  notifyOnNetworkStatusChange: true,
};

export function createClient(options = {}) {
  const { apolloClient, wsClient } = createApolloClient({
    ...defaultOptions,
    ...options,
  });

  // wsClient () documentation:
  // https://github.com/apollographql/subscriptions-transport-ws#subscriptionclient
  // NOTE: you can mutate the client to change its options
  apolloClient.wsClient = wsClient;

  return apolloClient;
}

export function createProvider(apolloClient) {
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        // NOTE: documentation for "fetchPolicy": https://tinyurl.com/y8swk9py
        fetchPolicy: 'cache-and-network',
      },
    },
    errorHandler(error) {
      // eslint-disable-next-line no-console
      // MIKE: this logging should be disabled in production
      console.log(error);
    },
  });

  return apolloProvider;
}

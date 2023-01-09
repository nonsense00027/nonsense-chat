import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Routes from "./routes";

function App() {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <Routes />
    </QueryClientProvider>
  );
}

export default App;

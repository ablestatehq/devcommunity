import ErrorBoundary from "./components/shared/ErrorBoundary";
import Routing from "./Routing";


function App() {
  return (
    <ErrorBoundary>
      <Routing />
    </ErrorBoundary>
  )
}

export default App;

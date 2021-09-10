import "./App.scss";
import Home from "./views/Home";
export const App = () => {
  return (
    <div className="App" data-testid="context-support">
      <Home />
    </div>
  );
};

export default App;

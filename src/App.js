
import './css/App.css';
import Pathfind from './Components/Pathfind';
import PathfindContextProvider from './Contexts/PathfindContextProvider';


function App() {

  return (
    <div className="App">
    <PathfindContextProvider>
      <Pathfind/>
    </PathfindContextProvider>

    </div>
  );
}

export default App;

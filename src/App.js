import './App.css';
import FormShareLocation from "./component/form/form";
import Map from "./component/map/map";

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
    return (
    <div className="App">
        <FormShareLocation/>
        <Map/>
    </div>
  );
}

export default App;

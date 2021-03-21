import Menu from './Menu'
import './inventory.css'
import './login.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
library.add(faEdit);
function App() {
  return (
    <div className="App">
      <Menu />
    </div>
  );
}

export default App;

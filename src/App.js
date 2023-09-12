import Items from "./components/Items";
import Packs from "./components/packs";
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import { useState } from "react";
import { packsContext } from "./context/packs";

function App() {

  let [packs, setPacks] = useState([]);

  let router = createBrowserRouter([
    {
    path : '/',
    element : <Packs/>
  },
  {
    path : '/items/:index',
    element : <Items/>
  }
])

  return (
    <packsContext.Provider value={{packs,setPacks}}>
    <div className="App">
     <RouterProvider router={router}/>
    </div>
    </packsContext.Provider>
  );
}

export default App;


import './App.css'
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx'
import PokedexPage from './pages/PokedexPage.jsx';
import PokemonPage from './pages/PokemonPage.jsx';
import ProtectedRoutes from './pages/ProtectedRoutes.jsx';


function App() {

  return (
   <div>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route element={< ProtectedRoutes />}>
      <Route path='/pokedex' element={< PokedexPage />} />
      <Route path='/pokedex/:id' element={< PokemonPage />} />
      </Route>
    </Routes>
   </div>
  )
}

export default App

import './App.css'
import { NavBar } from './components/NavBar/NavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PokemonsProvider } from './contexts/PokemonsProvider'
import { PokemonsSearch } from './pages/PokemonsSearch';
import { PokemonItem } from './pages/PokemonItem';

function App() {
  return (
    <>
      <BrowserRouter>
        <PokemonsProvider>
          <section className="w-[100%] h-max bg-white text-slate-700">
            <NavBar />
            <Routes>
              <Route path="/" element={<PokemonsSearch />} />
              <Route path="/:itemName" element={<PokemonItem />} />
            </Routes>
          </section>
        </PokemonsProvider>
      </BrowserRouter>
    </>
  )
}

export default App

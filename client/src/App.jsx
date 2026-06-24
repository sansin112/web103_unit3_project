// client/src/App.jsx
import React from 'react'
import { useRoutes, Link } from 'react-router-dom'
import Locations from './pages/Locations'
import LocationEvents from './pages/LocationEvents'
import Events from './pages/Events'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <Locations />
    },
    {
      // ⚡ FIX: This captures the location ID dynamically from your click events!
      path: '/location/:id',
      element: <LocationEvents />
    },
    {
      path: '/events',
      element: <Events />
    }
  ])

  return (
    <div className='app-container'>
      <nav className='container-fluid main-navbar'>
        <ul>
          <li>
            <Link to='/' className='brand-link'>
              <strong>⚡ Play! Pokémon Hub</strong>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to='/' role='button' className='outline secondary nav-btn'>Venues</Link>
          </li>
          <li>
            <Link to='/events' role='button' className='primary nav-btn'>Master Schedule</Link>
          </li>
        </ul>
      </nav>

      <main className='app-content'>
        {element}
      </main>
    </div>
  )
}

export default App
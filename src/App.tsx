
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import Hospitslity from './components/Hospitslity'
import TicketPage from './components/TicketPage'
import HostCitiesPage1 from './components/HostCitiesPage1'
import Standing from './components/Standing1'
import Team from './components/Team'
import CheckoutPage from './components/CheckoutPage'
import Payment from './components/Payment'

const App = () => {
  return (
    <div >
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hospitality" element={<Hospitslity/>} />
        <Route path='/hostcitiesPage' element={<HostCitiesPage1/>}/>
        <Route path='/tickets' element={<TicketPage/>}/>
        <Route path='/Standings' element={<Standing/>}/>
        <Route path='/teams' element={<Team/>}/>
        <Route path="/CheckOutPage" element={<CheckoutPage />} />
        <Route path="/Payment" element={<Payment />} />
      </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App

import Navbar from './Home/Navbar'
import FaqPage from './Hospitslity/FaqPage'
import Footer from './Hospitslity/Footer'
import Hero from './Hospitslity/Hero'
import Matches from './Hospitslity/Matches'
import UnrivaledLounge from './Hospitslity/UnrivaledLounge'

const Hospitslity = () => {
  return (
    <div className='bg-black'>
      <Navbar/>
        <Hero/>
        <Matches/>
        <UnrivaledLounge/>
        <FaqPage/>
        <Footer/>
    </div>
  )
}

export default Hospitslity
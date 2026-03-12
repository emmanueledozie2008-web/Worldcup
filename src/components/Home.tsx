
import Navbar from './Home/Navbar'
import Hero from './Home/Hero'
import Hospitality from './Home/Hospitality'
import New from './Home/New'
import Standing from './Home/Standing'
import Bracket from './Home/Bracket'
import TicketsHospitality from './Home/TicketsHospitality'
import Host from './Home/Host'
import VideoHero from './Home/VideoHero'
import Footer from './Home/Footer'
import FAQSection from './Home/FAQSection'

function Home() {
  return (
    <div className="bg-gray-100">

      <Navbar />

      <main className="w-full">

        {/* HERO */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-6">
          <Hero />
        </section>

        {/* HOSPITALITY */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-10">
          <Hospitality />
        </section>

        {/* NEWS */}
        <section className="pt-10">
          <New />
        </section>

        {/* STANDINGS */}
        <section className="pt-10">
          <Standing />
        </section>

        {/* BRACKET + TICKETS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-10 space-y-10">
          <Bracket />
          <TicketsHospitality />
          <Host />
          <FAQSection />
          <VideoHero />
        </section>

        {/* FOOTER */}
        <Footer />

      </main>

    </div>
  )
}

export default Home
import Header from '@/sections/Header'
import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Solutions from '@/sections/Solutions'
import WhyUs from '@/sections/WhyUs'
import Contact from '@/sections/Contact'
import Footer from '@/sections/Footer'

export default function HomePage() {
  return (
    <main id="main-content">
      <Header />
      <Hero />
      <About />
      <Solutions />
      <WhyUs />
      <Contact />
      <Footer />
    </main>
  )
}

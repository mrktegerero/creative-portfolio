import { About } from "./Components/Home/About"
import { Hero } from "./Components/Home/Hero"
import { Projects } from "./Components/Home/Projects"
import { Contact } from "./Components/Footer/Contact"
import { Nav } from "./Components/Nav/Nav"

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <main className="bg-black flex flex-1 flex-col">
        <Nav/>
        <Hero/>
        <About/>
        <Projects/>
        <Contact/>
      </main>
    </>
  )
}

export default App

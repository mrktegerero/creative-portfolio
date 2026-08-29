import { About } from "./Components/Home/About"
import { Hero } from "./Components/Home/Hero"
import { Projects } from "./Components/Home/Projects"

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <main className="bg-black flex flex-1 flex-col">
        <Hero></Hero>
        <About></About>
        <Projects></Projects>
      </main>
    </>
  )
}

export default App

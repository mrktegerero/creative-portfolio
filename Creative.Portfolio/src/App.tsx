import { useState } from "react"
import { About } from "./Components/Home/About"
import { Hero } from "./Components/Home/Hero"
import { Projects } from "./Components/Home/Projects"
import { ProjectList } from "./Components/Home/ProjectList"
import { Contact } from "./Components/Footer/Contact"
import { Nav } from "./Components/Nav/Nav"
import { LoadingScreen } from "./Components/Loader/LoadingScreen"
import { ScrollCrosshair } from "./Components/Reusable/ScrollCrosshair"

function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <ScrollCrosshair />

      <main className="bg-black flex flex-1 flex-col">
        <Nav/>
        <Hero/>
        <About/>
        <ProjectList/>
        <Projects/>
        <Contact/>
      </main>
    </>
  )
}

export default App

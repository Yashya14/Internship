import { BrowserRouter, Route, Routes } from "react-router-dom"
import EmployeeList from "./components/EmployeeList"
import Header from "./pages/Header"
import AboutUs from "./pages/AboutUs"
// import Footer from "./pages/Footer"


const App:React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  )
}

export default App

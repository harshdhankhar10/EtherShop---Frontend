import './App.css'
import Routes from './pages/Routes'
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {

  return (
    <>
      <Routes />
      <ToastContainer />
    </>
  )
}

export default App

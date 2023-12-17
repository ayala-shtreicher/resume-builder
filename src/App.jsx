import './App.css'
import DownloadPdf from './components/DownloadPdf'
import Form from './components/Form'
import { Provider } from './context/resumes'
// import { NestedModal } from "./pages/NestedModal";
function App() {

  return (
    <>
      <Provider>
        <Form />
        <DownloadPdf/>
      </Provider>
      {/* <NestedModal></NestedModal> */}
    </>
  )
}

export default App

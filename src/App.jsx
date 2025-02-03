import Landing from "./pages/Landing"
import AdminRoute from "./routes/AdminRoute"
import AppRoutes from "./routes/AppRoutes"
import {Toaster} from 'react-hot-toast'
function App() {

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AppRoutes />
      <AdminRoute />
    </>
  )
}

export default App

import { Outlet } from 'react-router-dom'
import Header from '../Components/Header/Header'
import Sidebar from '../Components/Patient/Sidebar/Sidebar'

const PatientDashboard = () => {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="w-full flex flex-col">
          <Header />
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard

import { Outlet } from "react-router-dom"

const AppLayout = () => {
  return (
    <div>
      App Lyout
       {/* all of the routes will be rendered at this place */}
      <Outlet/>
    </div>
  )
}

export default AppLayout

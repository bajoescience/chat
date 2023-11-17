import { Navigate, useMatch, useOutletContext, useNavigate, Outlet } from "react-router-dom"
import AppLayout from "./AppLayout"
import SignIn from "./SignIn"


// Verify whether user is already in memory
// App route bool checks whether the route is '/' or '/auth/signin'
const UserRouteFunc = () => { 
    const context = useOutletContext()
    const {user, setUser} = context.userState
    const match = useMatch('/auth/signin')

    if (!user) {
      if (match) {
        const savedUserJSON = window.localStorage.getItem('loggedUser')
        if (!savedUserJSON) return  <Navigate replace to={'/chat/auth/'} />
        const savedUser = JSON.parse(savedUserJSON)
        setUser(savedUser)
      }
    }
    return <Outlet context={context} />
}

export default UserRouteFunc
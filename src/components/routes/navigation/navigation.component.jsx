import { Outlet, Link } from "react-router-dom"

const Navigation = () => {
    return (
        <>
            <div className="flex flex-col h-full">
                <div className="bg-teal-300 w-full top-0 fixed">
                    <Link className="px-5" to='/'>Here Home Logo</Link>
                    <Link className="px-5" to='/authentication'>Sign In / Sign up</Link>
                    <Link className="px-5" to='/records'>See records</Link>
                </div>
                <div className="flex items-center justify-center flex-col h-full">
                    <Outlet />
                </div>
            </div >
        </>
    )
}

export default Navigation;
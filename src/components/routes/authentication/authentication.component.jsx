import SignIn from "../../helper-components/sign-in/sign-in.component";
import SignUp from "../../helper-components/sign-up/sign-up.component";

const Authentication = () => {
    return (
        <>
            <h1>Here you can sign in or sign up.</h1>
            <div className="flex items-center">
                <SignIn />
                <SignUp />
            </div>
        </>
    )
}

export default Authentication;
import SignIn from "../../helper-components/sign-in/sign-in.component";
import SignUpForm from "../../helper-components/sign-up-form/sign-up-form.component";

const Authentication = () => {
    return (
        <>
            <h1 className="text-gray-700 font-bold text-lg mb-3">Here you can sign in or sign up.</h1>
            <div className="flex items-center">
                <SignIn />
                <SignUpForm />
            </div>
        </>
    )
}

export default Authentication;
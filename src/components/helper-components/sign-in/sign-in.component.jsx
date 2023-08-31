import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../../utils/firebase.utils";

const SignIn = () => {
    const logGoogleUser = async () => {
        //response - user credentials, access token
        //access token is used to create CRUD requests
        const { user } = await signInWithGooglePopup();
        //create document reference
        const userDocRef = await createUserDocumentFromAuth(user)
    }

    return (
        <div className="p-2 bg-cyan-300 m-5">
            <h1 className="m-2">Sign In Component</h1>
            <button onClick={logGoogleUser}
                className="bg-white p-2 border-teal-900"
            >Sign in with Google Popup</button>
        </div>
    )
}

export default SignIn;
// import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../../utils/firebase.utils";
// import Button from "../button/button.component";

// const SignIn = () => {
//     const logGoogleUser = async () => {
//         //response - user credentials, access token
//         //access token is used to create CRUD requests
//         const { user } = await signInWithGooglePopup();
//         //create document reference
//         const userDocRef = await createUserDocumentFromAuth(user)
//     }

//     return (
//         <div className=" flex flex-col  bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-center">
//             <span className="text-left text-gray-700 font-bold text-base mb-2">Sign In Component</span>
//             <Button type="button" onClick={logGoogleUser}>Sign in with Google Popup</Button>
//         </div>
//     )
// }

// export default SignIn;

import { useState } from "react";
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from "../../../utils/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFields = {
    email: '',
    password: ''
}

const signInWithGoogle = async () => {
    //response - user credentials, access token
    //access token is used to create CRUD requests
    const { user } = await signInWithGooglePopup();
    //create document reference
    const userDocRef = await createUserDocumentFromAuth(user)
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        //target gives the input
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response)
            resetFormFields();
        } catch (error) {
            if (error.code === "auth/wrong-password") {
                alert('incorrect password or email')
            }
        }
    }

    return (
        <div className="p-2 m-5 rounded shadow-md">
            {/* block text-gray-700 text-sm font-bold mb-2 */}
            <h2 className=" text-gray-700 font-bold text-sm mb-2 mt-2">Already have an account?</h2>
            <span className=" text-gray-700 font-bold text-sm mb-2">Sign in with your email and password</span>
            {/* form should not be submitable until the fields are filled  */}
            <form
                className="flex flex-col items-center rounded px-8"
                action=""
                onSubmit={handleSubmit}
            >

                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email} />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />
                <div className="flex flex-col">
                    <Button type="submit">Sign In</Button>
                    <Button onClick={signInWithGoogle}>Sign In with Google Popup</Button>
                </div>
            </form>
        </div >
    )
}

export default SignInForm;
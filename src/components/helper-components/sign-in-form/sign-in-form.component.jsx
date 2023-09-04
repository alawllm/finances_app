import { useState, useContext } from "react";
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from "../../../utils/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { UserContext } from "../../../contexts/user.context";

const defaultFormFields = {
    email: '',
    password: ''}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    //taking the function off of the context
    const {setCurrentUser} = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        //response - user credentials, access token
        //access token is used to create CRUD requests
        const { user } = await signInWithGooglePopup();
        //create document reference in the database
       await createUserDocumentFromAuth(user)
    }

    const handleChange = (event) => {
        //target gives the input
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user);
            resetFormFields();
        } catch (error) {
            if (error.code === "auth/wrong-password" || error.code==="auth/user-not-found") {
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
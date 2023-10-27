import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../../firebase_config/firebase-auth.config";
import ButtonBlue from "../../helper-components/button-blue/button-blue.component";
import FormInput from "../../helper-components/form-input/form-input.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const navigateTo = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  //on submit try to create authorized user with email and password
  //then create user document and redirect to records
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords do not match!");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password,
      );
      await createUserDocumentFromAuth(user, { displayName });
      navigateTo("/");
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("cannot create user");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  return (
    <div className="m-10 rounded p-2 shadow-md">
      <span className="mb-10 font-bold text-gray-700">
        Sign up with your email and password
      </span>
      <form
        className="flex flex-col items-center rounded px-5"
        action=""
        onSubmit={handleSubmit}
      >
        <FormInput
          required
          type="text"
          label="Display name"
          name="displayName"
          placeholder="name"
          value={displayName}
          onChange={handleChange}
        />

        <FormInput
          required
          type="email"
          label="Email"
          name="email"
          placeholder="email"
          value={email}
          onChange={handleChange}
        />

        <FormInput
          required
          type="password"
          label="Password"
          name="password"
          placeholder="password"
          value={password}
          onChange={handleChange}
        />

        <FormInput
          required
          type="password"
          label="Confirm password"
          name="confirmPassword"
          placeholder="confirm password"
          value={confirmPassword}
          onChange={handleChange}
        />
        <ButtonBlue>Sign Up</ButtonBlue>
      </form>
    </div>
  );
};

export default SignUpForm;

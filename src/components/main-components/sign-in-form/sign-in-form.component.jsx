import { useState } from "react";

import { signInAuthUserWithEmailAndPassword } from "../../../firebase_config/firebase-auth.config";
import ButtonBlue from "../../helper-components/button-blue/button-blue.component";
import FormInput from "../../helper-components/form-input/form-input.component";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  //on submit - try to log in authorized user with email and password
  //when success redirect to records
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        alert("incorrect password or email");
      }
    }
  };

  return (
    <div className="mb-2 rounded p-2 text-left shadow-md">
      <span className="mb-2 px-8 text-left text-gray-700">Sign in</span>
      <form
        className="flex flex-col items-center rounded px-5"
        onSubmit={handleSubmit}
      >
        <FormInput
          required
          label="Email"
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={handleChange}
        />

        <FormInput
          required
          label="Password"
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={handleChange}
        />
        <div className="flex flex-col">
          <ButtonBlue>Sign In</ButtonBlue>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;

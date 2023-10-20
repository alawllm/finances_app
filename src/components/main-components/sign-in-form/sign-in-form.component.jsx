import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signInAuthUserWithEmailAndPassword } from "../../../firebase_config/firebase-auth.config";
import Button from "../../helper-components/button/button.component";
import FormInput from "../../helper-components/form-input/form-input.component";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const navigateTo = useNavigate();

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
      navigateTo("/records");
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
          <Button>Sign In</Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;

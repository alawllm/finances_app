import { useState } from "react";
import { signInAuthUserWithEmailAndPassword } from "../../../firebase_config/firebase-auth.config";
import { useNavigate } from "react-router-dom";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

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
    //target gives the input
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  //on submit - try to log in authorized user with email and password
  //when success redirect to records
  //when error display error
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
      navigateTo("/records");
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
    <div className="p-2 m-5 rounded shadow-md">
      {/* block text-gray-700 text-sm font-bold mb-2 */}
      <h2 className=" text-gray-700 font-bold mb-2 mt-2">
        Already have an account?
      </h2>
      <span className=" text-gray-700 font-bold mb-2">
        Sign in with your email and password
      </span>
      {/* form should not be submitable until the fields are filled  */}
      <form
        className="flex flex-col items-center rounded px-8"
        action=""
        onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

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
        </div>
      </form>
    </div>
  );
};

export default SignInForm;

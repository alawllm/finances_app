import SignIn from "../../helper-components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../helper-components/sign-up-form/sign-up-form.component";

const Authentication = () => {
  return (
    <>
      <div className="mt-20 mb-20 flex flex-col lg:flex-row items-baseline lg:items-center min-h-screen">
        <SignIn />
        <SignUpForm />
      </div>
    </>
  );
};

export default Authentication;

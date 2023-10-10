import SignIn from "../../main-components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../main-components/sign-up-form/sign-up-form.component";

const Authentication = () => {
  return (
    <>
      <div className="mb-20 mt-20 flex min-h-screen flex-col items-baseline lg:flex-row lg:items-center">
        <SignIn />
        <SignUpForm />
      </div>
    </>
  );
};

export default Authentication;

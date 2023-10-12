import SignIn from "../../main-components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../main-components/sign-up-form/sign-up-form.component";

const Authentication = () => {
  return (
    <>
      <div className="flex h-full min-h-screen flex-col items-baseline sm:mt-20 lg:flex-row lg:items-center">
        <SignIn />
        <SignUpForm />
      </div>
    </>
  );
};

export default Authentication;

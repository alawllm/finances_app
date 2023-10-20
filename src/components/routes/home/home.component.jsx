import { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../../contexts/user.context";
import { signOutUser } from "../../../firebase_config/firebase-auth.config";
import SignInForm from "../../main-components/sign-in-form/sign-in-form.component";

const Home = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <>
      <div className="top-0 flex w-full flex-col items-center text-center">
        <div className="w-full max-w-xl bg-white p-4 text-right">
          {currentUser && (
            <span
              onClick={signOutUser}
              className="mt-8 rounded-full p-4 px-5 text-lg font-bold text-blue-900 hover:text-blue-600 hover:underline"
            >
              Sign out
            </span>
          )}
        </div>
        <div className="mb-20 mt-16 flex h-48 w-48 flex-col items-center justify-center rounded-full bg-blue-100 p-10">
          <h1 className="text-5xl font-bold">💰</h1>
          <h2 className="mt-2 font-adlam text-3xl font-bold text-blue-500">
            moniez
          </h2>
        </div>
        {currentUser ? (
          <>
            <Link
              className="mt-10 rounded-full bg-blue-200 p-4 px-5 text-xl font-bold text-blue-900 hover:bg-blue-300"
              to="/records"
            >
              Go to your records
            </Link>
          </>
        ) : (
          <>
            <SignInForm />
            <p className="mb-16 text-left">
              Do not have an account?
              <Link
                className="p-2 text-blue-700 hover:underline"
                to="/authentication"
              >
                Sign up
              </Link>
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default Home;

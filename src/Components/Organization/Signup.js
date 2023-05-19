import React from "react";
import "react-toastify/dist/ReactToastify.css";
import SignupBg from "../../Sub-Components/SignupBg";
import SignupForm from "../../Sub-Components/SignupForm";
import '../../Styles/signup.css'

export default function Signup() {

  return (
      <React.Fragment>
          <div className="d-flex">
              <SignupBg />
              <SignupForm />
            </div>
      </React.Fragment>
  );
}

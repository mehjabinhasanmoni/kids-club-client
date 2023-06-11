import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";

const Login = () => {
  const { signIn, googleProvider } = useContext(AuthContext);
  const [error, setError] = useState("");

  // Location Hooks
  const navigate = useNavigate();
  const location = useLocation();

  // Generating Url
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    // Sign In User
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
            title: 'User Login Successfull',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          });
          
        setError("");

        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    googleProvider()
      .then((result) => {
        const googleUser = result.user;
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log("Google sign in error", error);
      });
  };

  return (
    <div>
      <h2>Please Login!!</h2>

      <div className="hero m-5">
          
          <div className="card w-1/2 shadow-2xl bg-base-100 p-10">
          <h2 className="text-3xl text-center">Login!!</h2>
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-primary"
                />
              </div>

              <p
              onClick={handleGoogleSignIn}
              className="btn btn-outline btn-secondary"
            >
             
              <FaGoogle></FaGoogle> &nbsp;&nbsp;SignIn with Google
            </p>
            </form>
            

            <p className="mt-5">
              New an Account?
              <Link to="/register" className="font-bold text-green-600">
                Register
              </Link>
            </p>
          </div>
        </div>
      
    </div>
  );
};

export default Login;

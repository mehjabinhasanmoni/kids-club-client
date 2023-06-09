import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log(data)       
};


  const { createUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Location Hooks
  const navigate = useNavigate();
  const location = useLocation();

  // Generating Url
  const from = location.state?.from?.pathname || "/";

  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.cPassword.value;
    console.log(name, photo, email, password, confirmPassword);

    // Create User and update user name & photo
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setError("");
        event.target.reset();
        setSuccess("User has created successfully");

        updateProfileUser(result.user, name, photo);
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  // Update Profile
  const updateProfileUser = (user, name, photourl) => {
    updateProfile(user, {
      displayName: name,
      photoURL: photourl,
    })
      .then(() => {
        console.log("username & Photo updated");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <h2>Please Register!!</h2>

      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  name="name"
                  placeholder="Type Your Full Name "
                  className="input input-bordered"
                />
                {errors.name && <span className="text-red-600">This field is required</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  {...register("photo", { required: true })}
                  name="photo"
                  placeholder="Photo URL Please "
                  className="input input-bordered"
                />
                {errors.photo && <span className="text-red-600">This field is required</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && <span className="text-red-600">This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", { required: true, minLength: 6 })}
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password?.type === 'required' && <span className="text-red-600">This field is required & give minimum 6 digit character</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  {...register("cPassword", { required: true, minLength: 6 })}
                  name="cPassword"
                  placeholder="Confirm Password"
                  className="input input-bordered"
                />
                {errors.cPassword && <span className="text-red-600">This field is required & give minimum 6 digit character</span>}
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
            </form>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Register = () => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();


  const onSubmit = data => {
    console.log(data);

    // Create User and update user name & photo

    createUser(data.email, data.password)
    .then((result) => {
        const user = result.user;
        console.log(user);

        updateUserProfile(data.name, data.photo)
        .then(() => {
            console.log('User Profile Updated');
            reset();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Registration SuccessFully Done',
                showConfirmButton: false,
                timer: 1500
              });
              navigate('/');
        })  
        .catch((error) => {
        console.log(error.message);
        
      });
  });
  }

// TODO : CONFIRM PASSWORD MATCH WITH PASSWORD

  

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
                  {...register("password", {
                     required: true,
                     minLength: 6,
                     pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                     })}
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password?.type === 'required' && <span className="text-red-600">Password is required</span>}
                {errors.password?.type === 'minLength' && <span className="text-red-600">Give minimum 6 digit character</span>}
                {errors.password?.type === 'pattern' && <span className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  {...register("cPassword", { 
                    required: true
                 })}
                  name="cPassword"
                  placeholder="Confirm Password"
                  className="input input-bordered"
                />
                {errors.cPassword && <span className="text-red-600">This field is required</span>}
                
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Register"
                  className="btn btn-secondary"
                />
              </div>
            </form>
            <p><small>Already have an account <Link to="/login">Login</Link></small></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

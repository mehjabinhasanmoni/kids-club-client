import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";

const Register = () => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { createUser, updateUserProfile, googleProvider } = useContext(AuthContext);
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
          const saveUser = {name: data.name, email: data.email }
          fetch('http://localhost:5000/users',{
            method : 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(saveUser)

          })
          .then(res => res.json())
          .then(data => {
            if(data.insertedId){
              reset();
              Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Registration SuccessFully Done',
                  showConfirmButton: false,
                  timer: 1500
                });
                navigate('/');

            }
          })
            
          
        })  
        .catch((error) => {
        console.log(error.message);
        
      });
  });
  }

// TODO : CONFIRM PASSWORD MATCH WITH PASSWORD

  // Google Sign In
  const handleGoogleSignIn = async () => {
    googleProvider()
      .then((result) => {
        const googleUser = result.user;
        const saveUser = {name: googleUser.displayName, email: googleUser.email }
        fetch('http://localhost:5000/users',{
          method : 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(saveUser)

        })
        .then(res => res.json())
        .then(() => { 
            navigate('/', { replace: true });
        })

        
      })
      .catch((error) => {
        console.log("Google sign in error", error);
      });
  };

  return (
    <div>
      

      <div className="hero m-5">
      
          <div className="card w-2/4  shadow-2xl bg-base-100 p-10">
            <h2 className="text-3xl text-center">Please Register!!</h2>
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

              <p
              onClick={handleGoogleSignIn}
              className="btn btn-outline btn-secondary"
            >
             
              <FaGoogle></FaGoogle> &nbsp;SignIn with Google
            </p>

            </form>
            <p><small>Already have an account <Link to="/login" className="font-bold text-green-600">Login</Link></small></p>
          </div>
        
      </div>
    </div>
  );
};

export default Register;

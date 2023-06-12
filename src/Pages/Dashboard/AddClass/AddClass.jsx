import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
const img_hosting_token = import.meta.env.VITE_Image_Upload_token;
console.log(img_hosting_token);

const AddClass = () => {
  const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { handleSubmit, register, reset, formState: { errors } } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`
    const onSubmit = data => {
        console.log(data)

        // Image upload in server

        const formData = new FormData();
        formData.append('image', data.photo[0])

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())



        .then(imgResponse => {
            if(imgResponse.success){
                const photoURL = imgResponse.data.display_url;
                const { classname,insname, email, availseats, price, classstatus, totalenrolledstudents, feedback} = data;
                const newItem = {classname, insname, email, availseats,  price: parseFloat(price), classstatus, totalenrolledstudents:parseFloat(totalenrolledstudents), feedback, photo:photoURL}
                console.log(newItem)
                axiosSecure.post('/classes', newItem)
                .then(data => {
                    console.log('after posting new class', data.data)
                    if(data.data.insertedId){
                        reset();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Class added successfully',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }
                })
            }
        })

    };

  return (
    <>
      <div className="hero p-10">
        
        <div className="card w-full shadow-2xl p-10">
        <h2 className="text-center text-3xl tracking-wider ">Add Classes </h2>
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-around items-center">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold ml-2">Name of Class*</span>
                </label>
                <input
                  type="text"
                  name="classname"
                  {...register("classname", {
                    required : true
                  })}
                  placeholder="Name of Class"
                  className="input input-bordered"
                />
                {errors.classname && <span className="text-red-600">Class Name is required</span>}
              </div>
              <div className="form-control">
              <label className="label">
                  <span className="label-text font-bold">Image of Class*</span>
                </label>
              <input
              type="file"
              name="photo"
              {...register("photo", {
                required : true
              })}
              className="file-input file-input-bordered file-input-accent w-full max-w-xs"
            />
            {errors.photo && <span className="text-red-600">Photo is required</span>}

              </div>
            </div>

            <div className="flex justify-around items-center">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Instructor Name*</span>
                </label>
                <input
                  type="text"
                  name="insname"
                  defaultValue={user?.displayName}
                  {...register("insname", {
                    required : true
                  })}
                
                  placeholder="Instructor Name"
                  className="input input-bordered"
                  readOnly
                />
            {errors.insname && <span className="text-red-600">Instructor Name is required</span>}

              </div>
              <div className="form-control">
              <label className="label">
                  <span className="label-text font-bold">Instructor Email*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={user?.email}
                  {...register("email", {
                    required : true
                  })}
                  placeholder="Instructor Email"
                  className="input input-bordered"
                  readOnly
                />
            {errors.email && <span className="text-red-600">Instructor Email is required</span>}

              </div>
            </div>

            <div className="flex justify-around items-center">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Available Seats*</span>
                </label>
                <input
                  type="number"
                  name="availseats"
                  {...register("availseats", {
                    required : true
                  })}
                  placeholder="Available Seats"
                  className="input input-bordered"
                />
            {errors.availseats && <span className="text-red-600">Available Seats is required</span>}

              </div>
              <div className="form-control">
              <label className="label">
                  <span className="label-text font-bold">Price*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  {...register("price", {
                    required : true
                  })}
                  placeholder="Price"
                  className="input input-bordered"
                />
                 {errors.price && <span className="text-red-600">Price is required</span>}
              </div>
              <div className="form-control">
                <input
                  type="hidden"
                  name="classstatus"
                  defaultValue="pending" 
                  {...register("classstatus")}
                  
                />
                 
              </div>
              <div className="form-control">
                <input
                  type="hidden"
                  name="totalenrolledstudents"
                  defaultValue="0" 
                  {...register("totalenrolledstudents")}
                  
                />
                
              </div>
              <div className="form-control">
                <input
                  type="hidden"
                  name="feedback"
                  defaultValue=" " 
                  {...register("totalenrolledstudents")}
                  
                />
                
              </div>
            </div>

            
            <div className="form-control mt-6">
              <input type="submit" value="Add Class" className="btn btn-accent" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddClass;

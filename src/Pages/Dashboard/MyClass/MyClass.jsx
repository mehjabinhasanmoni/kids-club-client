import useClass from "../../../hooks/useClass";


const MyClass = () => {
    const [ sClass] = useClass();
    console.log(sClass);



    return (
        <>
            <h2 className="text-center text-3xl tracking-wider mt-10">My Classes</h2>

            <div className="overflow-x-auto mt-20">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Class Cover</th>
        <th>Class Name</th>
        <th>Available Seats</th>
        <th>Price</th>
        <th>Total Enrollment Students</th>
        <th>Status</th>
        <th>Feedback</th>
        <th>Action</th>
        
      </tr>
    </thead>
    <tbody>
      {
        sClass.map((sIClass, index) => 
            <tr key={sIClass._id}>
        <th> { index + 1 }</th>
        <td>
            <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={sIClass.photo} alt="Avatar Tailwind CSS Component" />
                                        </div>
            </div></td>
        <td>{sIClass.classname}</td>
        <td>{sIClass.availseats}</td>
        <td>{sIClass.price}</td>
        <td>{sIClass.totalenrolledstudents}</td>
        <td>{sIClass.classstatus}</td>
        <td>{sIClass.feedback}</td>
        <td><button className="btn btn-ghost bg-lime-800  text-white">Update</button></td>
      </tr>

    )
      }
      
    
    </tbody>
  </table>
</div>
        </>
    );
};

export default MyClass;
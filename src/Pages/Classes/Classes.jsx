import useApprovedClasses from "../../hooks/useApprovedClasses";

const Classes = () => {
  const [approvedclasses] = useApprovedClasses();
  console.log("approved Classes", approvedclasses);
  return (
    <div className=" grid grid-cols-4 gap-10 mt-10">
    {
        approvedclasses.map((aClass, index) => {
            return <div key={index} className="card w-96 bg-sky-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img
                src={aClass.photo}
                alt="Classs Image"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{aClass.classname}</h2>
              <p>{aClass.insname}</p>
              <p>Available Seats : {aClass.availseats}</p>
              <p>Price : {aClass.price}</p>

              <div className="card-actions">
                <button className="btn btn-secondary">Select Class</button>
              </div>
            </div>
          </div>
        } )
    }
      
    </div>
  );
};

export default Classes;

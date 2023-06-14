
import useEnrollment from '../../../hooks/useEnrollment';

const EnrolledClass = () => {
  const [enrollment] = useEnrollment();

    return (
      <>
      <h2 className="text-center text-3xl tracking-wider mt-10">
        All Enrollment Classes
      </h2>

      <div className="overflow-x-auto mt-20 p-10">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Class Cover</th>
              <th>Class Name</th>
              <th>Instructor Name</th>
            </tr>
          </thead>
          <tbody>
            {enrollment.map((eClass, index) => (
              <tr key={eClass._id}>
                <th> {index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={enrollment.photo}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>{eClass.classname}</td>
                <td>{eClass.insname}</td>
              
                

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
    );
};

export default EnrolledClass;
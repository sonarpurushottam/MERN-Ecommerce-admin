// import { useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
// import { useDeleteUser } from "../hooks/useDeleteUser";
import toast, { Toaster } from "react-hot-toast";
// import { FiEdit, FiTrash2 } from "react-icons/fi";

const UsersList = () => {
  // const navigate = useNavigate();
  const { data: users = [], isError, isLoading } = useUsers();
  // const { mutate: deleteUser, isLoading: isDeleting } = useDeleteUser();

  if (isError) {
    toast.error("Failed to fetch users.");
  }

  // const handleDelete = (userId) => {
  //   if (window.confirm("Are you sure you want to delete this user?")) {
  //     deleteUser(userId);
  //   }
  // };

  // const handleEdit = (userId) => {
  //   navigate(`/edit-user/${userId}`);
  // };

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Users List</h2>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Mobile</th>
                <th className="px-4 py-2 text-left">Role</th>
                {/* <th className="px-4 py-2 text-left">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b border-gray-300">
                    {user.username}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {user.email}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {user.mobile}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {user.role}
                  </td>
                  {/* <td className="px-4 py-2 border-b border-gray-300 flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(user._id)}
                      className="text-blue-500 hover:text-blue-700 transition duration-150 ease-in-out"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-500 hover:text-red-700 transition duration-150 ease-in-out"
                      disabled={isDeleting}
                    >
                      <FiTrash2 />
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsersList;

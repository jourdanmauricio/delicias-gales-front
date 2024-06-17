import getAllUsers from '@/utils/api/users/getAllUsers';
import UsersTable from './UsersTable/UsersTable';

const Users = async () => {
  const users = await getAllUsers();
  console.log("users", users)
  return (
    <div className='pt-16'>
      <UsersTable users={users} />
    </div>
  )
}
export default Users;
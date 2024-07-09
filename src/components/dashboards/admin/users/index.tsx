import getAllUsers from '@/utils/api/users/getAllUsers';
import UsersTable from './UsersTable/UsersTable';

const Users = async () => {
  const users = await getAllUsers();
  return (
    <UsersTable users={users} />
  )
}
export default Users;
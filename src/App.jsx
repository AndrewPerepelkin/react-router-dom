import React from 'react';
import {
  Route,
  Navigate,
  NavLink,
  Outlet,
  Routes,
  useParams,
} from 'react-router-dom';

const users = [1, 2, 3, 4, 5];

const MainPage = () => <h1>Main Page</h1>;

const UsersListPage = () => {
  return (
    <>
      <h1>Users List</h1>
      {users.map(user => (
        <div key={user}><NavLink to={user + '/profile'}>User {user}</NavLink></div>
      ))}
    </>
  );
};

const EditUserPage = () => {
  const { userId } = useParams();
    return (
        <>
            <h1>Edit User Page</h1>
            <ul>
                <li>
                    <NavLink to={'/users/' + userId}>User profile</NavLink>
                </li>
                <li>
                    <NavLink to={'/users/' + (Number(userId) + 1)}>
                        Next User
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/users'}> Users List page</NavLink>
                </li>
            </ul>
        </>
    );
};

const UsersLayout = () => {
  return (
    <>
      <h1>Users Layout</h1>
      <NavLink to='/'>Main Page</NavLink>
      <Outlet/>
    </>
    );
};
 
const UserProfilePage = () => {
  const { userId } = useParams();
  return (
        <div>
            <h1>UserPage</h1>
                <div>
                    <NavLink to='/users'>Users List page</NavLink>
                </div>
                <div>
                    <NavLink to={`/users/${userId}/edit`}>
                        Edit this user
                    </NavLink>
                </div>
            
            <div>User Id: {userId}</div>
        </div>
    );
}

function App() {
  return (
    <>
      <h1>App</h1>
      <NavLink to='/users'>Users list Page</NavLink>
      <Routes>
        <Route path='/' element={<MainPage/>} />
        <Route path='/users' element={<UsersLayout />}>
          <Route index element={<UsersListPage />} />
          <Route path=':userId' element={<Outlet />}>
            <Route path='profile' element={<UserProfilePage />} />
            <Route path='edit' element= {<EditUserPage />} />
            <Route index element= {<Navigate to='./profile' />} />
            <Route path='*' element={<Navigate to='../profile' />} />
          </Route>
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  );
};

export default App;
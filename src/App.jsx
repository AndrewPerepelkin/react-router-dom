import React from 'react';
import {
  NavLink,
  Redirect,
  Route,
  Switch,
  useParams,
  useRouteMatch
} from 'react-router-dom';

const users = [1, 2, 3, 4, 5];

const MainPage = () => <h1>Main Page</h1>;

const UsersListPage = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <h1>Users List</h1>
      {users.map(user => (
        <div key={user}><NavLink to={`${path}/${user}`}>User {user}</NavLink></div>
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
                    <NavLink to={"/users/" + userId}>User profile</NavLink>
                </li>
                <li>
                    <NavLink to={"/users/" + (Number(userId) + 1)}>
                        Next User
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/users"}> Users List page</NavLink>
                </li>
            </ul>
        </>
    );
};

const UsersLayout = () => {
  const { path } = useRouteMatch();
    return (
        <div>
            <h1>Users Layout</h1>
            <NavLink to='/'>Main Page</NavLink>
            <Switch>
                <Route
                    path={path + "/:userId/profile"}
                    component={UserProfilePage}
                />
                <Route path={path + "/:userId/edit"} component={EditUserPage} />
                <Route path={path} exact component={UsersListPage} />
                <Redirect
                    from={path + "/:userId"}
                    to={path + "/:userId/profile"}
                />
            </Switch>
        </div>
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
      <Switch>
          <Route path='/users' component={UsersLayout} />
          <Route path='/' component={MainPage} />
          <Redirect to='/' />
      </Switch>
    </>
  );
};

export default App;
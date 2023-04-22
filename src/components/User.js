import Button from './Button';

const User = ({userData, logoutHandler}) => {
    if(Object.keys(userData).length === 0){
        return;
    }
    else
        return (
          <div>
            <p>
                User found: {userData["display_name"]}
            </p>
            <p>
                Not you? <Button onClick={logoutHandler} text="Log out"/>
            </p>
          </div>
        );
}

export default User;
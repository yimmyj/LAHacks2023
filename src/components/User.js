import Button from './Button';

const User = ({userData, logoutHandler}) => {
    if(Object.keys(userData).length === 0){
        return;
    }
    else
        return (
          <div>
            <p className= "user1">
                Welcome {userData["display_name"]}
            </p>
            <p className= "user2">
                Not you? <Button className="button" onClick={logoutHandler} text="Log out"/>
            </p>
          </div>
        );
}

export default User;
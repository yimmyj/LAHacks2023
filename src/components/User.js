import Button from './Button';

const User = ({userData, logoutHandler}) => {
    if(Object.keys(userData).length === 0){
        return;
    }
    else
        return (
          <div className='div1'>
            <p className= "user1">
                Welcome {userData["display_name"]}
            </p>
                <Button className="button" onClick={logoutHandler} text="Log out"/>
          </div>
        );
}

export default User;
import workspace from './workspace.png'
import LoginField from "./LoginField"
import Button from "./Button"
import "./LoginPage.css"
const LoginPage = () => {
    return (
        <div>
            <div className='logo'>Pharmasoft</div>
            <img src={workspace} alt='icon'className='icon'/>
             <div className='loginPage'>
                 <LoginField/>
                 <Button/>
                 <div className='forgotPassword'>
                    Forgot password?
                 </div>
                 <div className='signup'>
                    <a href='#'>signup</a>
                 </div>
            </div>
          
        </div>
    )
}

export default LoginPage

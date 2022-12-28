import { useState } from 'react';
import { toast } from 'react-hot-toast';
import './login.css';
import axios from 'axios';

function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const signin = () => {
        axios.post('/api/user/signin', {email, password})
            .then(resp => console.log(resp))
            .catch(err => {
                console.log(err, ' ERR ON LOGIN');
                toast.error(err.response.data);
            });
    }

    return (
        <span className="login">
            <h2>test</h2>
            <h1>Log In To Form Builder</h1>
            <input className="login__field"placeholder="email" name="username" onChange={e => setEmail(e.target.value)}/> <br/>
            <input className="login__field" placeholder="password" name="password" type="password" onChange={e => setPassword(e.target.value)}/> <br/>
            <button type="submit" onClick={signin}>Submit</button>
        </span>
    )
}

export default Login;

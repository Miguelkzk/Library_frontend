import React, { useState } from 'react';
import { Form, FormControl, Button, InputGroup } from 'react-bootstrap';
import { UserService } from '../service/UserService';
import { useNavigate } from 'react-router-dom';



function LoginForm() {
  const [user, setUser] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const userlogeed = await UserService.login(user)
      localStorage.setItem('token', userlogeed.token)
      navigate('/')
    }
    catch (error) {
      console.log(error)
    }

  };

  return (
    <div className='container' style={{ width: '40%', marginTop: '3rem' }}>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <FormControl
            type="text"
            placeholder="Enter your username"
            name="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <FormControl
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </InputGroup>

        </Form.Group>

        <div className="d-flex justify-content-center align-items-center" >
          <Button style={{ width: '6rem' }} onClick={handleLogin}>Login</Button>
        </div>
      </Form>
    </div>
  );
}

export default LoginForm;

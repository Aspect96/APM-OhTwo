import './Login.css'

// TODO: loadUser. I used saveUser here for testing. But will be needed anyway.
const Login = ({ saveUser }) => {
  const testUser = {
    username: 'test',
    password: 'test'
  }
  return (
    <div class="Login">
      <h2>Login</h2>
      <input />

      <input />

      <button onClick={saveUser(testUser)}>Login</button>
    </div>
  );
}

export default Login;
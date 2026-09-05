import React, { useState } from 'react';
function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/login' : '/api/register';
    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`Success: ${data.message}`);
        // auto back to login if reg success
        if (!isLogin) setIsLogin(true);
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage("Error: Server connection failed");
    }
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px', fontFamily: 'sans-serif' }}>
      <div style={{ width: '300px', padding: '30px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center' }}>{isLogin ? 'System Login' : 'Create Account'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '5px', fontSize: '14px' }}>Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            style={{ marginBottom: '15px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            required 
          />
          <label style={{ marginBottom: '5px', fontSize: '14px' }}>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ marginBottom: '20px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            required 
          />
          <button type="submit" style={{ padding: '10px', backgroundColor: '#0066cc', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <button 
          type="button"
          onClick={() => { setIsLogin(!isLogin); setMessage(''); }} 
          style={{ width: '100%', marginTop: '15px', padding: '10px', backgroundColor: 'transparent', border: 'none', color: '#0066cc', cursor: 'pointer', textDecoration: 'underline' }}>
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </button>
        {message && (
          <div style={{ marginTop: '20px', padding: '10px', textAlign: 'center', backgroundColor: message.includes('Success') ? '#d4edda' : '#f8d7da', color: message.includes('Success') ? '#155724' : '#721c24', borderRadius: '4px' }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
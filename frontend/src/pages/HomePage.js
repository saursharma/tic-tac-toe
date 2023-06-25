import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Game from '../components/Game'
import Cookies from 'js-cookie';

const HomePage = () => {
  const navigate = useNavigate();
  const playerName = Cookies.get('username');
  const [player ] = useState(playerName);
  const [opponentName, setOpponentName] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const handleOpponentNameChange = (event) => {
    setOpponentName(event.target.value);
  };

  const handleStartPlaying = () => {
    Cookies.set('opponentName', opponentName);
    setIsPlaying(true);
  };

  const handleLogout = () => {
    // Delete JWT and username cookies
    Cookies.remove('jwt');
    Cookies.remove('username');

    // Redirect to the login page
    navigate('/login');
  };

  const renderForm = () => {
    return (
      <form>
        <TextField
          label="Enter Opponent's Name"
          variant="outlined"
          value={opponentName}
          onChange={handleOpponentNameChange}
          fullWidth
          margin="normal"
        />
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={handleStartPlaying}
        >
          Start Playing
        </Button>
      </form>
    );
  };

  return (
    <div>
      <h2>Home Page</h2>
      <Button variant="contained" color="primary" onClick={handleLogout} style={{float: "right"}}>
        Logout
      </Button>
      {isPlaying ? (
        <div>
          <Game player={player} opponent={opponentName}/>
        </div>
       ) : (
          renderForm()
       )}
    </div>
  );
};

export default HomePage;

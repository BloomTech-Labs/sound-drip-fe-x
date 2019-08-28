import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
export const authEndpoint = 'https://accounts.spotify.com/authorize';

const clientId = '256aebf9b04a4f5480a757f770864028'; // testing ENV
const redirectUri = 'http://localhost:3000/'; // has to match exactly with spotify dashboard redirect uri
const scopes = [
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-library-read',
];

const hash = window.location.hash
  .substring(1)
  .split('&')
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

window.location.hash = '';

// Material styling

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

// const classes = useStyles();

export class Auth extends Component {
  componentDidMount() {
    let _token = hash.access_token;
    console.log('TOKEN', _token);
    console.log('HASH TOKEN', hash.access_token);
    if (_token) {
      localStorage.setItem('token', _token);
      // window.location.href = '/dashboard';
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div>
        <Button
          variant='contained'
          className={useStyles.button}
          href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
            '%20',
          )}&response_type=token&show_dialog=true`}>
          Login
        </Button>
      </div>
    );
  }
}

export default Auth;

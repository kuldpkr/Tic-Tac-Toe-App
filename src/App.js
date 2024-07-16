import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Main from './Main.js';

function App() {
  const [ user, setUser ] = useState([]);
  const [ profile, setProfile ] = useState({});

  const login = useGoogleLogin({
      onSuccess: (codeResponse) => setUser(codeResponse),
      onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(
      () => {
          if (user) {
              axios
                  .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                      headers: {
                          Authorization: `Bearer ${user.access_token}`,
                          Accept: 'application/json'
                      }
                  })
                  .then((res) => {
                      setProfile(res.data);
                  })
                  .catch((err) => console.log(err));
          }
      },
      [ user ]
  );

  useEffect(
    () => {
      const callAPI = async () => {
        if(profile && Object.keys(profile).length > 0){
          const api_url = "https://backend-tic-tac-toe-phb3.onrender.com/api/users";
          try {
            await axios.post(api_url, {
                name: profile.name,
                email: profile.email
            });
            console.log("APP__useEffect [profile]: api called");
  
          } catch (error) {
              console.log('APP_handleUserLogin: error in api call', error);
          }
        }
      }
      callAPI();

    },
    [profile]
  );

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
      googleLogout();
      setProfile(null);
  };

  return (
      <div>
          <h1 style={{fontSize: '3em', marginBottom: '0px'}}>Tic Tac Toe</h1>
          {profile && Object.keys(profile).length > 0 ? (
              <div>
                  {/* <img src={profile.picture} alt="User Icon" /> */}
                  {/* <h3>User Logged in</h3> */}
                  <p>{profile.name}</p>
                  {/* <p>Email Address: {profile.email}</p> */}
                  <button onClick={logOut}>Log out</button>
                  <br></br>
                  <Main />
              </div>
          ) : (
              <React.Fragment>
                <p>Please sign in with Google to continue.</p>
                <button onClick={() => login()}>Sign in with Google</button>
              </React.Fragment>
          )}
      </div>
  );
}
export default App;

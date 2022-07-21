import {createContext, useContext, useEffect, useState} from "react";
import {authConfig} from "../config";
import axios from "axios";

export class TokenResponse {
  access_token: string;
  id_token: string;
  scope: string;
}

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const {accessToken, setAccessToken} = useAccessToken();
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [tokenFetching, setTokenFetching] = useState(false);
  const [tokenError, setTokenError]: [string | undefined, any] = useState();

  const handleSignIn = () => {
    let redirectUrl = new URL(authConfig.authorizeUrl);
    redirectUrl.searchParams.set("scope", authConfig.scope);
    redirectUrl.searchParams.set("redirect_uri", authConfig.redirectUrl);
    redirectUrl.searchParams.set("client_id", authConfig.clientId);
    redirectUrl.searchParams.set("response_type", "code");
    window.location.href = redirectUrl.toString();
  };

  const signIn = async (authCode: string) => {
    setTokenFetching(true);
    setTokenError(null);
    let params = new URLSearchParams();
    params.set("client_id", authConfig.clientId);
    params.set("code", authCode);
    params.set("grant_type", "authorization_code");
    params.set("redirect_uri", authConfig.redirectUrl);
    try {
      let response = await axios.post(
        authConfig.tokenUrl,
        params.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );
      console.log(response.data);
      let tokenResponse: TokenResponse = response.data;
      setAccessToken(tokenResponse.access_token);
      // TODO Validate Token
      setAuthenticated(true);
    } catch (e) {
      console.log("Failed to fetch token", e.response?.data);
      setTokenError("Failed to obtain a token with provided auth code");
    } finally {
      setTokenFetching(false);
    }
  };

  const signOut = () => {
    setAccessToken(null);
    setAuthenticated(false);
  }

  useEffect(() => {
    if (accessToken) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        idToken: accessToken,
        isAuthenticated,
        progress: tokenFetching,
        signInError: tokenError,
        handleSignIn,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
};

class AuthContextType {
  accessToken: string;
  isAuthenticated: boolean;
  progress: boolean;
  signInError: string | null;
  handleSignIn: () => void;
  signIn: (authCode: string) => Promise<void>;
  signOut: () => void;
}

export const useAuth = (): AuthContextType => useContext(AuthContext);

export const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token"));

  const saveAccessToken = (token) => {
    localStorage.setItem("access_token", token);
    setAccessToken(token);
  }

  return {
    accessToken: accessToken,
    setAccessToken: saveAccessToken
  };
};

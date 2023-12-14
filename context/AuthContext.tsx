import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    Dispatch,
    SetStateAction,
  } from 'react';
  
  // Definisikan tipe data untuk informasi pengguna
  interface UserData {
    uuid: string | null;
    role: string | null;
    id: string | null;
    username: string | null;
    photo_profile: string | null;
    token: string | null;
  }
  
  // Buat tipe data untuk konteks autentikasi
  interface AuthContextProps {
    userData: UserData;
    setLoginData: Dispatch<SetStateAction<UserData>>;
  }
  
  // Buat konteks autentikasi
  export const AuthContext = createContext<AuthContextProps>({
    userData: {
      uuid: null,
      role: null,
      id: null,
      username: null,
      photo_profile: null,
      token: null,
    },
    setLoginData: () => null,
  });
  
  // Definisikan tipe data untuk provider autentikasi
  interface AuthProviderProps {
    children: ReactNode;
  }
  
  // Buat provider autentikasi
  export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [userData, setUserData] = useState<UserData>({
      uuid: null,
      role: null,
      id: null,
      username: null,
      photo_profile: null,
      token: null,
    });
  
    // Fungsi untuk mengatur data login
    const setLoginData = (data: UserData) => {
      setUserData(data);
    };
  
    return (
      <AuthContext.Provider value={{ userData, setLoginData }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  // Buat hook kustom untuk mengakses data autentikasi dari konteks
  export const useAuth = () => {
    return useContext(AuthContext);
  };
  
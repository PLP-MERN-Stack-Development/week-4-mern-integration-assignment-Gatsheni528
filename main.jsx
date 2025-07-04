import { AuthProvider } from './context/AuthContext';

<React.StrictMode>
  <AuthProvider>
    <PostProvider>
      <App />
    </PostProvider>
  </AuthProvider>
</React.StrictMode>

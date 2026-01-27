import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { ThemeProvider } from '@/hooks/useTheme';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { LoginPage } from '@/pages/LoginPage';
import { IndustrySelectPage } from '@/pages/IndustrySelectPage';
import { StorePage } from '@/pages/StorePage';
import type { ThemeName } from '@/types';

function StorePageWrapper() {
  const { industry } = useParams<{ industry: string }>();
  const themeName = (industry as ThemeName) || 'redmarket';

  return (
    <ThemeProvider defaultTheme={themeName} key={themeName}>
      <StorePage />
    </ThemeProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ThemeProvider defaultTheme="brainform">
            <LoginPage />
          </ThemeProvider>
        } />
        <Route path="/select" element={
          <ProtectedRoute>
            <IndustrySelectPage />
          </ProtectedRoute>
        } />
        <Route path="/demo/:industry" element={
          <ProtectedRoute>
            <StorePageWrapper />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

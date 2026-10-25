import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { ThemeProvider } from '@/hooks/useTheme';
import { DemoProvider } from '@/hooks/useDemo';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { LoginPage } from '@/pages/LoginPage';
import { IndustrySelectPage } from '@/pages/IndustrySelectPage';
import { StorePage } from '@/pages/StorePage';
import { REQUIRE_LOGIN } from '@/lib/access';
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

// With the gate off (see src/lib/access.ts) the entry point is the industry
// picker; LoginPage is kept wired up so flipping REQUIRE_LOGIN restores it.
function EntryPage() {
  if (!REQUIRE_LOGIN) {
    return <Navigate to="/select" replace />;
  }

  return (
    <ThemeProvider defaultTheme="brainform">
      <LoginPage />
    </ThemeProvider>
  );
}

function App() {
  return (
    <DemoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EntryPage />} />
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
    </DemoProvider>
  );
}

export default App;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LoginPage() {
  const navigate = useNavigate();
  const [login, setLogin] = useState('admin');
  const [password, setPassword] = useState('test');
  const [loginFocused, setLoginFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/select');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Brand */}
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        {/* Logo - absolute positioned */}
        <div className="absolute top-10 left-20 flex items-center gap-3 z-10">
          <BrainformLogo />
          <span
            className="text-xl font-semibold"
            style={{ color: 'var(--primary)' }}
          >
            brainform.ai
          </span>
        </div>

        {/* Geometric Art - fills entire panel */}
        <div className="absolute inset-0">
          <img
            src="/Frame 23.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bottom text - absolute positioned over image */}
        <div className="absolute bottom-10 left-20 z-10">
          <span
            className="inline-block px-5 py-2.5 rounded-full text-sm font-medium mb-5"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--primary) 7%, transparent)',
              color: 'var(--primary)'
            }}
          >
            Demo access
          </span>
          <h1
            className="text-4xl font-bold leading-tight"
            style={{ color: 'var(--neutral-900)' }}
          >
            The infrastructure
            <br />
            for agentic commerce
          </h1>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center px-20 py-10 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <BrainformLogo />
            <span
              className="text-xl font-semibold"
              style={{ color: 'var(--primary)' }}
            >
              brainform.ai
            </span>
          </div>

          <h2
            className="text-4xl font-bold text-center mb-2"
            style={{ color: 'var(--neutral-900)' }}
          >
            Log in
          </h2>
          <p
            className="text-center mb-10"
            style={{ color: 'var(--neutral-600)' }}
          >
            Demo access
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Login field */}
            <div>
              <label
                className="block text-xs mb-2"
                style={{ color: 'var(--neutral-600)' }}
              >
                Login
              </label>
              <div
                className={cn(
                  'flex items-center gap-2 px-4 py-3.5 rounded-xl transition-all duration-200',
                  loginFocused
                    ? 'ring-2 bg-white'
                    : 'bg-transparent'
                )}
                style={{
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: loginFocused ? 'var(--primary)' : 'var(--neutral-200)',
                  boxShadow: loginFocused ? '0 0 0 3px color-mix(in srgb, var(--primary) 12%, transparent)' : 'none',
                }}
              >
                <input
                  type="text"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  onFocus={() => setLoginFocused(true)}
                  onBlur={() => setLoginFocused(false)}
                  placeholder="Login"
                  className="flex-1 bg-transparent outline-none text-base"
                  style={{ color: 'var(--neutral-900)' }}
                />
                {login && (
                  <button
                    type="button"
                    onClick={() => setLogin('')}
                    className="p-1 rounded-full hover:bg-black/5 transition-colors"
                  >
                    <X
                      className="w-4 h-4"
                      style={{ color: 'var(--neutral-300)' }}
                    />
                  </button>
                )}
              </div>
            </div>

            {/* Password field */}
            <div>
              <label
                className="block text-xs mb-2"
                style={{ color: 'var(--neutral-600)' }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3.5 rounded-xl outline-none text-base"
                style={{
                  backgroundColor: 'var(--neutral-100)',
                  color: 'var(--neutral-900)',
                }}
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              <ArrowRight className="w-5 h-5" />
              <span>Login</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function BrainformLogo() {
  return (
    <img src="/Mask group.svg" alt="Brainform" className="w-8 h-8" />
  );
}


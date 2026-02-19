import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, X, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { analytics } from '@/lib/analytics';
import { resetOnboarding } from '@/lib/onboarding';

const VALID_PASSWORDS = ['brainform', '$$$$$$brainform$$$$$$'];

interface UserFormData {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
}

interface UserInfo extends UserFormData {
  userId: string;
}

// Generate unique user ID
function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [password, setPassword] = useState('');
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Step 2 fields
  const [userInfo, setUserInfo] = useState<UserFormData>({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (VALID_PASSWORDS.includes(password)) {
      setStep(2);
    } else {
      setError('Invalid password');
    }
  };

  const handleUserInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate required fields
    if (!userInfo.email.trim()) {
      setError('Email is required');
      return;
    }
    if (!userInfo.firstName.trim() || !userInfo.lastName.trim()) {
      setError('First name and last name are required');
      return;
    }

    // Generate unique user ID
    const fullUserInfo: UserInfo = {
      userId: generateUserId(),
      ...userInfo,
    };

    // Save user info and authenticate
    localStorage.setItem('brainform_auth', 'true');
    localStorage.setItem('brainform_user', JSON.stringify(fullUserInfo));

    // Reset onboarding for new user (will show tour)
    resetOnboarding();

    // Track login event
    analytics.trackLogin(fullUserInfo);

    navigate('/select');
  };

  const renderPasswordStep = () => (
    <form onSubmit={handlePasswordSubmit} className="space-y-5">
      {/* Password field */}
      <div>
        <label
          className="block text-xs mb-2"
          style={{ color: 'var(--neutral-600)' }}
        >
          Password
        </label>
        <div
          className={cn(
            'flex items-center gap-2 px-4 py-3.5 rounded-xl transition-all duration-200',
            passwordFocused
              ? 'ring-2 bg-white'
              : 'bg-transparent'
          )}
          style={{
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: passwordFocused ? 'var(--primary)' : 'var(--neutral-200)',
            boxShadow: passwordFocused ? '0 0 0 3px color-mix(in srgb, var(--primary) 12%, transparent)' : 'none',
          }}
        >
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            placeholder="Enter password"
            className="flex-1 bg-transparent outline-none text-base"
            style={{ color: 'var(--neutral-900)' }}
            autoFocus
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="p-1 rounded-full hover:bg-black/5 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" style={{ color: 'var(--neutral-400)' }} />
            ) : (
              <Eye className="w-4 h-4" style={{ color: 'var(--neutral-400)' }} />
            )}
          </button>
          {password && (
            <button
              type="button"
              onClick={() => setPassword('')}
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

      {/* Error message */}
      {error && (
        <div className="text-red-500 text-sm text-center py-2">
          {error}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white font-medium transition-all hover:opacity-90"
        style={{ backgroundColor: 'var(--primary)' }}
      >
        <ArrowRight className="w-5 h-5" />
        <span>Continue</span>
      </button>
    </form>
  );

  const renderInputField = (
    label: string,
    field: keyof UserFormData,
    placeholder: string,
    type: string = 'text',
    required: boolean = true
  ) => {
    const isFocused = focusedField === field;
    const value = userInfo[field];

    return (
      <div>
        <label
          className="block text-xs mb-2"
          style={{ color: 'var(--neutral-600)' }}
        >
          {label}{required ? '' : ' (optional)'}
        </label>
        <div
          className={cn(
            'flex items-center gap-2 px-4 py-3.5 rounded-xl transition-all duration-200',
            isFocused
              ? 'ring-2 bg-white'
              : 'bg-transparent'
          )}
          style={{
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: isFocused ? 'var(--primary)' : 'var(--neutral-200)',
            boxShadow: isFocused ? '0 0 0 3px color-mix(in srgb, var(--primary) 12%, transparent)' : 'none',
          }}
        >
          <input
            type={type}
            value={value}
            onChange={(e) => setUserInfo({ ...userInfo, [field]: e.target.value })}
            onFocus={() => setFocusedField(field)}
            onBlur={() => setFocusedField(null)}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none text-base"
            style={{ color: 'var(--neutral-900)' }}
          />
          {value && (
            <button
              type="button"
              onClick={() => setUserInfo({ ...userInfo, [field]: '' })}
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
    );
  };

  const renderUserInfoStep = () => (
    <form onSubmit={handleUserInfoSubmit} className="space-y-5">
      {renderInputField('Email', 'email', 'your@email.com', 'email')}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {renderInputField('First name', 'firstName', 'John')}
        {renderInputField('Last name', 'lastName', 'Doe')}
      </div>

      {renderInputField('Company', 'company', 'Company name', 'text', false)}

      {/* Error message */}
      {error && (
        <div className="text-red-500 text-sm text-center py-2">
          {error}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white font-medium transition-all hover:opacity-90"
        style={{ backgroundColor: 'var(--primary)' }}
      >
        <ArrowRight className="w-5 h-5" />
        <span>Get started</span>
      </button>
    </form>
  );

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

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div
              className="w-2 h-2 rounded-full transition-all"
              style={{
                backgroundColor: 'var(--primary)',
                opacity: step === 1 ? 1 : 0.3,
              }}
            />
            <div
              className="w-2 h-2 rounded-full transition-all"
              style={{
                backgroundColor: 'var(--primary)',
                opacity: step === 2 ? 1 : 0.3,
              }}
            />
          </div>

          <h2
            className="text-4xl font-bold text-center mb-2"
            style={{ color: 'var(--neutral-900)' }}
          >
            {step === 1 ? 'Welcome' : 'Your details'}
          </h2>
          <p
            className="text-center mb-10"
            style={{ color: 'var(--neutral-600)' }}
          >
            {step === 1 ? 'Enter password to continue' : 'Tell us about yourself'}
          </p>

          {step === 1 ? renderPasswordStep() : renderUserInfoStep()}
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

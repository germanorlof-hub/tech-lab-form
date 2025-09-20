import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/PasswordInput';
import { FormField } from '@/components/FormField';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface FormData {
  profileName: string;
  email: string;
  password: string;
}

interface FormErrors {
  profileName?: string;
  email?: string;
  password?: string;
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    profileName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'profileName':
        if (!value.trim()) return 'This field is required';
        if (value.trim().length < 2) return 'Profile name must be at least 2 characters';
        return undefined;
        case 'email': {
        const normalized = (value ?? '').toString().trim().toLowerCase();
        if (!normalized) return 'This field is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(normalized)) return 'Please enter a valid email address';
        return undefined;
        }
      case 'password':
        if (!value) return 'This field is required';
        if (value.length < 8) return 'Password must be at least 8 characters long';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touchedFields.has(name)) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name: string, value?: string) => {
    const val = value !== undefined ? value : (formData[name as keyof FormData] as string);
    // Debug: log raw and normalized values to help track validation issues
    console.log('[RegistrationForm] handleBlur:', { field: name, raw: val, normalized: (val ?? '').toString().trim().toLowerCase() });
    setTouchedFields(prev => new Set(prev).add(name));
    const error = validateField(name, val);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
        isValid = false;
      }
    });
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password
      });
      if (error) {
        setErrors({ email: error.message });
      } else {
        console.log('Registration successful:', data);
        navigate('/register/success');
      }
    } catch (err: any) {
      setErrors({ email: err.message || 'Signup failed' });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    Object.values(formData).every((value: string) => value.trim()) &&
    Object.values(errors).every(error => !error);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm">
      <FormField label="Profile Name" required error={errors.profileName} htmlFor="profileName">
        <Input
          id="profileName"
          placeholder="e.g., Grace Hopper"
          value={formData.profileName}
          onChange={e => handleInputChange('profileName', e.target.value)}
          onBlur={(e) => handleBlur('profileName', (e.target as HTMLInputElement).value)}
          className={cn(errors.profileName && 'border-destructive focus-visible:ring-destructive')}
        />
      </FormField>

      <FormField label="Email Address" required error={errors.email} htmlFor="email">
        <Input
          id="email"
          type="email"
          placeholder="e.g., yourname@example.com"
          value={formData.email}
          onChange={e => handleInputChange('email', e.target.value)}
          onBlur={(e) => handleBlur('email', (e.target as HTMLInputElement).value)}
          className={cn(errors.email && 'border-destructive focus-visible:ring-destructive')}
        />
      </FormField>

      <FormField label="Password" required error={errors.password} htmlFor="password">
        <PasswordInput
          id="password"
          placeholder="Enter a secure password"
          value={formData.password}
          onChange={e => handleInputChange('password', e.target.value)}
          onBlur={(e) => handleBlur('password', (e.target as HTMLInputElement).value)}
          error={!!errors.password}
        />
      </FormField>

      <Button type="submit" variant="brand" size="lg" className="w-full" disabled={!isFormValid || isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Creating Account...
          </>
        ) : (
          'Create Account'
        )}
      </Button>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <a href="/login" className="text-primary hover:text-accent transition-colors underline-offset-4 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </form>
  );
};

export { RegistrationForm };

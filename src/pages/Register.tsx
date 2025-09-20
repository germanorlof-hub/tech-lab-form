import React from 'react';
import { Logo } from '@/components/Logo';
import { RegistrationForm } from '@/components/RegistrationForm';

const Register: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <Logo className="justify-center mb-6" />
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Create Your Account
          </h1>
          <p className="text-muted-foreground">
            Get started with the Tech Interview LAB
          </p>
        </div>
        
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-subtle animate-fade-in">
          <RegistrationForm />
        </div>
        
        <div className="text-center mt-6 animate-fade-in">
          <p className="text-xs text-muted-foreground">
            By creating an account, you agree to our{' '}
            <a href="/terms" className="text-primary hover:text-accent transition-colors underline-offset-4 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-primary hover:text-accent transition-colors underline-offset-4 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
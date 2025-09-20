import React from 'react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const RegisterSuccess: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-8 animate-fade-in">
          <Logo className="justify-center mb-6" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Account Created</h1>
          <p className="text-muted-foreground mb-6">
            Your account has been created successfully. A confirmation email may have been sent.
          </p>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-subtle animate-fade-in">
          <p className="mb-6">You can now proceed to sign in and start using the platform.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/login">
              <Button variant="secondary">Go to Login</Button>
            </Link>
            <Link to="/">
              <Button variant="brand">Return Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSuccess;

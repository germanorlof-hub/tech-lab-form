import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { supabase } from '@/integrations/supabase/client';
import { RegistrationForm } from './RegistrationForm';

describe('RegistrationForm', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders form fields and submit button disabled', () => {
    render(<RegistrationForm />);
    expect(screen.getByLabelText(/Profile Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeDisabled();
  });

  it('shows validation errors on blur', async () => {
    render(<RegistrationForm />);
    const nameInput = screen.getByLabelText(/Profile Name/i);
    userEvent.click(nameInput);
    userEvent.tab(); // blur
    expect(await screen.findByText(/This field is required/i)).toBeInTheDocument();
  });

  it('calls supabase.auth.signUp on valid submit', async () => {
    const mockSignUp = vi.spyOn(supabase.auth, 'signUp')
      .mockResolvedValue({ data: { user: { id: 'user_1' } }, error: null } as any);

    render(<RegistrationForm />);
    userEvent.type(screen.getByLabelText(/Profile Name/i), 'Alice');
    userEvent.type(screen.getByLabelText(/Email Address/i), 'alice@example.com');
    userEvent.type(screen.getByLabelText(/Password/i), 'password123');

    userEvent.click(screen.getByRole('button', { name: /Create Account/i }));

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        email: 'alice@example.com',
        password: 'password123'
      });
    });
  });

  it('displays error when signUp returns error', async () => {
    const mockSignUp = vi.spyOn(supabase.auth, 'signUp')
      .mockResolvedValue({ data: null, error: { message: 'Email exists' } } as any);

    render(<RegistrationForm />);
    userEvent.type(screen.getByLabelText(/Profile Name/i), 'Bob');
    userEvent.type(screen.getByLabelText(/Email Address/i), 'bob@example.com');
    userEvent.type(screen.getByLabelText(/Password/i), 'securePass');

    userEvent.click(screen.getByRole('button', { name: /Create Account/i }));

    expect(await screen.findByText(/Email exists/i)).toBeInTheDocument();
  });
});

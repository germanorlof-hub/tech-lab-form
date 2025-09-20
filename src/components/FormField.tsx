import React from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  htmlFor?: string;
}

const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  error, 
  required, 
  children, 
  htmlFor 
}) => {
  return (
    <div className="space-y-2">
      <Label 
        htmlFor={htmlFor}
        className={cn(
          "text-sm font-medium",
          error && "text-destructive"
        )}
      >
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {children}
      {error && (
        <p role="alert" className="text-sm text-destructive animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
};

export { FormField };

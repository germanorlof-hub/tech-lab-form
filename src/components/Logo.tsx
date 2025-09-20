import React from 'react';
import { Code2, Zap } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-brand rounded-lg flex items-center justify-center shadow-glow">
          <Code2 className="h-5 w-5 text-primary-foreground" />
        </div>
        <Zap className="absolute -top-1 -right-1 h-4 w-4 text-accent animate-pulse-glow" />
      </div>
      <div>
        <h1 className="text-xl font-bold bg-gradient-brand bg-clip-text text-transparent">
          Tech Interview LAB
        </h1>
        <p className="text-xs text-muted-foreground -mt-1">
          Master Your Skills
        </p>
      </div>
    </div>
  );
};

export { Logo };
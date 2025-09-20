import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="p-6">
        <Logo />
      </header>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Master Your
            <span className="bg-gradient-brand bg-clip-text text-transparent"> Tech Interviews</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Practice coding challenges, system design, and behavioral questions with our comprehensive interview preparation platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button variant="brand" size="lg" asChild className="text-lg px-8 py-6">
              <Link to="/register">
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Learn More
            </Button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="p-6 bg-card/30 backdrop-blur-sm border border-border rounded-xl">
              <div className="w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Target className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Targeted Practice</h3>
              <p className="text-muted-foreground">
                Focus on specific topics and difficulty levels to maximize your learning efficiency.
              </p>
            </div>

            <div className="p-6 bg-card/30 backdrop-blur-sm border border-border rounded-xl">
              <div className="w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Mock Interviews</h3>
              <p className="text-muted-foreground">
                Simulate real interview conditions with timed challenges and detailed feedback.
              </p>
            </div>

            <div className="p-6 bg-card/30 backdrop-blur-sm border border-border rounded-xl">
              <div className="w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Progress Tracking</h3>
              <p className="text-muted-foreground">
                Monitor your improvement with detailed analytics and personalized recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;


import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import VoiceRecorder from "./VoiceRecorder";

interface AuthenticationStepProps {
  onComplete: (success: boolean) => void;
}

const AuthenticationStep = ({ onComplete }: AuthenticationStepProps) => {
  const [stage, setStage] = useState<'instructions' | 'recording' | 'processing' | 'result'>('instructions');
  const [result, setResult] = useState<'success' | 'failure' | null>(null);
  const [transcript, setTranscript] = useState<string>("");
  const passphrase = "my voice is my secure password";
  const [autoProcess, setAutoProcess] = useState(false);

  const startAuthentication = () => {
    setStage('recording');
    setAutoProcess(true);
  };

  const handleRecordingComplete = (audioUrl: string, spokenText?: string) => {
    setTranscript(spokenText || "");
    setStage('processing');
    
    // Simulate processing with API
    setTimeout(() => {
      // For demo purposes, let's check if the transcript contains our passphrase
      const transcriptLower = (spokenText || "").toLowerCase();
      const passphraseCheck = transcriptLower.includes(passphrase) || 
                             // Flexible matching for demo purposes
                             (transcriptLower.includes("voice") && transcriptLower.includes("password")) ||
                             // For demo purposes, accept almost anything longer than 5 chars
                             transcriptLower.length > 5;
      
      const simulatedSuccess = passphraseCheck || Math.random() > 0.1; // 90% chance of success for demo
      setResult(simulatedSuccess ? 'success' : 'failure');
      setStage('result');
    }, 1500);
  };

  useEffect(() => {
    if (stage === 'result') {
      if (result === 'success') {
        // Shorter timeout for automatic redirection
        setTimeout(() => onComplete(true), 1000);
      }
    }
  }, [stage, result, onComplete]);

  // Auto-start after showing instructions briefly
  useEffect(() => {
    if (stage === 'instructions') {
      const timer = setTimeout(() => {
        startAuthentication();
      }, 2000); // Auto-start after 2 seconds
      
      return () => clearTimeout(timer);
    }
  }, [stage]);

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-healthcare-light-blue">
      <CardHeader className="bg-gradient-to-r from-healthcare-blue to-healthcare-accent text-white rounded-t-lg">
        <CardTitle className="text-center text-xl">Voice Authentication</CardTitle>
        <CardDescription className="text-white/80 text-center">
          {stage === 'instructions' && "Secure and hands-free login with your voice"}
          {stage === 'recording' && "Please speak your passphrase"}
          {stage === 'processing' && "Analyzing your voice biometrics..."}
          {stage === 'result' && result === 'success' && "Authentication successful!"}
          {stage === 'result' && result === 'failure' && "Authentication failed"}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6 flex flex-col items-center">
        {stage === 'instructions' && (
          <div className="space-y-4 text-center">
            <p>For secure access, we'll verify your identity using your unique voice biometrics.</p>
            <p className="font-medium">Please say: <span className="text-healthcare-blue">"My voice is my secure password"</span></p>
          </div>
        )}
        
        {stage === 'recording' && (
          <div className="py-6">
            <VoiceRecorder 
              onRecordingComplete={handleRecordingComplete} 
              isAuthentication={true} 
              autoComplete={autoProcess}
            />
            <p className="mt-4 text-sm text-center text-muted-foreground">Speak clearly into your microphone</p>
          </div>
        )}
        
        {stage === 'processing' && (
          <div className="py-8 flex flex-col items-center">
            <div className="relative flex items-center justify-center w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-t-healthcare-blue border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-4 border-t-healthcare-light-blue border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            </div>
            <p className="mt-4 text-sm text-center text-muted-foreground">
              Verifying 100+ voice characteristics
            </p>
            {transcript && (
              <div className="mt-4 p-3 bg-white/90 rounded-md border border-healthcare-light-blue/30 w-full">
                <p className="text-sm text-center text-healthcare-blue font-medium">
                  Detected: "{transcript}"
                </p>
              </div>
            )}
          </div>
        )}
        
        {stage === 'result' && (
          <div className="py-6 flex flex-col items-center">
            {result === 'success' ? (
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            )}
            <p className="mt-4 font-medium">
              {result === 'success' 
                ? "Voice biometrics confirmed" 
                : "Voice not recognized. Please try again."}
            </p>
            {transcript && (
              <div className="mt-4 p-3 bg-white/90 rounded-md border border-healthcare-light-blue/30 w-full">
                <p className="text-sm text-center text-gray-600">
                  You said: "{transcript}"
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-center pb-6">
        {stage === 'instructions' && !autoProcess && (
          <Button 
            onClick={startAuthentication} 
            className="bg-healthcare-blue hover:bg-healthcare-accent"
          >
            Begin Voice Authentication
          </Button>
        )}
        
        {stage === 'result' && result === 'failure' && (
          <div className="flex gap-3">
            <Button 
              onClick={() => setStage('instructions')} 
              variant="outline"
            >
              Try Again
            </Button>
            <Button 
              onClick={() => setStage('instructions')}
              variant="secondary"
            >
              Use Backup Method
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default AuthenticationStep;

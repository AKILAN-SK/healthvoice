
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";

interface VoiceRecorderProps {
  onRecordingComplete: (audioUrl: string, transcript?: string) => void;
  isAuthentication?: boolean;
  autoComplete?: boolean;
}

const VoiceRecorder = ({ 
  onRecordingComplete, 
  isAuthentication = false,
  autoComplete = true 
}: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string>("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const recognitionRef = useRef<any>(null);
  const autoStopTimeRef = useRef<number>(isAuthentication ? 5 : 15);

  // Initialize speech recognition
  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        const currentTranscript = finalTranscript || interimTranscript;
        setTranscript(currentTranscript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunksRef.current.push(event.data);
      });
      
      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        onRecordingComplete(url, transcript);
        
        // Stop all tracks in the stream to release the microphone
        stream.getTracks().forEach(track => track.stop());
      });
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      setTranscript("");
      
      // Start speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
      
      // Start timer to track recording duration
      timerRef.current = window.setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Unable to access your microphone. Please ensure you've granted permission.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      // Stop speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Auto-stop recording after specific time when in authentication mode or when significant transcript is detected
  useEffect(() => {
    // Stop when reaching time limit
    if (isRecording && autoComplete && recordingTime >= autoStopTimeRef.current) {
      stopRecording();
    }
    
    // Auto-stop if we have a significant transcript (at least 15 characters)
    if (isRecording && autoComplete && transcript.length > 15 && recordingTime >= 2) {
      stopRecording();
    }
  }, [isRecording, recordingTime, transcript, autoComplete]);

  // Auto-start for authentication mode
  useEffect(() => {
    if (isAuthentication && autoComplete && !isRecording) {
      const autoStartTimer = setTimeout(() => {
        startRecording();
      }, 500);
      
      return () => clearTimeout(autoStartTimer);
    }
  }, [isAuthentication, autoComplete]);

  return (
    <div className="flex flex-col items-center space-y-4">
      {isAuthentication ? (
        <div className="relative">
          <Button
            size="lg"
            className={`rounded-full w-16 h-16 flex items-center justify-center ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-healthcare-blue hover:bg-healthcare-accent'}`}
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? <MicOff size={24} /> : <Mic size={24} />}
          </Button>
          {isRecording && (
            <div className="absolute -inset-2 rounded-full border-2 border-healthcare-light-blue animate-pulse-ring"></div>
          )}
        </div>
      ) : (
        <Button
          variant={isRecording ? "destructive" : "default"}
          size="lg"
          className="gap-2"
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
          {isRecording ? "Stop Recording" : "Start Recording"}
        </Button>
      )}

      {isRecording && (
        <div className="mt-2 text-sm font-medium">
          {isAuthentication ? (
            <div className="voice-wave-container">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="voice-wave-bar"></div>
              ))}
            </div>
          ) : (
            <p className="text-red-500">Recording... {formatTime(recordingTime)}</p>
          )}
        </div>
      )}

      {transcript && (
        <div className="mt-2 p-2 bg-gray-50 rounded-md w-full max-w-md">
          <p className="text-sm text-healthcare-blue">{transcript}</p>
        </div>
      )}

      {audioUrl && !isRecording && !isAuthentication && (
        <div className="w-full max-w-md">
          <audio controls src={audioUrl} className="w-full mt-4"></audio>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;

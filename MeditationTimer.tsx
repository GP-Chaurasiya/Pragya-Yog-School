import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function MeditationTimer() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [duration, setDuration] = useState(5); // minutes
  const [timeLeft, setTimeLeft] = useState(300); // seconds
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            setIsComplete(true);
            playCompletionSound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft]);

  const playCompletionSound = () => {
    // Create a simple bell sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 528; // 528 Hz - "healing frequency"
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 2);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsActive(true);
    setIsComplete(false);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(duration * 60);
    setIsComplete(false);
  };

  const handleDialogChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      handleReset();
    }
  };

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Clock className="h-4 w-4" />
          <span className="hidden sm:inline">{t.meditationTimer}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">{t.meditationTimer}</DialogTitle>
          <DialogDescription className="text-center">
            {t.meditationTimerDesc}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-6">
          {/* Duration Selection (only when not active) */}
          {!isActive && !isComplete && (
            <div className="space-y-3">
              <label className="text-sm text-muted-foreground text-center block">
                {t.selectDuration}
              </label>
              <div className="flex gap-2 justify-center flex-wrap">
                {[3, 5, 10, 15, 20].map((min) => (
                  <Button
                    key={min}
                    variant={duration === min ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setDuration(min)}
                    className="min-w-[60px]"
                  >
                    {min} {t.min}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Timer Display */}
          <div className="relative w-64 h-64 mx-auto">
            {/* Progress Circle */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-[#e8e5dc]"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="text-[#4a7c59] transition-all duration-1000 ease-linear"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              />
            </svg>

            {/* Time Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-light text-[#2d3436] tracking-wider">
                  {formatTime(timeLeft)}
                </div>
                {isComplete && (
                  <div className="text-lg text-[#4a7c59] mt-2 animate-pulse">
                    {t.sessionComplete}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-3 justify-center">
            {!isActive && !isComplete && (
              <Button onClick={handleStart} size="lg" className="gap-2 min-w-[140px]">
                <Play className="h-5 w-5" />
                {t.start}
              </Button>
            )}

            {isActive && (
              <Button onClick={handlePause} size="lg" variant="outline" className="gap-2 min-w-[140px]">
                <Pause className="h-5 w-5" />
                {t.pause}
              </Button>
            )}

            {(isActive || isComplete || timeLeft < duration * 60) && (
              <Button onClick={handleReset} size="lg" variant="outline" className="gap-2">
                <RotateCcw className="h-5 w-5" />
                {t.reset}
              </Button>
            )}
          </div>

          {/* Breathing Guide */}
          {isActive && (
            <div className="text-center space-y-2 pt-4 border-t border-[#6a8973]/20">
              <p className="text-sm text-[#6c7a89]">{t.breathingGuide}</p>
              <div className="text-[#4a7c59] animate-pulse">
                {t.inhaleExhale}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

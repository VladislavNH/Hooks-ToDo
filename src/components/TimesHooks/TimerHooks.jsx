import { useState, useRef, useEffect, useCallback } from "react";

export function useTimer(taskId, initialSeconds = 0) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const raw = localStorage.getItem(`timer-${taskId}`);
    if (!raw) return;

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      console.error("Failed  timer:", e);
      return;
    }

    const { secondsLeft, lastTimestamp, isRunning } = parsed;
    const elapsed = isRunning
      ? Math.floor((Date.now() - lastTimestamp) / 1000)
      : 0;
    const restored = secondsLeft - elapsed;
    setSeconds(restored > 0 ? restored : 0);
    setRunning(isRunning && restored > 0);
  }, [taskId]);

  const persist = useCallback(
    (sec, run) => {
      localStorage.setItem(
        `timer-${taskId}`,
        JSON.stringify({
          secondsLeft: sec,
          lastTimestamp: Date.now(),
          isRunning: run,
        })
      );
    },
    [taskId]
  );

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          const next = prev - 1;
          if (next <= 0) {
            clearInterval(intervalRef.current);
            setRunning(false);
            persist(0, false);
            return 0;
          }
          persist(next, true);
          return next;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, persist]);

  const start = useCallback(() => {
    if (!running && seconds > 0) {
      setRunning(true);
      persist(seconds, true);
    }
  }, [running, seconds, persist]);

  const pause = useCallback(() => {
    clearInterval(intervalRef.current);
    setRunning(false);
    persist(seconds, false);
  }, [seconds, persist]);

  const reset = useCallback(() => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setSeconds(initialSeconds);
    persist(initialSeconds, false);
  }, [initialSeconds, persist]);

  return { seconds, running, start, pause, reset };
}

'use client';
import { useEffect, useState, useRef } from 'react';

export default function CountUp({ end, duration = 2000, suffix = '' }: { end: number, duration?: number, suffix?: string }) {
    const [count, setCount] = useState(0);
    const countRef = useRef<HTMLSpanElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            // Easing out function
            const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
            const currentCount = Math.floor(end * easeOutQuart);

            setCount(currentCount);

            if (progress < duration) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end); // Ensure we end exactly on the target number
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, isVisible]);

    // Format the number with commas (e.g. 10,000)
    const formattedCount = count.toLocaleString();

    return <span ref={countRef}>{formattedCount}{suffix}</span>;
}

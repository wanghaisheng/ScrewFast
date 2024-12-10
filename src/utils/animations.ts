import AOS from 'aos';
import 'aos/dist/aos.css';

export const initializeAnimations = () => {
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  });
};

export const refreshAnimations = () => {
  AOS.refresh();
};
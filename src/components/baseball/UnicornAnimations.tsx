
export const unicornAnimationStyles = `
  @keyframes unicornFly {
    0% {
      transform: translateX(-100px) translateY(-50%);
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      transform: translateX(calc(100vw + 100px)) translateY(-50%);
      opacity: 0;
    }
  }

  @keyframes unicornFlyUpsideDown {
    0% {
      transform: translateX(-100px) translateY(-50%) rotate(180deg);
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      transform: translateX(calc(100vw + 100px)) translateY(-50%) rotate(180deg);
      opacity: 0;
    }
  }
  
  @keyframes rainbowPulse {
    0% { opacity: 0.6; }
    100% { opacity: 1; }
  }

  @keyframes companionCollect {
    0% { 
      transform: translateY(0px) scale(1) rotate(0deg);
      opacity: 1;
    }
    50% { 
      transform: translateY(-20px) scale(1.2) rotate(180deg);
      opacity: 0.8;
    }
    100% { 
      transform: translateY(-40px) scale(0.5) rotate(360deg);
      opacity: 0;
    }
  }

  @keyframes companionFall {
    0% { 
      transform: translateY(0px) scale(1) rotate(0deg);
      opacity: 1;
    }
    50% { 
      transform: translateY(30px) scale(0.8) rotate(-90deg);
      opacity: 0.6;
    }
    100% { 
      transform: translateY(80px) scale(0.3) rotate(-180deg);
      opacity: 0;
    }
  }

  @keyframes companionFloat {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(180deg); }
  }

  @keyframes sparkleExplode {
    0% { 
      transform: scale(0) rotate(0deg);
      opacity: 1;
    }
    50% { 
      transform: scale(1.5) rotate(180deg);
      opacity: 0.8;
    }
    100% { 
      transform: scale(0.3) rotate(360deg);
      opacity: 0;
    }
  }

  @keyframes messageWiggle {
    0%, 100% { transform: rotate(0deg) scale(1); }
    25% { transform: rotate(-2deg) scale(1.05); }
    75% { transform: rotate(2deg) scale(1.05); }
  }

  @keyframes messageSad {
    0%, 100% { transform: rotate(0deg) scale(1); }
    25% { transform: rotate(-1deg) scale(0.95); }
    75% { transform: rotate(1deg) scale(0.95); }
  }
`;

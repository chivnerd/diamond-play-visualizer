
import BaseballField from "@/components/BaseballField";

const Index = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #87CEEB 0%, #98D982 30%, #8B4513 70%, #654321 100%)',
      imageRendering: 'pixelated'
    }}>
      <BaseballField />
    </div>
  );
};

export default Index;

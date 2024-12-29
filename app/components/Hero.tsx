interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
}

export default function Hero({ title, subtitle, backgroundImage }: HeroProps) {
  return (
    <div
      className="hero"
      style={{
        background: backgroundImage
          ? `url(${backgroundImage}) no-repeat center/cover`
          : "var(--color-background)"
      }}
    >
      <div className="hero-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

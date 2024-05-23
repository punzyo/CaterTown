interface InfoCardProp {
  IconComponent: React.ComponentType;
  title: string;
  description: string;
}
export default function InfoCard({
  IconComponent,
  title,
  description,
}: InfoCardProp) {
  return (
    <div>
      <h2>
        <IconComponent />
        {title}
      </h2>
      <p>{description}</p>
    </div>
  );
}

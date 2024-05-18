export default function InfoCard({ IconComponent, title, description }) {
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

interface FilterContentProps {
  children: React.ReactNode;
  header: string;
  description: string;
}
export default function FilterContent({ children, header, description }: FilterContentProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="font-semibold leading-none">{header}</div>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      {children}
    </div>
  );
}

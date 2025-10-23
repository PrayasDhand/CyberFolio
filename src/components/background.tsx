export function Background() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-background">
      <div 
        className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"
        style={{ animation: 'move-grid 2s linear infinite' }}
      ></div>
      <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)/0.3),transparent)]"></div>
    </div>
  );
}

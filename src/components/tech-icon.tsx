import {
  Code,
  Database,
  Cloud,
  Terminal,
  type LucideProps,
} from 'lucide-react';

interface TechIconProps extends LucideProps {
  name: string;
}

const CSharpIcon = (props: LucideProps) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 16.5l-3.5-3.5 3.5-3.5" />
    <path d="M17.5 16.5l-3.5-3.5 3.5-3.5" />
    <path d="M12 8l-2 8" />
    <path d="M16 8l-2 8" />
  </svg>
);

const AngularIcon = (props: LucideProps) => (
    <svg {...props} viewBox="0 0 250 250" fill="currentColor">
        <path d="M125 30L31.9 63.2 46.1 186.3 125 230l78.9-43.7L218.1 63.2z" fill="#DD0031"/>
        <path d="M125 30L31.9 63.2 46.1 186.3 125 230l78.9-43.7L218.1 63.2z" fill="none" stroke="#fff" strokeWidth="10"/>
        <path d="M125 52.1l63.7 113.6H61.3L125 52.1z" fill="#B52E31"/>
        <path d="M125 52.1l63.7 113.6H61.3L125 52.1z" fill="none" stroke="#fff" strokeWidth="10"/>
    </svg>
);

const ReactNativeIcon = (props: LucideProps) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3">
    <g fill="currentColor">
      <path d="M666.3 297.6c0 133.2-108.2 241.4-241.4 241.4s-241.4-108.2-241.4-241.4 108.2-241.4 241.4-241.4 241.4 108.2 241.4 241.4zm-444.6 0c0 112.5 91.4 203.9 203.9 203.9s203.9-91.4 203.9-203.9-91.4-203.9-203.9-203.9-203.9 91.4-203.9 203.9z"/>
      <ellipse cx="424.9" cy="297.6" rx="63.9" ry="173.2"/>
      <path d="M424.9 124.4c-95.6 0-173.2 28.6-173.2 63.9s77.6 63.9 173.2 63.9 173.2-28.6 173.2-63.9-77.6-63.9-173.2-63.9zm0 89.8c-66.2 0-119.5-12.2-119.5-26.2s53.3-26.2 119.5-26.2 119.5 12.2 119.5 26.2-53.3 26.2-119.5 26.2z"/>
    </g>
  </svg>
);


const DotNetIcon = (props: LucideProps) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
  </svg>
);

const FlutterIcon = (props: LucideProps) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 14l5 5 10-10-5-5L7 14z" />
    <path d="M7 14l-4.5 4.5" />
    <path d="M12 19l-5-5" />
  </svg>
);

const JetpackComposeIcon = (props: LucideProps) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

export const TechIcon = ({ name, ...props }: TechIconProps) => {
  const lowerCaseName = name.toLowerCase();

  if (lowerCaseName.includes('sql')) {
    return <Database {...props} />;
  }
  if (lowerCaseName.includes('azure') || lowerCaseName.includes('cloud')) {
    return <Cloud {...props} />;
  }
  if (lowerCaseName.includes('typescript') || lowerCaseName.includes('javascript')) {
    return <Code {...props} />;
  }
  if (lowerCaseName.includes('.net') || lowerCaseName.includes('asp.net')) {
    return <DotNetIcon {...props} />;
  }
   if (lowerCaseName.includes('c#')) {
    return <CSharpIcon {...props} />;
  }
  if (lowerCaseName.includes('angular')) {
    return <AngularIcon {...props} />;
  }
  if (lowerCaseName.includes('react native')) {
    return <ReactNativeIcon {...props} />;
  }
  if (lowerCaseName.includes('flutter')) {
    return <FlutterIcon {...props} />;
  }
  if (lowerCaseName.includes('jetpack compose')) {
    return <JetpackComposeIcon {...props} />;
  }


  return <Terminal {...props} />;
};

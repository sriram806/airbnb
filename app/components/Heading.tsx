'use client';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}
function Heading({ title, subtitle, center }: HeadingProps) {
  return (
    <div className={center ? 'text-center' : 'text-left'}>
      <div className="text-xl font-bold">
        {title}
      </div>
      <div className="font-light text-neutral-500 mt-2">
        {subtitle}
      </div>
    </div>
  );
}

export default Heading
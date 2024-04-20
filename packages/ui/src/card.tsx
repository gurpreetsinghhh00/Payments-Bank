"use client"

export function Card({
  className,
  title,
  children,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
      <div className="border p-6 bg-white rounded-xl">
        <h1 className="text-xl border-b pb-2 font-semibold text-center">{title}</h1>
        <div className="text-xl">
          {children}
        </div>
      </div>
  );
}

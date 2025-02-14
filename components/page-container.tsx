'use client';

interface PageContainerProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function PageContainer({ children, title, subtitle }: PageContainerProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white to-green-50/20">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          {subtitle && (
            <p className="text-lg text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

import PageContainer from "@/components/page-container";
import { CheckCircle2 } from "lucide-react";

export default function About() {
  const features = [
    {
      title: "Real-Time Results",
      description: "Get the latest Irish Lotto results as soon as they're drawn"
    },
    {
      title: "Historical Data",
      description: "Access a comprehensive archive of past lottery results"
    },
    {
      title: "Mobile Friendly",
      description: "Check results on any device with our responsive design"
    },
    {
      title: "Fast & Reliable",
      description: "Built with modern technology for speed and reliability"
    }
  ];

  return (
    <PageContainer 
      title="About Us" 
      subtitle="Your trusted source for Irish Lotto results"
    >
      <div className="space-y-12">
        {/* Mission Statement */}
        <div className="prose prose-green max-w-none">
          <h2>Our Mission</h2>
          <p className="lead">
            At Irish Lotto Results, we're dedicated to providing accurate, timely, and easy-to-access lottery information
            to players across Ireland and beyond. Our platform is designed with simplicity and reliability in mind,
            ensuring you never miss a draw or result.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div 
              key={feature.title}
              className="p-6 bg-green-50 rounded-lg border border-green-100"
            >
              <div className="flex items-start space-x-4">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="prose prose-green max-w-none">
          <h2>Our Commitment</h2>
          <p>
            We understand the importance of accurate lottery information and take our responsibility seriously.
            Our team works diligently to ensure that all results are verified and updated promptly after each draw.
            While we're not affiliated with the Irish National Lottery, we strive to be your go-to resource for
            all Irish Lotto related information.
          </p>

          <h2>Responsible Gaming</h2>
          <p>
            We promote responsible gaming and encourage our users to play responsibly. If you or someone you know
            has a gambling problem, we recommend seeking help from professional organizations dedicated to providing
            support and guidance.
          </p>
        </div>
      </div>
    </PageContainer>
  );
}

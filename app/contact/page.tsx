import PageContainer from "@/components/page-container";
import { Mail, MessageSquare, Clock, AlertCircle, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { constructMetadata } from "../seo.config";
import JsonLd from "@/components/json-ld";

export const metadata: Metadata = constructMetadata({
  title: "Contact Us | Irish Lotto Results",
  description: "Get in touch with our support team for any questions about Irish Lotto results or our website.",
  url: "https://www.irishlottoresults.co.uk/contact",
});

export default function Contact() {
  return (
    <PageContainer 
      title="Contact Us" 
      subtitle="We're here to help! Get in touch with us"
    >
      <JsonLd type="BreadcrumbList" data={{
        items: [
          { name: "Home", url: "/" },
          { name: "Contact Us", url: "/contact" }
        ]
      }} />
      <div className="space-y-12">
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div className="p-6 bg-green-50 rounded-lg border border-green-100">
            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                <p className="text-muted-foreground mb-4">
                  Send us an email and we'll get back to you within 24 hours.
                </p>
                <a 
                  href="mailto:contact@irishlottoresults.co.uk"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  contact@irishlottoresults.co.uk
                </a>
              </div>
            </div>
          </div>

          {/* Support Hours */}
          <div className="p-6 bg-green-50 rounded-lg border border-green-100">
            <div className="flex items-start space-x-4">
              <Clock className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Support Hours</h3>
                <p className="text-muted-foreground">
                  Monday - Friday: 9:00 AM - 5:00 PM (IST)<br />
                  Saturday: 10:00 AM - 2:00 PM (IST)<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-6 bg-white rounded-lg border">
                <h3 className="font-semibold text-gray-900 mb-2">
                  When are lottery results updated?
                </h3>
                <p className="text-muted-foreground">
                  Results are typically updated within 15 minutes after each draw.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg border">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Are you affiliated with the Irish National Lottery?
                </h3>
                <p className="text-muted-foreground">
                  No, we are not affiliated with or endorsed by the Irish National Lottery.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-6 bg-white rounded-lg border">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Can I buy lottery tickets through your website?
                </h3>
                <p className="text-muted-foreground">
                  No, we only provide lottery results and information. We do not sell tickets.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg border">
                <h3 className="font-semibold text-gray-900 mb-2">
                  How far back do your results go?
                </h3>
                <p className="text-muted-foreground">
                  Our database includes results from January 2022 onwards.
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-6">
            <Link href="/faq" className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-1">
              View all FAQs <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Support Notice */}
        <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-start space-x-4">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-muted-foreground">
                For gambling-related support, please contact GamCare at{' '}
                <a 
                  href="https://www.gamcare.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  www.gamcare.org.uk
                </a>
                {' '}or call their 24/7 helpline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

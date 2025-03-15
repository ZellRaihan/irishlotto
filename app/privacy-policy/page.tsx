import { Metadata } from "next";
import { constructMetadata } from "../seo.config";
import JsonLd from "@/components/json-ld";
import { Shield, Lock, Eye, Cookie, Server, Clock, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy | Irish Lotto Results",
  description: "Our privacy policy explains how we collect, use, and protect your personal information when using the Irish Lotto Results website.",
  url: "https://www.irishlottoresults.co.uk/privacy-policy",
});

export default function PrivacyPolicy() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white via-blue-50/10 to-green-50/20">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <JsonLd type="BreadcrumbList" data={{
          items: [
            { name: "Home", url: "/" },
            { name: "Privacy Policy", url: "/privacy-policy" }
          ]
        }} />
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground">Last updated: February 14, 2025</p>
        </div>
        
        {/* Introduction Card */}
        <Card className="mb-8 border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-t-xl">
            <CardTitle className="text-xl text-blue-700">Introduction</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              Welcome to Irish Lotto Results. We respect your privacy and are committed to protecting your personal data.
              This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights.
            </p>
          </CardContent>
        </Card>
        
        {/* Main Content */}
        <div className="space-y-8">
          {/* Information We Collect */}
          <Card className="border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-indigo-600" />
                </div>
                <CardTitle>Information We Collect</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                When you visit our website, we automatically collect certain information about your device, including:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "IP address",
                  "Browser type and version",
                  "Time zone setting",
                  "Browser plug-in types and versions",
                  "Operating system and platform"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          {/* How We Use Your Information */}
          <Card className="border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-blue-600" />
                </div>
                <CardTitle>How We Use Your Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">We use the information we collect to:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Provide Service", desc: "Maintain and improve our website" },
                  { title: "Enhance Experience", desc: "Improve user interface and experience" },
                  { title: "Usage Analysis", desc: "Understand how our website is used" },
                  { title: "Technical Support", desc: "Detect and prevent technical issues" }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <h4 className="font-medium text-blue-700 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Cookies */}
          <Card className="border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Cookie className="w-5 h-5 text-amber-600" />
                </div>
                <CardTitle>Cookies</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our website and store certain information.
                Cookies are files with a small amount of data which may include an anonymous unique identifier.
              </p>
              <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-100">
                <h4 className="font-medium text-amber-700 mb-2">Cookie Types We Use</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center mt-0.5">
                      <span className="text-amber-700 text-xs">1</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Essential Cookies</span>
                      <p className="text-sm text-gray-600">Required for basic website functionality</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center mt-0.5">
                      <span className="text-amber-700 text-xs">2</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Analytics Cookies</span>
                      <p className="text-sm text-gray-600">Help us understand how visitors use our site</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Data Security */}
          <Card className="border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Server className="w-5 h-5 text-green-600" />
                </div>
                <CardTitle>Data Security</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                The security of your data is important to us, but remember that no method of transmission over the Internet,
                or method of electronic storage is 100% secure. We implement appropriate security measures to protect your personal information.
              </p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { icon: "🔒", title: "Encryption", desc: "Data encrypted in transit" },
                  { icon: "🛡️", title: "Protection", desc: "Secure server infrastructure" },
                  { icon: "🔍", title: "Monitoring", desc: "Regular security audits" }
                ].map((item, index) => (
                  <div key={index} className="bg-green-50 p-3 rounded-lg text-center border border-green-100">
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <h4 className="font-medium text-green-700">{item.title}</h4>
                    <p className="text-xs text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Changes to Policy */}
          <Card className="border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <CardTitle>Changes to This Privacy Policy</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last updated" date at the top of this policy.
              </p>
              <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-100">
                <h4 className="font-medium text-purple-700 mb-2">Policy Update Process</h4>
                <ol className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-purple-200 flex items-center justify-center mt-0.5">
                      <span className="text-purple-700 text-xs">1</span>
                    </div>
                    <span className="text-gray-700">We review our privacy practices regularly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-purple-200 flex items-center justify-center mt-0.5">
                      <span className="text-purple-700 text-xs">2</span>
                    </div>
                    <span className="text-gray-700">Updates are posted with a new "Last updated" date</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-purple-200 flex items-center justify-center mt-0.5">
                      <span className="text-purple-700 text-xs">3</span>
                    </div>
                    <span className="text-gray-700">Significant changes may be notified via website banner</span>
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>
          
          {/* Contact Us */}
          <Card className="border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <CardTitle>Contact Us</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy, you can contact us at:
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-gray-800">Email:</span>
                      <a href="mailto:contact@irishlottoresults.co.uk" className="text-blue-600 hover:underline">
                        contact@irishlottoresults.co.uk
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-gray-800">Website:</span>
                      <a href="https://www.irishlottoresults.co.uk" className="text-blue-600 hover:underline">
                        www.irishlottoresults.co.uk
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Missing icon component
function Globe(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

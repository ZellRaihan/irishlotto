import { Metadata } from "next";
import { constructMetadata } from "../seo.config";
import JsonLd from "@/components/json-ld";
import { FileText, AlertTriangle, BookOpen, Link2, Scale, Clock, Mail, ExternalLink, CheckCircle, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const metadata: Metadata = constructMetadata({
  title: "Terms & Conditions | Irish Lotto Results",
  description: "Read our terms and conditions for using the Irish Lotto Results website. Last updated February 14, 2025.",
  url: "https://www.irishlottoresults.co.uk/terms",
});

export default function Terms() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white via-green-50/10 to-blue-50/20">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <JsonLd type="BreadcrumbList" data={{
          items: [
            { name: "Home", url: "/" },
            { name: "Terms & Conditions", url: "/terms" }
          ]
        }} />
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <FileText className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms & Conditions</h1>
          <p className="text-lg text-muted-foreground">Last updated: February 14, 2025</p>
        </div>
        
        {/* Introduction Card */}
        <Card className="mb-8 border-green-100 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-green-50 to-green-100/50 rounded-t-xl">
            <CardTitle className="text-xl text-green-700">Agreement Overview</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              By accessing and using Irish Lotto Results (www.irishlottoresults.co.uk), you accept and agree to be bound by the terms
              and provision of this agreement. Please read these terms carefully before using our website.
            </p>
          </CardContent>
        </Card>
        
        {/* Main Content */}
        <div className="space-y-8">
          {/* Section 1: Acceptance of Terms */}
          <Card className="border-green-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <span className="inline-block mb-1 text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">Section 1</span>
                  <CardTitle>Acceptance of Terms</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Irish Lotto Results (www.irishlottoresults.co.uk), you accept and agree to be bound by the terms
                and provision of this agreement. Your continued use of the website constitutes your acceptance of these terms.
              </p>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    If you do not agree with any part of these terms, you should discontinue use of this website immediately.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Section 2: Website Use */}
          <Card className="border-green-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <span className="inline-block mb-1 text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">Section 2</span>
                  <CardTitle>Website Use</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                This website provides lottery results and related information for informational purposes only. We do not
                sell lottery tickets or operate any gambling services.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Information Only", desc: "Results and data are provided for informational purposes" },
                  { title: "Not a Lottery Operator", desc: "We do not sell tickets or operate gambling services" },
                  { title: "No Financial Transactions", desc: "We do not process lottery-related payments" },
                  { title: "Content Accuracy", desc: "Information is provided on an 'as is' basis" }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <h4 className="font-medium text-indigo-700 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Section 3: Disclaimer */}
          <Card className="border-green-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <span className="inline-block mb-1 text-xs font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">Section 3</span>
                  <CardTitle>Disclaimer</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Irish Lotto Results is not affiliated with, endorsed by, or connected to the Irish National Lottery.
                All lottery results and information are provided "as is" without warranty of any kind.
              </p>
              <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-100">
                <h4 className="font-medium text-amber-700 mb-2">Important Notices</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="text-amber-700 text-xs">!</span>
                    </div>
                    <span className="text-gray-700">We are an independent information service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="text-amber-700 text-xs">!</span>
                    </div>
                    <span className="text-gray-700">Always verify results with official sources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="text-amber-700 text-xs">!</span>
                    </div>
                    <span className="text-gray-700">No guarantees are made regarding accuracy of information</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          {/* Section 4: Accuracy of Information */}
          <Card className="border-green-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <span className="inline-block mb-1 text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">Section 4</span>
                  <CardTitle>Accuracy of Information</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                While we strive to keep the information on our website accurate and up-to-date, we make no
                representations or warranties of any kind about the completeness, accuracy, reliability,
                suitability, or availability of the information.
              </p>
              <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-100">
                <h4 className="font-medium text-green-700 mb-2">Our Commitment to Quality</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center mt-0.5 flex-shrink-0 border border-green-200">
                      <span className="text-green-600 text-xs">1</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Regular Updates</span>
                      <p className="text-sm text-gray-600">We update our results promptly after draws</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center mt-0.5 flex-shrink-0 border border-green-200">
                      <span className="text-green-600 text-xs">2</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Data Verification</span>
                      <p className="text-sm text-gray-600">We cross-check information from multiple sources</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center mt-0.5 flex-shrink-0 border border-green-200">
                      <span className="text-green-600 text-xs">3</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Error Correction</span>
                      <p className="text-sm text-gray-600">We promptly address any reported inaccuracies</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center mt-0.5 flex-shrink-0 border border-green-200">
                      <span className="text-green-600 text-xs">4</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">User Feedback</span>
                      <p className="text-sm text-gray-600">We welcome reports of any discrepancies</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Section 5: Intellectual Property */}
          <Card className="border-green-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <span className="inline-block mb-1 text-xs font-medium px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">Section 5</span>
                  <CardTitle>Intellectual Property</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                The content on this website, including but not limited to text, graphics, logos, and images,
                is the property of Irish Lotto Results and is protected by copyright and other intellectual
                property laws.
              </p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { icon: "©️", title: "Copyright", desc: "All content is copyright protected" },
                  { icon: "™️", title: "Trademarks", desc: "All logos and marks are protected" },
                  { icon: "🔒", title: "Usage Rights", desc: "Personal, non-commercial use only" }
                ].map((item, index) => (
                  <div key={index} className="bg-purple-50 p-3 rounded-lg text-center border border-purple-100">
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <h4 className="font-medium text-purple-700">{item.title}</h4>
                    <p className="text-xs text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Section 6: Third-Party Links */}
          <Card className="border-green-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Link2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <span className="inline-block mb-1 text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">Section 6</span>
                  <CardTitle>Third-Party Links</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Our website may contain links to third-party websites. We have no control over the content,
                privacy policies, or practices of these websites and accept no responsibility for them.
              </p>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-start gap-3">
                  <ExternalLink className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    When you click on a third-party link, you will be directed away from our website. We strongly advise you to review the Terms and Privacy Policy of every site you visit.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Section 7: Limitation of Liability */}
          <Card className="border-green-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Scale className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <span className="inline-block mb-1 text-xs font-medium px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">Section 7</span>
                  <CardTitle>Limitation of Liability</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                In no event shall Irish Lotto Results be liable for any direct, indirect, incidental,
                consequential, special, or exemplary damages arising out of or in connection with your use
                of the website.
              </p>
              <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-100">
                <h4 className="font-medium text-red-700 mb-2">This includes, but is not limited to:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center mt-0.5 flex-shrink-0 border border-red-200">
                      <span className="text-red-600 text-xs">•</span>
                    </div>
                    <span className="text-gray-700">Loss of profits, revenue, or data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center mt-0.5 flex-shrink-0 border border-red-200">
                      <span className="text-red-600 text-xs">•</span>
                    </div>
                    <span className="text-gray-700">Business interruption or computer failure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center mt-0.5 flex-shrink-0 border border-red-200">
                      <span className="text-red-600 text-xs">•</span>
                    </div>
                    <span className="text-gray-700">Personal injury or emotional distress</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center mt-0.5 flex-shrink-0 border border-red-200">
                      <span className="text-red-600 text-xs">•</span>
                    </div>
                    <span className="text-gray-700">Any other damages resulting from use of our website</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          {/* Section 8: Changes to Terms */}
          <Card className="border-green-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <span className="inline-block mb-1 text-xs font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">Section 8</span>
                  <CardTitle>Changes to Terms</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of any changes
                by updating the "Last updated" date of these terms.
              </p>
              <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-100">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    Your continued use of the website after any changes to the terms constitutes your acceptance of the new terms. It is your responsibility to check this page periodically for changes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Section 9: Governing Law */}
          <Card className="border-green-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Scale className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <span className="inline-block mb-1 text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">Section 9</span>
                  <CardTitle>Governing Law</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of Ireland,
                without regard to its conflict of law provisions.
              </p>
              <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                <p className="text-sm text-gray-700">
                  Any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of Ireland.
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Section 10: Contact Information */}
          <Card className="border-green-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <span className="inline-block mb-1 text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">Section 10</span>
                  <CardTitle>Contact Information</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms & Conditions, please contact us at:
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-gray-800">Email:</span>
                      <a href="mailto:contact@irishlottoresults.co.uk" className="text-green-600 hover:underline">
                        contact@irishlottoresults.co.uk
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-gray-800">Website:</span>
                      <a href="https://www.irishlottoresults.co.uk" className="text-green-600 hover:underline">
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

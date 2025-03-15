import PageContainer from "@/components/page-container";
import { Metadata } from "next";
import { constructMetadata } from "../seo.config";
import JsonLd from "@/components/json-ld";

export const metadata: Metadata = constructMetadata({
  title: "Terms & Conditions | Irish Lotto Results",
  description: "Read our terms and conditions for using the Irish Lotto Results website. Last updated February 14, 2025.",
  url: "https://www.irishlottoresults.co.uk/terms",
});

export default function Terms() {
  return (
    <PageContainer 
      title="Terms & Conditions" 
      subtitle="Last updated: February 14, 2025"
    >
      <JsonLd type="BreadcrumbList" data={{
        items: [
          { name: "Home", url: "/" },
          { name: "Terms & Conditions", url: "/terms" }
        ]
      }} />
      <div className="prose prose-green max-w-none">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using Irish Lotto Results (www.irishlottoresults.co.uk), you accept and agree to be bound by the terms
          and provision of this agreement.
        </p>

        <h2>2. Website Use</h2>
        <p>
          This website provides lottery results and related information for informational purposes only. We do not
          sell lottery tickets or operate any gambling services.
        </p>

        <h2>3. Disclaimer</h2>
        <p>
          Irish Lotto Results is not affiliated with, endorsed by, or connected to the Irish National Lottery.
          All lottery results and information are provided "as is" without warranty of any kind.
        </p>

        <h2>4. Accuracy of Information</h2>
        <p>
          While we strive to keep the information on our website accurate and up-to-date, we make no
          representations or warranties of any kind about the completeness, accuracy, reliability,
          suitability, or availability of the information.
        </p>

        <h2>5. Intellectual Property</h2>
        <p>
          The content on this website, including but not limited to text, graphics, logos, and images,
          is the property of Irish Lotto Results and is protected by copyright and other intellectual
          property laws.
        </p>

        <h2>6. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites. We have no control over the content,
          privacy policies, or practices of these websites and accept no responsibility for them.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>
          In no event shall Irish Lotto Results be liable for any direct, indirect, incidental,
          consequential, special, or exemplary damages arising out of or in connection with your use
          of the website.
        </p>

        <h2>8. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. We will notify users of any changes
          by updating the "Last updated" date of these terms.
        </p>

        <h2>9. Governing Law</h2>
        <p>
          These terms shall be governed by and construed in accordance with the laws of Ireland,
          without regard to its conflict of law provisions.
        </p>

        <h2>10. Contact Information</h2>
        <p>
          If you have any questions about these Terms & Conditions, please contact us at:
        </p>
        <ul>
          <li>Email: contact@irishlottoresults.co.uk</li>
          <li>Website: www.irishlottoresults.co.uk</li>
        </ul>
      </div>
    </PageContainer>
  );
}

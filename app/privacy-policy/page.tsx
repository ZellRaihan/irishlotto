import PageContainer from "@/components/page-container";

export default function PrivacyPolicy() {
  return (
    <PageContainer 
      title="Privacy Policy" 
      subtitle="Last updated: February 14, 2025"
    >
      <div className="prose prose-green max-w-none">
        <h2>Introduction</h2>
        <p>
          Welcome to Irish Lotto Results. We respect your privacy and are committed to protecting your personal data.
          This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights.
        </p>

        <h2>Information We Collect</h2>
        <p>
          When you visit our website, we automatically collect certain information about your device, including:
        </p>
        <ul>
          <li>IP address</li>
          <li>Browser type and version</li>
          <li>Time zone setting</li>
          <li>Browser plug-in types and versions</li>
          <li>Operating system and platform</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide and maintain our website</li>
          <li>Improve our website and user experience</li>
          <li>Analyze how our website is used</li>
          <li>Detect and prevent technical issues</li>
        </ul>

        <h2>Cookies</h2>
        <p>
          We use cookies and similar tracking technologies to track activity on our website and store certain information.
          Cookies are files with a small amount of data which may include an anonymous unique identifier.
        </p>

        <h2>Data Security</h2>
        <p>
          The security of your data is important to us, but remember that no method of transmission over the Internet,
          or method of electronic storage is 100% secure.
        </p>

        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page and updating the "Last updated" date at the top of this policy.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, you can contact us at:
        </p>
        <ul>
          <li>Email: contact@irishlottoresults.co.uk</li>
          <li>Website: irishlottoresults.co.uk</li>
        </ul>
      </div>
    </PageContainer>
  );
}

import PageContainer from "@/components/page-container";
import { ChevronRight } from "lucide-react";
import Script from 'next/script';

const faqs = [
  {
    question: "When are lottery results updated?",
    answer: "Results are typically updated within 15 minutes after each draw. The Irish Lotto draws take place every Wednesday and Saturday at 8:00 PM IST."
  },
  {
    question: "Are you affiliated with the Irish National Lottery?",
    answer: "No, we are not affiliated with or endorsed by the Irish National Lottery. We are an independent website providing lottery results and information for reference purposes only."
  },
  {
    question: "Can I buy lottery tickets through your website?",
    answer: "No, we do not sell lottery tickets. We only provide lottery results and related information. To purchase tickets, please visit the official Irish National Lottery website or authorized retailers."
  },
  {
    question: "How far back do your results go?",
    answer: "Our database includes Irish Lotto results from January 2022 onwards. You can access all historical results through our Results History page."
  },
  {
    question: "What information is available for each draw?",
    answer: "For each draw, we provide the winning numbers, bonus number, draw date, and jackpot amount. You can also view additional information such as prize breakdowns."
  },
  {
    question: "Is the website mobile-friendly?",
    answer: "Yes, our website is fully responsive and works seamlessly on all devices including smartphones, tablets, and desktop computers."
  },
  {
    question: "How can I contact support?",
    answer: "You can reach our support team through the Contact Us page or by sending an email to contact@irishlottoresults.co.uk. We aim to respond to all inquiries within 24 hours."
  },
  {
    question: "Do you provide notifications for draw results?",
    answer: "Currently, we do not provide result notifications. However, you can bookmark our website and check back after each draw for the latest results."
  }
];

export default function FAQ() {
  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>

      <PageContainer 
        title="Frequently Asked Questions" 
        subtitle="Find answers to common questions about Irish Lotto Results"
      >
        <div className="space-y-8">
          {/* FAQ Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="p-6 bg-white rounded-xl border border-gray-100 hover:border-green-100 transition-colors group"
                itemScope
                itemType="https://schema.org/Question"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-green-50 rounded-full p-2 mt-1">
                    <ChevronRight className="w-4 h-4 text-green-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2" itemProp="name">
                      {faq.question}
                    </h3>
                    <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                      <p className="text-muted-foreground text-sm leading-relaxed" itemProp="text">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Help */}
          <div className="mt-12 p-6 bg-green-50 rounded-xl border border-green-100">
            <h3 className="text-lg font-semibold text-green-800 mb-4">
              Need More Help?
            </h3>
            <p className="text-green-700 mb-4">
              If you couldn't find the answer you're looking for, our support team is here to help.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="/contact"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Contact Support
              </a>
              <a 
                href="mailto:contact@irishlottoresults.co.uk"
                className="inline-flex items-center px-4 py-2 bg-white text-green-600 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
}

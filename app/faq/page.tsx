import PageContainer from "@/components/page-container";
import { ChevronRight } from "lucide-react";
import Script from 'next/script';
import { Metadata } from "next";
import { constructMetadata } from "../seo.config";
import JsonLd from "@/components/json-ld";

export const metadata: Metadata = constructMetadata({
  title: "Frequently Asked Questions | Irish Lotto Results",
  description: "Find answers to common questions about Irish Lotto results, draw times, and how to use our website.",
  url: "https://www.irishlottoresults.co.uk/faq",
});

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
  return (
    <>
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify({
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
        })}
      </Script>
      
      <PageContainer 
        title="Frequently Asked Questions" 
        subtitle="Find answers to common questions about Irish Lotto results and our website."
      >
        <div className="max-w-4xl mx-auto space-y-8">
          {/* FAQ Items */}
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-start gap-3">
                  <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    Q
                  </span>
                  {faq.question}
                </h3>
                <div className="pl-11">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Still have questions?</h3>
            <p className="text-gray-600 mb-4">
              If you couldn't find the answer to your question, please feel free to contact us.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
            >
              Contact Support <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
      </PageContainer>
    </>
  );
}

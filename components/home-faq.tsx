'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What time are Irish Lotto results announced?",
    answer: "Irish Lotto results are announced at approximately 8:00 PM (IST) every Wednesday and Saturday. We update our website with the latest results within minutes of the official draw."
  },
  {
    question: "How do I check if I've won?",
    answer: "Compare your lottery ticket numbers with the winning numbers displayed on our website. We show results for the main draw, Plus 1, Plus 2, and the Raffle. The prize breakdown section shows exactly what you've won based on how many numbers you've matched."
  },
  {
    question: "What is the Bonus Ball?",
    answer: "The Bonus Ball is an additional number drawn after the main six numbers. It only comes into play for certain prize tiers where you need to match five main numbers plus the bonus ball to win a higher prize."
  },
  {
    question: "How long do I have to claim my prize?",
    answer: "You have 90 days from the date of the draw to claim any prizes. Make sure to check your tickets promptly and keep them in a safe place."
  }
];

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

export default function HomeFAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  return (
    <section className="bg-gradient-to-b from-white to-green-50/20">
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>

      <div className="container px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-muted-foreground">
            Quick answers to common questions about Irish Lotto Results
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="grid gap-4">
            <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenItem(openItem === index ? null : index)}
                      className="w-full px-4 py-3 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left"
                      aria-expanded={openItem === index}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <span className="font-medium text-gray-900">{item.question}</span>
                      <ChevronDown 
                        className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                          openItem === index ? 'transform rotate-180' : ''
                        }`}
                      />
                    </button>
                    
                    <div
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      className={`transition-all duration-200 ease-in-out ${
                        openItem === index 
                          ? 'max-h-48 opacity-100' 
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-4 py-3 text-gray-600 bg-gray-50">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-green-600">Note:</span> This website is for informational purposes only. Always verify results on the official Irish National Lottery website.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/faq"
              className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
            >
              View all FAQs
              <ChevronDown className="w-4 h-4 ml-1 transform -rotate-90" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

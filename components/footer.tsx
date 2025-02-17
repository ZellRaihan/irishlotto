import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Mail, PinIcon, MapPin, Phone, Clock } from "lucide-react"
import { siteConfig } from "@/app/seo.config"

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-white to-gray-50">
      {/* Top Wave Pattern */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-[url('/wave.svg')] bg-repeat-x opacity-10"></div>

      <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">L</span>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                Irish Lotto Results
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Your trusted source for Irish Lottery results. Get instant access to the latest draws, numbers, and jackpot information.
            </p>
            <div className="flex flex-wrap gap-4" style={{ contentVisibility: 'auto' }}>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-blue-400 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-pink-600 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-red-600 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-blue-800 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                aria-label="Connect with us on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Quick Links
            </h3>
            <nav className="space-y-4">
              <Link 
                href="/results/history" 
                className="block text-gray-600 hover:text-green-600 transition-colors"
              >
                Results History
              </Link>
              <Link 
                href="/how-to-play" 
                className="block text-gray-600 hover:text-green-600 transition-colors"
              >
                How to Play
              </Link>
              <Link 
                href="/contact" 
                className="block text-gray-600 hover:text-green-600 transition-colors"
              >
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Contact & Support
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <span>support@irishlottoresults.co.uk</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>United Kingdom</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <span>Results updated daily</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Stay Updated
            </h3>
            <p className="text-gray-600" style={{ contentVisibility: 'auto' }}>
              Follow us on social media for the latest lottery results, news, and updates.
            </p>
            <div className="bg-white rounded-xl p-4 shadow-md" style={{ contentVisibility: 'auto' }}>
              <p className="text-sm text-gray-500 mb-2">
                <span className="font-semibold text-green-600">Tip:</span> Enable notifications to get instant results!
              </p>
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 flex-shrink-0"></span>
                <span>Results posted within minutes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="text-center">
            {/* Legal Links */}
            <div className="mb-6 flex justify-center space-x-6">
              <Link 
                href="/privacy-policy" 
                className="text-gray-600 hover:text-green-600 transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-gray-600 hover:text-green-600 transition-colors text-sm"
              >
                Terms & Conditions
              </Link>
              <Link 
                href="/responsible-gaming" 
                className="text-gray-600 hover:text-green-600 transition-colors text-sm"
              >
                Responsible Gaming
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()}{" "}
              <a 
                href="https://www.irishlottoresults.co.uk" 
                className="text-green-600 hover:underline"
              >
                IrishLottoResults.co.uk
              </a>
              {" "}- All rights reserved.
            </p>

            {/* Disclaimer */}
            <p className="mt-4 text-xs text-gray-500 max-w-2xl mx-auto">
              This website is not affiliated with or endorsed by the Irish National Lottery.
              Please gamble responsibly and be aware of your local jurisdiction's gambling laws.
              If you feel you may have a gambling problem, please visit{" "}
              <a 
                href="https://www.gamcare.org.uk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-600 hover:underline"
              >
                GamCare
              </a>
              {" "}for support.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Wave Pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-[url('/wave.svg')] bg-repeat-x opacity-10 transform rotate-180"></div>
    </footer>
  )
}

export default Footer

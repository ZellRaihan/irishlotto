'use client';

import Link from 'next/link';
import { Github, Mail, Globe } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-gradient-to-b from-background to-green-50/20">
      <div className="container p-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl">L</span>
              </div>
              <h3 className="text-xl font-bold">Irish Lotto Results</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Your trusted source for Irish Lotto results. Check numbers, track draws, and stay updated with the latest lottery information.
            </p>
            <div className="flex space-x-4 pt-4">
              <Link 
                href="https://github.com/ZellRaihan" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-green-600 transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link 
                href="mailto:contact@irishlotto.com"
                className="text-muted-foreground hover:text-green-600 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </Link>
              <Link 
                href="https://www.lottery.ie"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-green-600 transition-colors"
              >
                <Globe className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/" 
                  className="text-muted-foreground hover:text-green-600 transition-colors flex items-center space-x-2"
                >
                  <span>→</span>
                  <span>Latest Results</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/results/history" 
                  className="text-muted-foreground hover:text-green-600 transition-colors flex items-center space-x-2"
                >
                  <span>→</span>
                  <span>Results History</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="https://www.lottery.ie/useful-info/responsible-play"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-green-600 transition-colors flex items-center space-x-2"
                >
                  <span>→</span>
                  <span>Responsible Gaming</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Legal</h3>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                This website is not affiliated with or endorsed by the Irish National Lottery. 
                All lottery results and other information are provided for informational purposes only.
              </p>
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <p className="text-sm text-green-800">
                  Please gamble responsibly. If you feel you may have a gambling problem, 
                  seek help at <Link href="https://www.gamcare.org.uk" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">GamCare</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Irish Lotto Results. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>
                Made with &hearts; by{' '}
                <Link 
                  href="https://github.com/ZellRaihan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 transition-colors font-medium"
                >
                  Zell Raihan
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

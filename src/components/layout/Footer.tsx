'use client';

import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-bg-alt mt-auto">
      <div className="container-tight py-12">
        <div className="grid grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-fg mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-fg-muted hover:text-fg transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-fg-muted hover:text-fg transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-fg-muted hover:text-fg transition-colors">
                  Security
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-fg mb-4">Developers</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-fg-muted hover:text-fg transition-colors">
                  API Docs
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-fg-muted hover:text-fg transition-colors">
                  Webhooks
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-fg-muted hover:text-fg transition-colors">
                  Status
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-fg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-fg-muted hover:text-fg transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-fg-muted hover:text-fg transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-fg-muted hover:text-fg transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-fg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-fg-muted hover:text-fg transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-fg-muted hover:text-fg transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-fg-muted hover:text-fg transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex items-center justify-between">
          <p className="text-sm text-fg-muted">&copy; 2026 Upseli. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-sm text-fg-muted hover:text-fg transition-colors">
              Twitter
            </a>
            <a href="#" className="text-sm text-fg-muted hover:text-fg transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

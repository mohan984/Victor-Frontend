import Link from 'next/link';

// You can keep these SVG components in a separate file or inline like this
const SocialIcon = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
    {children}
  </a>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Brand and Tagline */}
          <div className="md:col-span-1">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <span className="text-2xl">🎓</span>
                <h1 className="text-xl font-bold">MockExam</h1>
              </div>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Your trusted platform for acing competitive exams with realistic mock tests.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="/faq"><div className="text-base text-gray-400 hover:text-white transition-colors">FAQ</div></Link></li>
              <li><Link href="/contact"><div className="text-base text-gray-400 hover:text-white transition-colors">Contact</div></Link></li>
              <li><Link href="/about"><div className="text-base text-gray-400 hover:text-white transition-colors">About Us</div></Link></li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="/terms"><div className="text-base text-gray-400 hover:text-white transition-colors">Terms of Service</div></Link></li>
              <li><Link href="/privacy"><div className="text-base text-gray-400 hover:text-white transition-colors">Privacy Policy</div></Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Social Icons */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 text-center sm:text-left">
            &copy; {currentYear} MockExam, Inc. All rights reserved.
          </p>
          <div className="flex items-center space-x-5 mt-4 sm:mt-0">
            <SocialIcon href="#">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
            </SocialIcon>
            <SocialIcon href="#">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
            </SocialIcon>
            <SocialIcon href="#">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995.017-2.277-1.387-2.277-1.405 0-1.622 1.096-1.622 2.206v4.249H8.001v-8.39h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.127 0c0 1.14-.92 2.065-2.064 2.065zm1.332 9.403H4.002V7.82h2.667v8.016zM17.668 1H6.329A5.332 5.332 0 001 6.332v11.336C1 22.998 5.331 24 6.329 24h11.339C22.997 24 24 22.998 24 17.668V6.332A5.332 5.332 0 0017.668 1z" clipRule="evenodd" /></svg>
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
}

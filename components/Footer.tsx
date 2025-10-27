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
              <li><Link href="/contact"><div className="text-base text-gray-400 hover:text-white transition-colors">Contact</div></Link></li>
              <li><Link href="/about"><div className="text-base text-gray-400 hover:text-white transition-colors">About Us</div></Link></li>
               <li><div className="text-base text-gray-400 hover:text-white transition-colors">Support 123@gmail.com</div></li>
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
           
          </div>
        </div>
      </div>
    </footer>
  );
}

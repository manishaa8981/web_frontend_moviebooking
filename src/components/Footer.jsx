import {
  Facebook,
  Instagram,
  Link,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-12 px-4 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="space-y-4">
          <h3 className="text-white font-bold text-lg">ThreaterX</h3>
          <p className="text-sm">
            Your premier destination for movie tickets and entertainment.
          </p>
          <div className="flex space-x-4">
            <Facebook className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            <Twitter className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            <Instagram className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            <Youtube className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-white font-bold text-lg">Quick Links</h3>
          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer transition-colors">
              Now Showing
            </li>
            <Link
              to={"/forgot-password"}
              className="hover:text-white cursor-pointer transition-colors"
            >
              Coming Soon
            </Link>
            <li className="hover:text-white cursor-pointer transition-colors">
              Cinemas
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Offers
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Gift Cards
            </li>
          </ul>
        </div>

        {/* Help & Support */}
        <div className="space-y-4">
          <h3 className="text-white font-bold text-lg">Help & Support</h3>
          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer transition-colors">
              FAQs
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Terms of Service
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Privacy Policy
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Contact Support
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Refund Policy
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-white font-bold text-lg">Contact Us</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span className="text-sm">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span className="text-sm">support@threaterX.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">123 Cinema Street, Movie City</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © 2025 ThreaterX. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 mt-2 md:mt-0">
            Made with ♥ for movie lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

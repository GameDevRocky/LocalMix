import { motion } from "framer-motion"; // Ensure the correct library is imported
import { useState } from "react";

const Footer = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-48 bg-neutral-950 text-neutral-300 flex flex-col items-center justify-between p-4"
    >
      {/* Company Name */}
      <div className="text-center">
        <h1 className="text-xl font-bold text-white">LocalMix</h1>
        <p className="text-sm text-neutral-400">Bringing communities together, one event at a time.</p>
      </div>

      {/* Links Section */}
      <div className="flex justify-center space-x-8">
        <a href="/about" className="hover:text-white transition-colors">
          About Us
        </a>
        <a href="/events" className="hover:text-white transition-colors">
          Events
        </a>
        <a href="/contact" className="hover:text-white transition-colors">
          Contact
        </a>
        <a href="/privacy" className="hover:text-white transition-colors">
          Privacy Policy
        </a>
      </div>

      {/* Social Media */}
      <div className="flex justify-center space-x-4 mt-2">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          <i className="fab fa-facebook-f">Facebook</i>
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          <i className="fab fa-twitter">Twitter</i>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          <i className="fab fa-instagram">Instagram</i>
        </a>
      </div>

      {/* Copyright Section */}
      <div className="text-sm text-neutral-500 mt-4">
        © {new Date().getFullYear()} LocalMix. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;

import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-white">
              Mind<span className="text-green-500">Bridge</span>
            </h2>

            <p className="mt-5 leading-7">
              Empowering students with AI-driven mental wellness support,
              personalized guidance, and a caring community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li><a href="#" className="hover:text-green-400 transition">Home</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Features</a></li>
              <li><a href="#" className="hover:text-green-400 transition">About</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Testimonials</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Resources
            </h3>

            <ul className="space-y-3">
              <li><a href="#" className="hover:text-green-400 transition">Mental Health Tips</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Breathing Exercises</a></li>
              <li><a href="#" className="hover:text-green-400 transition">FAQs</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Support</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Connect With Us
            </h3>

            <div className="flex gap-5 text-2xl">
              <a href="#" className="hover:text-green-400 transition">
                <FaGithub />
              </a>

              <a href="#" className="hover:text-green-400 transition">
                <FaLinkedin />
              </a>

              <a href="#" className="hover:text-green-400 transition">
                <FaEnvelope />
              </a>
            </div>

            <p className="mt-6">
              Email: support@mindbridge.com
            </p>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">

          <p>
            © 2026 MindBridge. All Rights Reserved.
          </p>

          <p className="flex items-center gap-2 mt-4 md:mt-0">
            Made with <FaHeart className="text-red-500" /> for Students
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-4 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Shree Pallak Cabs</h2>
          <p className="text-sm text-gray-300">
            YourCab is your trusted ride partner for safe, reliable, and
            affordable cab bookings. Whether you're commuting in the city or
            traveling outstation, we’ve got you covered 24/7.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-4">Get in Touch</h3>
          <p className="text-sm text-gray-300 mb-2">
            Email: support@shreepallakcabs.com
          </p>
          <p className="text-sm text-gray-300">Phone:+91 78712 37890</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#">
              <FaFacebookF className="hover:text-blue-500" />
            </a>
            <a href="#">
              <FaTwitter className="hover:text-blue-400" />
            </a>
            <a href="#">
              <FaInstagram className="hover:text-pink-500" />
            </a>
            <a href="#">
              <FaLinkedinIn className="hover:text-blue-700" />
            </a>
            <a href="#">
              <FaYoutube className="hover:text-red-600" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-sm text-center text-gray-400">
        © {new Date().getFullYear()} Shree Pallak cabs. All rights reserved. |
        Developed by{" "}
        <span className="text-orange-500 font-semibold">Rt-info tech</span>
      </div>
    </footer>
  );
};

export default Footer;

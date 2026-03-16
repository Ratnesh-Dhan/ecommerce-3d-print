export default function Footer() {
    return (
      <footer className="w-full bg-black text-gray-400 border-t border-yellow-500 mt-10">
  
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
  
          {/* Company */}
          <div>
            <h3 className="text-yellow-500 font-bold mb-3">Kamal 3D</h3>
            <p className="text-sm">
              Professional 3D printing services and instant STL price
              calculator.
            </p>
          </div>
  
          {/* Links */}
          <div>
            <h3 className="text-yellow-500 font-bold mb-3">Quick Links</h3>
  
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-yellow-400">Home</a></li>
              <li><a href="/stl" className="hover:text-yellow-400">STL Calculator</a></li>
              <li><a href="/services" className="hover:text-yellow-400">Services</a></li>
              <li><a href="/contact" className="hover:text-yellow-400">Contact</a></li>
            </ul>
          </div>
  
          {/* Contact */}
          <div>
            <h3 className="text-yellow-500 font-bold mb-3">Contact</h3>
  
            <p className="text-sm">Jamshedpur, India</p>
            <p className="text-sm">kamal3d@example.com</p>
          </div>
  
        </div>
  
        <div className="text-center text-xs border-t border-gray-800 py-4">
          © {new Date().getFullYear()} Kamal 3D. All rights reserved.
        </div>
  
      </footer>
    );
  }
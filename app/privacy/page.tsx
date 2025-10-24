import Navigation from '@/components/Navigation';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation showDashboardLinks={false} />

      {/* Hero Section */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Privacy <span className="text-orange-500">Policy</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-gray-500 mt-4">Last updated: December 2024</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-white p-12 rounded-xl shadow-lg">
            <div className="prose prose-lg max-w-none">
              
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Information We Collect</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                We collect information you provide directly to us, such as when you create an account, 
                use our services, or contact us for support.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Personal Information</h3>
              <ul className="list-disc pl-6 mb-8 text-gray-600 leading-relaxed">
                <li>Name and contact information</li>
                <li>Email address and phone number</li>
                <li>Profile information and preferences</li>
                <li>Location data (with your permission)</li>
                <li>Food listings and interactions</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Automatically Collected Information</h3>
              <ul className="list-disc pl-6 mb-8 text-gray-600 leading-relaxed">
                <li>Device information and identifiers</li>
                <li>Log data and usage information</li>
                <li>Cookies and similar technologies</li>
                <li>IP address and location data</li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">How We Use Your Information</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                We use the information we collect to provide, maintain, and improve our services.
              </p>

              <ul className="list-disc pl-6 mb-8 text-gray-600 leading-relaxed">
                <li>Provide and maintain our food sharing platform</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Improve our services and develop new features</li>
                <li>Monitor and analyze trends and usage</li>
                <li>Ensure safety and security of our platform</li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">Information Sharing</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except as described in this policy.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">We may share information with:</h3>
              <ul className="list-disc pl-6 mb-8 text-gray-600 leading-relaxed">
                <li>Other users when you interact with them through our platform</li>
                <li>Service providers who assist us in operating our platform</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners in connection with a merger or acquisition</li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">Data Security</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Rights</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                You have certain rights regarding your personal information:
              </p>

              <ul className="list-disc pl-6 mb-8 text-gray-600 leading-relaxed">
                <li>Access and update your personal information</li>
                <li>Delete your account and associated data</li>
                <li>Opt out of certain communications</li>
                <li>Request a copy of your data</li>
                <li>Object to certain processing activities</li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">Cookies and Tracking</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                We use cookies and similar technologies to enhance your experience on our platform. 
                You can control cookie preferences through your browser settings.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">Children&apos;s Privacy</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our services are not intended for children under 13 years of age. We do not knowingly 
                collect personal information from children under 13.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">Changes to This Policy</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                We may update this privacy policy from time to time. We will notify you of any changes 
                    by posting the new policy on this page and updating the &quot;Last updated&quot; date.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                If you have any questions about this privacy policy, please contact us at:
              </p>

              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@foodshare.com<br />
                  <strong>Address:</strong> FoodShare Privacy Team<br />
                  123 Community Street<br />
                  Mumbai, Maharashtra 400001
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <h3 className="text-3xl font-bold text-orange-500 mb-6">FoodShare</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Connecting communities through food sharing to reduce waste and build stronger neighborhoods.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-6">Product</h4>
              <ul className="space-y-4">
                <li><a href="/about" className="text-lg text-gray-600 hover:text-orange-500 transition-colors">Features</a></li>
                <li><a href="/help" className="text-lg text-gray-600 hover:text-orange-500 transition-colors">Help Center</a></li>
                <li><a href="/safety" className="text-lg text-gray-600 hover:text-orange-500 transition-colors">Safety Guidelines</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-6">Company</h4>
              <ul className="space-y-4">
                <li><a href="/about" className="text-lg text-gray-600 hover:text-orange-500 transition-colors">About</a></li>
                <li><a href="/contact" className="text-lg text-gray-600 hover:text-orange-500 transition-colors">Contact</a></li>
                <li><a href="#" className="text-lg text-gray-600 hover:text-orange-500 transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-6">Legal</h4>
              <ul className="space-y-4">
                <li><a href="/privacy" className="text-lg text-gray-600 hover:text-orange-500 transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="text-lg text-gray-600 hover:text-orange-500 transition-colors">Terms of Service</a></li>
                <li><a href="/contact" className="text-lg text-gray-600 hover:text-orange-500 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 mt-16 pt-8 text-center">
            <p className="text-lg text-gray-600">
              © 2024 FoodShare. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

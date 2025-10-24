import Navigation from '@/components/Navigation';

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation showDashboardLinks={false} />

      {/* Hero Section */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Terms of <span className="text-orange-500">Service</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Please read these terms carefully before using our food sharing platform.
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
              
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Acceptance of Terms</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                By accessing and using FoodShare, you accept and agree to be bound by the terms and 
                provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">Description of Service</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                FoodShare is a platform that connects community members to share food and reduce waste. 
                We provide the tools and infrastructure to facilitate these connections, but we are not 
                responsible for the quality, safety, or condition of shared food items.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">User Responsibilities</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                As a user of FoodShare, you agree to:
              </p>

              <ul className="list-disc pl-6 mb-8 text-gray-600 leading-relaxed">
                <li>Provide accurate and complete information</li>
                <li>Follow all applicable laws and regulations</li>
                <li>Respect other users and maintain a safe environment</li>
                <li>Report any safety concerns or inappropriate behavior</li>
                <li>Follow food safety guidelines and best practices</li>
                <li>Not use the platform for illegal or harmful activities</li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">Food Safety and Liability</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                <strong>Important:</strong> Users are solely responsible for the food they share and consume. 
                FoodShare does not guarantee the safety, quality, or condition of any food items shared through our platform.
              </p>

              <p className="text-gray-600 leading-relaxed mb-6">
                By using our platform, you acknowledge and agree that:
              </p>

              <ul className="list-disc pl-6 mb-8 text-gray-600 leading-relaxed">
                <li>You share food at your own risk</li>
                <li>You will follow proper food safety guidelines</li>
                <li>FoodShare is not liable for any illness or injury resulting from shared food</li>
                <li>You will not hold FoodShare responsible for food quality issues</li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">Prohibited Activities</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                You may not use FoodShare to:
              </p>

              <ul className="list-disc pl-6 mb-8 text-gray-600 leading-relaxed">
                <li>Share unsafe or spoiled food</li>
                <li>Share alcohol, tobacco, or illegal substances</li>
                <li>Harass, threaten, or abuse other users</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Spam or send unsolicited communications</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use the platform for commercial purposes without permission</li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">Account Termination</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                We reserve the right to terminate or suspend your account at any time for violations 
                of these terms or for any other reason at our sole discretion. You may also terminate 
                your account at any time by contacting us.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">Intellectual Property</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The FoodShare platform, including its design, features, and functionality, is owned by 
                FoodShare and protected by intellectual property laws. You may not copy, modify, or 
                distribute our platform without permission.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">Privacy</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Your privacy is important to us. Please review our Privacy Policy, which also governs 
                your use of the platform, to understand our practices.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                To the maximum extent permitted by law, FoodShare shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages, including without limitation, 
                loss of profits, data, use, goodwill, or other intangible losses.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">Disclaimers</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The information on this platform is provided on an &quot;as is&quot; basis. To the fullest extent 
                permitted by law, FoodShare excludes all representations, warranties, conditions and 
                terms relating to our platform and the use of our platform.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">Governing Law</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                These terms shall be governed by and construed in accordance with the laws of India, 
                without regard to its conflict of law provisions.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                We reserve the right to modify these terms at any time. We will notify users of any 
                material changes by posting the new terms on this page and updating the &quot;Last updated&quot; date.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                If you have any questions about these terms, please contact us at:
              </p>

              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@foodshare.com<br />
                  <strong>Address:</strong> FoodShare Legal Team<br />
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

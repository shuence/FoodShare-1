import Navigation from '@/components/Navigation';

export default function Help() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation showDashboardLinks={false} />

      {/* Hero Section */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Help <span className="text-orange-500">Center</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions and get the support you need.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <svg className="absolute right-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Quick Help</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Getting Started</h3>
              <p className="text-gray-600 leading-relaxed">
                New to FoodShare? Learn how to create your account and make your first listing.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Safety Guidelines</h3>
              <p className="text-gray-600 leading-relaxed">
                Important safety information for sharing and receiving food in your community.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Troubleshooting</h3>
              <p className="text-gray-600 leading-relaxed">
                Having technical issues? Find solutions to common problems and bugs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Find answers to the most common questions about FoodShare</p>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <button className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">How do I create a food listing?</h3>
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="px-8 pb-6">
                <p className="text-gray-600 leading-relaxed">
                  Creating a listing is easy! Simply click &quot;Create Listing&quot; on your dashboard, upload photos of your food, 
                  add a description, set your location, and specify pickup details. Your listing will be visible to 
                  community members in your area.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <button className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">Is sharing food safe?</h3>
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="px-8 pb-6">
                <p className="text-gray-600 leading-relaxed">
                  Safety is our top priority. We provide comprehensive safety guidelines, encourage users to follow 
                  proper food handling practices, and have a reporting system for any concerns. All users must 
                  verify their identity, and we recommend following standard food safety practices.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <button className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">How do I claim food from a listing?</h3>
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="px-8 pb-6">
                <p className="text-gray-600 leading-relaxed">
                  When you find a listing you&apos;re interested in, click &quot;Claim Food&quot; and send a message to the donor. 
                  The donor will review your request and coordinate pickup details. Make sure to follow the pickup 
                  instructions and be respectful of the donor&apos;s time.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <button className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">What types of food can I share?</h3>
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="px-8 pb-6">
                <p className="text-gray-600 leading-relaxed">
                  You can share most types of food including fresh produce, packaged goods, prepared meals, 
                  and pantry items. Please ensure all food is safe to consume, properly stored, and clearly 
                  labeled with expiration dates when applicable. We don&apos;t allow alcohol, raw meat, or 
                  homemade items that require refrigeration.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <button className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">How do I report a problem?</h3>
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="px-8 pb-6">
                <p className="text-gray-600 leading-relaxed">
                  If you encounter any issues or safety concerns, please use our reporting feature on the listing 
                  or contact our support team directly. We take all reports seriously and will investigate 
                  promptly to ensure the safety and integrity of our community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Still Need Help?</h2>
          <p className="text-xl text-gray-600 mb-12">
            Can&apos;t find what you&apos;re looking for? Our support team is here to help.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Email Support</h3>
              <p className="text-gray-600 mb-6">Get help via email within 24 hours</p>
              <a href="mailto:support@foodshare.com" className="text-orange-500 font-semibold hover:text-orange-600 transition-colors">
                support@foodshare.com
              </a>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Live Chat</h3>
              <p className="text-gray-600 mb-6">Chat with our support team in real-time</p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                Start Chat
              </button>
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

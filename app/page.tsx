import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation showDashboardLinks={false} />

      {/* Hero Section */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Share Food,{" "}
              <span className="text-orange-500">Reduce Waste</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Connect with your community to share food and reduce waste. 
              Find fresh food near you or share what you have with others.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="/register" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg hover:shadow-xl text-center"
              >
                Start Sharing
              </a>
              <a 
                href="/browse" 
                className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-10 py-4 rounded-lg text-lg font-semibold transition-colors text-center"
              >
                Find Food
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose FoodShare?
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We make it easy to connect with your community and reduce food waste
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-10 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-8">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Local Community</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Connect with people in your neighborhood to share and receive fresh food.
              </p>
            </div>

            <div className="bg-white p-10 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-8">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l2.318-2.318a4.5 4.5 0 00-6.364-6.364L12 7.636l-2.318 2.318z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Reduce Waste</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Help reduce food waste by sharing excess food with those who need it.
              </p>
            </div>

            <div className="bg-white p-10 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-8">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Easy to Use</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Simple and intuitive interface makes sharing food effortless and enjoyable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get started in just a few simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-8 shadow-lg">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Sign Up</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Create your account and set up your profile in minutes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-orange-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-8 shadow-lg">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">List or Browse</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Share your excess food or browse available items in your area.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-orange-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-8 shadow-lg">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Connect & Share</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Connect with community members and arrange food sharing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-500 py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Sharing?
          </h2>
          <p className="text-xl md:text-2xl text-orange-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of community members who are already reducing food waste together.
          </p>
          <a 
            href="/register" 
            className="bg-white text-orange-500 hover:bg-gray-100 px-12 py-4 rounded-lg text-xl font-semibold transition-colors shadow-lg hover:shadow-xl inline-block"
          >
            Get Started Today
          </a>
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
                <li><a href="#features" className="text-lg text-gray-600 hover:text-orange-500 transition-colors">Features</a></li>
                <li><a href="/help" className="text-lg text-gray-600 hover:text-orange-500 transition-colors">Help Center</a></li>
                <li><a href="#how-it-works" className="text-lg text-gray-600 hover:text-orange-500 transition-colors">How it Works</a></li>
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
                <li><a href="/safety" className="text-lg text-gray-600 hover:text-orange-500 transition-colors">Safety Guidelines</a></li>
                <li><a href="/privacy" className="text-lg text-gray-600 hover:text-orange-500 transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="text-lg text-gray-600 hover:text-orange-500 transition-colors">Terms of Service</a></li>
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

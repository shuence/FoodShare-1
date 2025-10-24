'use client';

import Navigation from '@/components/Navigation';
import { useState } from 'react';
import { Mail, MapPin } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation showDashboardLinks={false} />

      {/* Hero Section */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Contact <span className="text-orange-500">Us</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white p-10 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-lg font-semibold text-gray-900 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-lg font-semibold text-gray-900 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-lg font-semibold text-gray-900 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="safety">Safety Concern</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-lg font-semibold text-gray-900 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in touch</h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Have questions about FoodShare? Need help with your account? Want to report a safety concern? 
                  We&apos;re here to help and would love to hear from you.
                </p>
              </div>

              <div className="space-y-8">       
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Email Support</h3>
                    <p className="text-gray-600 mb-2">For general inquiries and support</p>
                    <a href="mailto:support@foodshare.com" className="text-orange-500 hover:text-orange-600 font-semibold transition-colors">
                      support@foodshare.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Office Address</h3>
                    <p className="text-gray-600 mb-2">FoodShare Headquarters</p>
                    <p className="text-gray-600">123 Community Street</p>
                    <p className="text-gray-600">Mumbai, Maharashtra 400001</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common questions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-3">How quickly do you respond?</h3>
                <p className="text-gray-600 leading-relaxed">
                  We typically respond to emails within 24 hours during business days. For urgent safety concerns, 
                  we prioritize these messages and respond within a few hours.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Can I speak to someone directly?</h3>
                <p className="text-gray-600 leading-relaxed">
                  For complex issues, we can schedule a phone call or video meeting. Please include your phone 
                    number in your message and we&apos;ll coordinate a time that works for you.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Do you offer community partnerships?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes! We love partnering with local organizations, food banks, and community groups. 
                  Please reach out to discuss potential collaboration opportunities.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-3">How can I report a user?</h3>
                <p className="text-gray-600 leading-relaxed">
                  If you encounter inappropriate behavior or safety concerns, please report it immediately 
                  through our reporting system or email safety@foodshare.com with details.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <a 
              href="/help" 
              className="text-orange-500 hover:text-orange-600 font-semibold text-lg transition-colors"
            >
              View all FAQs →
            </a>
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

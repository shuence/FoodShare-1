'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardNavbar from '@/components/DashboardNavbar';
import { 
  Package, 
  Heart,
  Search, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Phone, 
  MessageCircle, 
  FileText, 
  Shield, 
  AlertCircle,
  User,
} from 'lucide-react';

export default function HelpPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({
    subject: '',
    category: 'general',
    message: '',
  });

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const faqs = [
    {
      id: '1',
      question: 'How do I share food on FoodShare?',
      answer: 'To share food, go to your dashboard and click "Share Food". Fill in the details about your food item including type, quantity, pickup time, and location. Make sure to provide accurate information to help others find your listing.',
      category: 'sharing',
    },
    {
      id: '2',
      question: 'How do I claim food from other users?',
      answer: 'Browse available food listings on the Browse page. When you find something you want, click "Claim Food" and send a message to the donor. The donor will review your request and confirm if you can pick up the food.',
      category: 'claiming',
    },
    {
      id: '3',
      question: 'What types of food can I share?',
      answer: 'You can share any safe, edible food including fresh produce, prepared meals, baked goods, dairy products, and non-perishable items. Make sure the food is properly stored and within safe consumption dates.',
      category: 'sharing',
    },
    {
      id: '4',
      question: 'How do I contact a donor or receiver?',
      answer: 'Once a claim is confirmed, you can contact the other person through the messaging system in the app. You can also find their contact information in the listing details if they have made it public.',
      category: 'communication',
    },
    {
      id: '5',
      question: 'What if I need to cancel a food listing?',
      answer: 'You can edit or delete your food listings from the "My Listings" page in your dashboard. If someone has already claimed the food, make sure to contact them to let them know about the cancellation.',
      category: 'management',
    },
    {
      id: '6',
      question: 'How do I report inappropriate behavior?',
      answer: 'If you encounter inappropriate behavior, you can report it by clicking the report button on the user\'s profile or by contacting our support team directly. We take all reports seriously and will investigate promptly.',
      category: 'safety',
    },
    {
      id: '7',
      question: 'Is there a cost to use FoodShare?',
      answer: 'FoodShare is completely free to use! We believe in making food sharing accessible to everyone. The app is supported by donations and partnerships with local organizations.',
      category: 'general',
    },
    {
      id: '8',
      question: 'How do I update my profile information?',
      answer: 'Go to your Profile page and click "Edit Profile". You can update your name, email, phone number, and address. Make sure to keep your information current so others can contact you easily.',
      category: 'account',
    },
  ];

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFAQToggle = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the contact form
    alert('Your message has been sent to our support team. We\'ll get back to you within 24 hours.');
    setContactForm({ subject: '', category: 'general', message: '' });
  };

  const contactCategories = [
    { value: 'general', label: 'General Question' },
    { value: 'technical', label: 'Technical Issue' },
    { value: 'safety', label: 'Safety Concern' },
    { value: 'account', label: 'Account Issue' },
    { value: 'feedback', label: 'Feedback' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardNavbar 
        title="Help & Support" 
        subtitle="Get help and find answers to your questions" 
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
        {/* Quick Help Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">How to Share</h3>
            <p className="text-sm text-gray-600 mb-4">Learn how to share food with your community</p>
            <button className="text-orange-500 hover:text-orange-600 text-sm font-medium">
              Read Guide
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">How to Claim</h3>
            <p className="text-sm text-gray-600 mb-4">Find and claim food from others</p>
            <button className="text-green-500 hover:text-green-600 text-sm font-medium">
              Read Guide
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Safety Tips</h3>
            <p className="text-sm text-gray-600 mb-4">Stay safe while sharing food</p>
            <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
              Read Tips
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Account Help</h3>
            <p className="text-sm text-gray-600 mb-4">Manage your account settings</p>
            <button className="text-purple-500 hover:text-purple-600 text-sm font-medium">
              Get Help
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* FAQ List */}
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => handleFAQToggle(faq.id)}
                      className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      {expandedFAQ === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    {expandedFAQ === faq.id && (
                      <div className="px-4 pb-4">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredFAQs.length === 0 && (
                <div className="text-center py-8">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs found</h3>
                  <p className="text-gray-600">Try adjusting your search terms</p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Support */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Contact Support</h2>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={contactForm.category}
                    onChange={(e) => setContactForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {contactCategories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Describe your issue in detail..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Send Message
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-4">Other Ways to Contact Us</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-3" />
                    <span>support@foodshare.com</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-3" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MessageCircle className="w-4 h-4 mr-3" />
                    <span>Live Chat (9 AM - 6 PM EST)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Additional Resources</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">User Guide</h3>
                <p className="text-sm text-gray-600 mb-4">Complete guide to using FoodShare</p>
                <button className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                  Download PDF
                </button>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Safety Guidelines</h3>
                <p className="text-sm text-gray-600 mb-4">Best practices for food safety</p>
                <button className="text-green-500 hover:text-green-600 text-sm font-medium">
                  Read Guidelines
                </button>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Report Issue</h3>
                <p className="text-sm text-gray-600 mb-4">Report bugs or problems</p>
                <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                  Report Now
                </button>
              </div>
            </div>
          </div>
          </div>
        </div>
        </main>
      </div>
    </div>
  );
}

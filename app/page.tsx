'use client';

import { Star, Coffee, MapPin, Clock, Zap, Users, Truck, Award } from 'lucide-react';
import { useHeadline } from '@/hooks/useHeadline';
import { AdminPanel } from '@/components/AdminPanel';
import { SidebarNav } from '@/components/SidebarNav';

function HomePage() {
  const { headline, loading } = useHeadline();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="sticky top-0 z-40 bg-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coffee size={28} className="text-amber-900" />
              <span className="text-2xl font-bold text-amber-900">CoffeeBlend</span>
            </div>
            <nav className="hidden md:flex gap-8">
              <a href="#services" className="text-gray-700 hover:text-amber-900 font-medium transition">Services</a>
              <a href="#hours" className="text-gray-700 hover:text-amber-900 font-medium transition">Hours</a>
              <a href="#contact" className="text-gray-700 hover:text-amber-900 font-medium transition">Contact</a>
            </nav>
          </div>
        </div>
      </div>

      <SidebarNav />

      <section id="hero" className="container mx-auto px-6 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-amber-900 text-amber-100 px-4 py-2 rounded-full text-sm font-medium">
                  <Coffee size={16} />
                  <span>CoffeeBlend</span>
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                {loading ? (
                  <span className="animate-pulse">Loading...</span>
                ) : (
                  headline
                )}
              </h1>

              <p className="text-xl md:text-2xl text-gray-700 mb-8 font-light">
                Premium Coffee Experience
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="fill-amber-500 text-amber-500"
                    />
                  ))}
                  <span className="ml-2 text-gray-700 font-semibold">5.0</span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600">130k reviews</span>
                <span className="text-gray-400">|</span>
                <div className="flex items-center gap-1">
                  <Coffee size={18} className="text-amber-700" />
                  <span className="text-gray-700 font-semibold">4.8</span>
                  <span className="text-gray-600">quality</span>
                </div>
              </div>

              <button className="bg-amber-800 hover:bg-amber-900 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                Browse Collection
              </button>
            </div>

            <div className="flex-1 relative">
              <div className="relative bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-8 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-amber-800 rounded-full flex items-center justify-center">
                        <Coffee size={32} className="text-amber-100" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          Artisan Roasted
                        </h3>
                        <p className="text-gray-600">Small batch perfection</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-amber-50 rounded-lg">
                          <p className="text-3xl font-bold text-amber-900">100+</p>
                          <p className="text-sm text-gray-600">Blends</p>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                          <p className="text-3xl font-bold text-orange-900">20+</p>
                          <p className="text-sm text-gray-600">Origins</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-amber-900 to-orange-900 text-white p-4 rounded-lg text-center">
                      <p className="text-sm font-medium">
                        Free shipping on orders over $50
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 bg-yellow-300 text-gray-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg transform rotate-12">
                  New!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-white py-20 border-t border-b border-amber-100">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Services
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need for the perfect coffee experience
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-amber-900 rounded-full flex items-center justify-center">
                    <Zap size={32} className="text-amber-100" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Brewing</h3>
                <p className="text-gray-600">
                  Expert brewing techniques for the perfect cup in minutes
                </p>
              </div>

              <div className="text-center p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-amber-900 rounded-full flex items-center justify-center">
                    <Award size={32} className="text-amber-100" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Quality</h3>
                <p className="text-gray-600">
                  Single-origin beans sourced from the finest farms worldwide
                </p>
              </div>

              <div className="text-center p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-amber-900 rounded-full flex items-center justify-center">
                    <Truck size={32} className="text-amber-100" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Free Delivery</h3>
                <p className="text-gray-600">
                  Complimentary shipping on all orders over $50
                </p>
              </div>

              <div className="text-center p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-amber-900 rounded-full flex items-center justify-center">
                    <Users size={32} className="text-amber-100" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Support</h3>
                <p className="text-gray-600">
                  Personalized recommendations from our coffee specialists
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="hours" className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Visit Our Café
                </h2>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-amber-900 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="font-semibold text-gray-900">Address</p>
                      <p className="text-gray-600">
                        123 Coffee Street<br />
                        Brew City, BC 12345
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="text-amber-900 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <p className="text-gray-600">(555) 123-4567</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-amber-900 to-orange-900 text-white p-6">
                  <h3 className="text-2xl font-bold mb-6">Opening Hours</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="font-semibold text-gray-900">Monday</span>
                    <span className="text-gray-600">6:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="font-semibold text-gray-900">Tuesday</span>
                    <span className="text-gray-600">6:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="font-semibold text-gray-900">Wednesday</span>
                    <span className="text-gray-600">6:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="font-semibold text-gray-900">Thursday</span>
                    <span className="text-gray-600">6:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="font-semibold text-gray-900">Friday</span>
                    <span className="text-gray-600">6:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="font-semibold text-gray-900">Saturday</span>
                    <span className="text-gray-600">7:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Sunday</span>
                    <span className="text-gray-600">7:00 AM - 7:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-amber-900 to-orange-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Experience Premium Coffee Today
            </h2>
            <p className="text-lg text-amber-100 mb-8">
              Join thousands of coffee lovers who have discovered their perfect blend
            </p>
            <button className="bg-white text-amber-900 px-8 py-4 rounded-lg font-semibold hover:bg-amber-50 transition-colors shadow-lg">
              Order Now
            </button>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-gray-900 text-gray-300 py-12 border-t border-amber-800">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Coffee size={24} className="text-amber-700" />
                  <span className="text-xl font-bold text-white">CoffeeBlend</span>
                </div>
                <p className="text-sm">
                  Crafting exceptional coffee experiences since 2020
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-amber-400 transition">About Us</a></li>
                  <li><a href="#services" className="hover:text-amber-400 transition">Services</a></li>
                  <li><a href="#hours" className="hover:text-amber-400 transition">Hours</a></li>
                  <li><a href="#contact" className="hover:text-amber-400 transition">Contact</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Contact Info</h4>
                <ul className="space-y-2 text-sm">
                  <li>Phone: (555) 123-4567</li>
                  <li>Email: hello@coffeeblend.com</li>
                  <li>Hours: 6 AM - 9 PM Daily</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Follow Us</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-amber-400 transition">Facebook</a></li>
                  <li><a href="#" className="hover:text-amber-400 transition">Instagram</a></li>
                  <li><a href="#" className="hover:text-amber-400 transition">Twitter</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-8 text-center text-sm">
              <p>&copy; 2024 CoffeeBlend. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      <AdminPanel />
    </div>
  );
}

export default HomePage;

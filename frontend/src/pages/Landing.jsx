import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Leaf, Globe, TrendingUp, Shield, Truck, CheckCircle, ArrowRight, Star } from 'lucide-react';

const commodities = [
  { name: 'Cumin Seeds', origin: 'Gujarat, India', price: '$2,850/MT', flag: '🌱', growth: '+12%' },
  { name: 'Turmeric Finger', origin: 'Erode, India', price: '$2,100/MT', flag: '🟡', growth: '+8%' },
  { name: 'Dehydrated Onion', origin: 'Mahuva, India', price: '$1,100/MT', flag: '🧅', growth: '+24%' },
  { name: 'Black Pepper', origin: 'Kerala, India', price: '$6,200/MT', flag: '⚫', growth: '+15%' },
  { name: 'Coriander Seeds', origin: 'Rajasthan, India', price: '$1,450/MT', flag: '🌿', growth: '+9%' },
  { name: 'Fenugreek Seeds', origin: 'Rajasthan, India', price: '$950/MT', flag: '🟤', growth: '+6%' },
];

const features = [
  { icon: Globe, title: 'Global Reach', desc: 'Connect with verified buyers across 50+ countries including UAE, Germany, USA, and Japan.', color: 'bg-blue-100 text-blue-600' },
  { icon: TrendingUp, title: 'AI Market Intelligence', desc: 'Real-time price alerts and AI-powered SELL/HOLD/STORE recommendations for farmers.', color: 'bg-green-100 text-green-600' },
  { icon: Shield, title: 'Verified & Secure', desc: 'KYC-verified buyers and farmers. Escrow-protected payments. Transparent trade.', color: 'bg-purple-100 text-purple-600' },
  { icon: Truck, title: 'End-to-End Logistics', desc: 'Door-to-port shipping, documentation (BL, COO, Phytosanitary) and real-time tracking.', color: 'bg-orange-100 text-orange-600' },
];

const steps = [
  { num: '01', title: 'Register & Verify', desc: 'Create your account as a buyer or farmer. Complete KYC for full platform access.' },
  { num: '02', title: 'Connect & Trade', desc: 'Buyers browse products and submit RFQs. Farmers list crops and view demand signals.' },
  { num: '03', title: 'Ship & Track', desc: 'Admin handles export documentation and logistics. Track shipments in real-time.' },
];

const Landing = () => (
  <div className="min-h-screen bg-white">
    <Navbar />

    {/* Hero */}
    <section className="relative bg-gradient-to-br from-green-700 via-green-600 to-green-500 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-white" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm mb-6 backdrop-blur-sm">
          <span className="bg-green-300 text-green-900 rounded-full px-2 py-0.5 text-xs font-bold">NEW</span>
          AI-Powered Market Intelligence Now Available
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Connecting Indian Farmers<br />
          <span className="text-green-200">to Global Markets</span>
        </h1>
        <p className="text-xl text-green-100 max-w-2xl mx-auto mb-10">
          India's premier B2B agri-export platform for spices, cumin, dehydrated vegetables & grains.
          Trusted by 500+ farmers and 200+ global buyers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register?role=buyer" className="bg-white text-green-700 font-bold py-3 px-8 rounded-xl hover:bg-green-50 transition-colors flex items-center gap-2 justify-center">
            I'm a Buyer <ArrowRight className="h-5 w-5" />
          </Link>
          <Link to="/register?role=farmer" className="bg-green-800 text-white font-bold py-3 px-8 rounded-xl hover:bg-green-900 transition-colors flex items-center gap-2 justify-center border border-green-400">
            I'm a Farmer <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
        <div className="flex justify-center gap-8 mt-12 text-sm text-green-200">
          <div className="text-center"><div className="text-3xl font-bold text-white">500+</div>Farmers</div>
          <div className="w-px bg-green-400" />
          <div className="text-center"><div className="text-3xl font-bold text-white">200+</div>Buyers</div>
          <div className="w-px bg-green-400" />
          <div className="text-center"><div className="text-3xl font-bold text-white">50+</div>Countries</div>
          <div className="w-px bg-green-400" />
          <div className="text-center"><div className="text-3xl font-bold text-white">$4.1B</div>Exports</div>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose AgriExport India?</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Everything you need to export Indian agri-commodities to global markets, in one platform.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className={`inline-flex p-3 rounded-xl mb-4 ${f.color}`}>
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Commodities */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Commodities We Export</h2>
          <p className="text-gray-500 text-lg">Premium quality, directly sourced from India's best growing regions</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {commodities.map((c) => (
            <div key={c.name} className="border border-gray-200 rounded-xl p-5 hover:border-green-400 hover:shadow-md transition-all group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{c.flag}</span>
                <span className="badge-green">{c.growth}</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{c.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{c.origin}</p>
              <div className="flex items-center justify-between">
                <span className="text-green-600 font-bold">{c.price}</span>
                <Link to="/register" className="text-sm text-green-600 font-medium group-hover:underline flex items-center gap-1">
                  Get Quote <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* How it works */}
    <section className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-500 text-lg">Three simple steps to start trading internationally</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={s.num} className="text-center relative">
              {i < 2 && <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-green-200 z-0" />}
              <div className="relative inline-flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full text-xl font-bold mb-4 shadow-lg">
                {s.num}
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{s.title}</h3>
              <p className="text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonial / Trust */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex justify-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => <Star key={i} className="h-6 w-6 text-yellow-400 fill-yellow-400" />)}
        </div>
        <blockquote className="text-2xl font-medium text-gray-900 max-w-3xl mx-auto mb-6">
          "AgriExport India helped us source 500 MT of premium cumin directly from Gujarat farmers at 15% better prices than traditional brokers."
        </blockquote>
        <div className="text-gray-500">Ahmed Al Rashid, CEO – Al Rashid Trading LLC, Dubai, UAE</div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Agri Business?</h2>
        <p className="text-gray-300 text-lg mb-8">Join 700+ businesses already trading on AgriExport India.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register?role=buyer" className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-xl transition-colors">Start as a Buyer</Link>
          <Link to="/register?role=farmer" className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-8 rounded-xl transition-colors">List Your Crops</Link>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-gray-900 border-t border-gray-800 py-8 text-center text-gray-400 text-sm">
      <div className="flex items-center justify-center gap-2 mb-2">
        <div className="bg-green-600 p-1 rounded"><Leaf className="h-4 w-4 text-white" /></div>
        <span className="text-white font-bold">AgriExport India</span>
      </div>
      <p>© 2024 AgriExport India Pvt Ltd. All rights reserved. | Connecting Indian Farmers to Global Markets</p>
    </footer>
  </div>
);

export default Landing;

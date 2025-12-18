
import React from 'react';
import { User, PinDesign } from '../../types';
import { Plus, Search, Filter, MoreHorizontal, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardProps {
  user: User;
  lang: string;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  // Fix: Corrected mock data to strictly adhere to the PinDesign interface by removing 'config' and adding missing required fields
  const mockPins: PinDesign[] = [
    { id: 'p1', userId: 'u1', title: 'Healthy Smoothies', imageUrl: 'https://picsum.photos/seed/pin1/600/900', createdAt: '2023-10-01', resolution: '1000x1500', prompt: 'Healthy smoothies' },
    { id: 'p2', userId: 'u1', title: 'Work Motivation', imageUrl: 'https://picsum.photos/seed/pin2/600/900', createdAt: '2023-10-02', resolution: '1000x1500', prompt: 'Work motivation quotes' },
    { id: 'p3', userId: 'u1', title: 'Travel Hacks', imageUrl: 'https://picsum.photos/seed/pin3/600/900', createdAt: '2023-10-03', resolution: '1000x1500', prompt: 'Travel hacks and tips' },
    { id: 'p4', userId: 'u1', title: 'Coding Tips', imageUrl: 'https://picsum.photos/seed/pin4/600/900', createdAt: '2023-10-04', resolution: '1000x1500', prompt: 'Coding tips and tricks' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
          <p className="text-gray-500">Transform your ideas into stunning Pinterest designs today.</p>
        </div>
        <Link 
          to="/editor" 
          className="inline-flex items-center justify-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition shadow-lg shadow-red-100"
        >
          <Plus size={20} />
          <span>New Design</span>
        </Link>
      </header>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Pins', value: '142', sub: '+12 this week' },
          { label: 'Monthly Reach', value: '45.2k', sub: 'Estimated impressions' },
          { label: 'Saved Designs', value: '28', sub: 'Across 4 folders' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-xs text-green-600 mt-2 font-medium">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Designs Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Your Design Gallery</h2>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search pins..." 
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-red-500 outline-none" 
              />
            </div>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-white transition text-gray-600"><Filter size={18} /></button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {mockPins.map((pin) => (
            <div key={pin.id} className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="aspect-[2/3] overflow-hidden">
                <img src={pin.imageUrl} alt={pin.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                  <button className="p-2 bg-white rounded-full text-gray-900 hover:bg-red-600 hover:text-white transition shadow-lg"><ExternalLink size={18} /></button>
                  <button className="p-2 bg-white rounded-full text-gray-900 hover:bg-red-600 hover:text-white transition shadow-lg"><MoreHorizontal size={18} /></button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-gray-900 truncate">{pin.title}</h3>
                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-semibold">Created {pin.createdAt}</p>
              </div>
            </div>
          ))}
          <Link to="/editor" className="aspect-[2/3] flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl hover:border-red-400 hover:bg-red-50 transition group">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3 group-hover:bg-red-100 transition">
              <Plus className="text-gray-400 group-hover:text-red-600" size={24} />
            </div>
            <span className="text-sm font-bold text-gray-500 group-hover:text-red-600">Create New</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

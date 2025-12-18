
import React, { useState } from 'react';
import { 
  Users, 
  CreditCard, 
  Globe, 
  Search, 
  Settings, 
  ShieldCheck, 
  Eye,
  Activity,
  Save,
  Trash2,
  Lock,
  Unlock
} from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'settings' | 'logs'>('users');
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-gray-900">SaaS Control</h1>
          <p className="text-gray-500 mt-1">Manage users, subscriptions, and platform settings.</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'users' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Users
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'settings' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Site Settings
          </button>
          <button 
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'logs' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Audit Logs
          </button>
        </div>
      </div>

      {activeTab === 'users' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                <h3 className="font-bold flex items-center gap-2"><Users size={20} className="text-red-600" /> Active Members</h3>
                <div className="relative w-64">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Search by email..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none" />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50/50 text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                    <tr>
                      <th className="px-6 py-4">Identity</th>
                      <th className="px-6 py-4">Plan</th>
                      <th className="px-6 py-4">Pins Today</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Control</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { name: 'Sarah Miller', email: 'sarah@design.co', plan: 'PRO', used: 12, status: 'Active' },
                      { name: 'Mike Ross', email: 'mike@startup.io', plan: 'FREE', used: 4, status: 'Active' },
                      { name: 'Illegal User', email: 'bot@spam.com', plan: 'FREE', used: 0, status: 'Banned' },
                    ].map((user, i) => (
                      <tr key={i} className="hover:bg-gray-50/50 transition">
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-lg text-[10px] font-black ${user.plan === 'PRO' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>{user.plan}</span>
                        </td>
                        <td className="px-6 py-4 font-mono text-sm">{user.used}/50</td>
                        <td className="px-6 py-4">
                          <span className={`w-2 h-2 rounded-full inline-block mr-2 ${user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`} />
                          <span className="text-xs font-medium text-gray-600">{user.status}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {user.status === 'Active' ? 
                            <button className="p-2 text-gray-400 hover:text-red-600 transition"><Lock size={18} /></button> :
                            <button className="p-2 text-gray-400 hover:text-green-600 transition"><Unlock size={18} /></button>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-xl space-y-4">
              <h3 className="font-bold text-xl flex items-center gap-2"><CreditCard /> Revenue Stats</h3>
              <div>
                <p className="text-gray-400 text-sm">Monthly Recurring Revenue</p>
                <h2 className="text-4xl font-black mt-1">$4,290.00</h2>
              </div>
              <div className="pt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Pro Subscriptions</span>
                  <span className="font-bold">142 Users</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full">
                  <div className="bg-red-500 h-1.5 rounded-full w-2/3" />
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="font-bold flex items-center gap-2"><Activity size={18} className="text-indigo-600" /> Server Health</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <p className="text-[10px] uppercase font-black text-gray-400">AI Latency</p>
                  <p className="text-lg font-bold">1.2s</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <p className="text-[10px] uppercase font-black text-gray-400">API Uptime</p>
                  <p className="text-lg font-bold text-green-600">99.9%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="max-w-4xl space-y-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <section className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900"><Globe size={20} className="text-red-600" /> SEO & Discovery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600">Meta Title Prefix</label>
                <input type="text" defaultValue="PinPro | AI Pinterest Generator" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600">Primary Keyword</label>
                <input type="text" defaultValue="pinterest ai generator" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-gray-600">Meta Description</label>
                <textarea rows={3} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none resize-none">The world's first AI-powered Pinterest pin designer. Create viral graphics in seconds.</textarea>
              </div>
            </div>
          </section>
          
          <div className="h-px bg-gray-100" />

          <section className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900"><Settings size={20} className="text-gray-400" /> Feature Toggles</h3>
            <div className="space-y-4">
              {[
                { label: 'Allow Free Generations', desc: 'New users get 5 free credits on signup', enabled: true },
                { label: 'Multi-Language Support', desc: 'Enable ES, FR, AR language selectors', enabled: true },
                { label: 'Maintenance Mode', desc: 'Block access for system updates', enabled: false },
              ].map((toggle, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div>
                    <p className="font-bold text-gray-900">{toggle.label}</p>
                    <p className="text-xs text-gray-500">{toggle.desc}</p>
                  </div>
                  <div className={`w-12 h-6 rounded-full relative cursor-pointer transition ${toggle.enabled ? 'bg-green-500' : 'bg-gray-300'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${toggle.enabled ? 'left-7' : 'left-1'}`} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="flex justify-end pt-4">
            <button className="flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 shadow-lg shadow-red-100 transition">
              <Save size={20} />
              Save Configuration
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

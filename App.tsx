
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Sparkles, 
  Settings, 
  ShieldCheck, 
  LogOut, 
  Menu, 
  X, 
  Crown,
  Globe,
  PlusCircle,
  Image as ImageIcon,
  Check,
  ChevronRight,
  Zap,
  Star,
  Layers,
  Download,
  MessageSquare,
  HelpCircle,
  CreditCard,
  // Fix: Imported missing icons from lucide-react
  Type,
  Users
} from 'lucide-react';
import { User, UserRole, Language } from './types';
import Editor from './components/Editor/PinCanvas';
import Dashboard from './components/Dashboard/UserOverview';
import Admin from './components/Admin/AdminDashboard';
import PromptHelper from './components/Editor/PromptHelper';
import PricingCheckout from './components/Dashboard/PricingCheckout';
import { translations } from './translations';

// --- COMPONENTS ---

const Header = ({ user, lang }: { user: User | null, lang: Language }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang] || translations.en;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-100">
            <PlusCircle className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">PinPro</h1>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/#features" className="text-sm font-bold text-gray-500 hover:text-red-600 transition-colors">Features</Link>
          <Link to="/pricing" className="text-sm font-bold text-gray-500 hover:text-red-600 transition-colors">Pricing</Link>
          <Link to="/#how-to" className="text-sm font-bold text-gray-500 hover:text-red-600 transition-colors">How to Use</Link>
          
          {user ? (
            <Link to="/app" className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:shadow-xl hover:scale-105 transition-all">
              Go to App
            </Link>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-sm font-bold text-gray-900">Login</Link>
              <Link to="/register" className="bg-red-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-red-700 transition shadow-lg shadow-red-100 hover:scale-105">
                Join Free
              </Link>
            </div>
          )}
        </div>

        <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 p-6 space-y-4 animate-in slide-in-from-top duration-300 shadow-xl">
          <Link to="/pricing" className="block font-bold text-gray-900" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
          <Link to="/login" className="block font-bold text-gray-900" onClick={() => setMobileMenuOpen(false)}>Login</Link>
          <Link to="/register" className="block w-full text-center bg-red-600 text-white py-4 rounded-2xl font-black" onClick={() => setMobileMenuOpen(false)}>Join Free</Link>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-white pt-24 pb-12">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 border-b border-white/10 pb-20">
        <div className="space-y-6 col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-900">
              <PlusCircle className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-black">PinPro AI</h2>
          </Link>
          <p className="text-gray-400 max-w-sm text-lg leading-relaxed">
            The ultimate AI-powered design suite for visual creators. Join 10,000+ marketers and scale your Pinterest presence.
          </p>
          <div className="flex gap-4">
            {['Twitter', 'Pinterest', 'Instagram'].map(s => (
              <a key={s} href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-red-600 transition-colors">
                <Globe size={18} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-black text-xs uppercase tracking-[0.3em] text-red-500 mb-8">Platform</h4>
          <ul className="space-y-4 text-gray-400 font-bold">
            <li><Link to="/app/editor" className="hover:text-white transition">Pin Generator</Link></li>
            <li><Link to="/app/prompt-helper" className="hover:text-white transition">AI Assistant</Link></li>
            <li><Link to="/pricing" className="hover:text-white transition">Pricing</Link></li>
            <li><a href="#" className="hover:text-white transition">Styles Library</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-black text-xs uppercase tracking-[0.3em] text-red-500 mb-8">Legal</h4>
          <ul className="space-y-4 text-gray-400 font-bold">
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition">Terms of Use</a></li>
            <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
            <li><a href="#" className="hover:text-white transition">Help Center</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">© 2025 PINPRO AI LABS • BUILT WITH PASSION</p>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">System Online</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

const LandingPage = ({ lang }: { lang: Language }) => {
  const t = translations[lang] || translations.en;
  
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-40 overflow-hidden px-6">
        {/* Animated Orbs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-100/40 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 -z-10 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-100/30 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2 -z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 text-center lg:text-left">
            <div className="inline-flex items-center space-x-3 px-5 py-2 bg-white rounded-full border border-gray-100 shadow-sm animate-bounce">
              <Zap size={16} className="text-red-600 fill-red-600" />
              <span className="text-[11px] font-black text-gray-900 uppercase tracking-widest">New: Pro AI Engine 3.0</span>
            </div>
            <h1 className="text-7xl lg:text-9xl font-black text-gray-900 leading-[0.88] tracking-tighter">
              {t.heroTitle.split(' ').slice(0, 3).join(' ')} <br/>
              <span className="text-red-600">{t.heroTitle.split(' ').slice(3).join(' ')}</span>
            </h1>
            <p className="text-2xl text-gray-500 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              {t.heroSub}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-4">
              <Link to="/register" className="w-full sm:w-auto px-12 py-6 bg-red-600 text-white rounded-[2.5rem] font-black text-xl hover:bg-red-700 transition shadow-[0_20px_40px_-10px_rgba(220,38,38,0.3)] flex items-center justify-center gap-3 group hover:scale-105 active:scale-95">
                {t.getStarted}
                <ChevronRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link to="/pricing" className="w-full sm:w-auto px-12 py-6 bg-white border-2 border-gray-100 text-gray-900 rounded-[2.5rem] font-black text-xl hover:bg-gray-50 transition hover:scale-105 active:scale-95">
                {t.viewPricing}
              </Link>
            </div>
            <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 opacity-40 grayscale">
               <img src="https://www.svgrepo.com/show/508699/landscape.svg" className="h-6" alt="Icon" />
               <img src="https://www.svgrepo.com/show/508684/cloud.svg" className="h-6" alt="Icon" />
               <img src="https://www.svgrepo.com/show/508693/gear.svg" className="h-6" alt="Icon" />
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-10 bg-gradient-to-r from-red-600/10 to-indigo-600/10 rounded-[4rem] blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000" />
            <div className="relative bg-white p-6 rounded-[4rem] shadow-[0_80px_160px_-40px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden transform lg:rotate-6 hover:rotate-0 transition-all duration-700">
              <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200" alt="App Preview" className="rounded-[3rem] w-full" />
              <div className="absolute top-12 left-12 right-12 bottom-12 border-2 border-white/20 rounded-[2.5rem] pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-12 text-white">
                <div className="flex items-center gap-2 mb-4">
                   <div className="bg-red-600 p-2 rounded-lg"><Sparkles size={16} /></div>
                   <span className="text-xs font-black uppercase tracking-widest">AI Masterpiece</span>
                </div>
                <h3 className="text-4xl font-black leading-tight">YOUR BRAND, <br/>ONLY BETTER.</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center space-y-4 mb-24">
               <h2 className="text-xs font-black uppercase tracking-[0.4em] text-red-600">Why PinPro?</h2>
               <h3 className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tighter">Everything you need to grow.</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[
                 { title: 'AI Pin Engine', desc: 'Generate unique, non-stock backgrounds that stop the scroll instantly.', icon: <Zap /> },
                 { title: 'Prompt Helper', desc: 'Our built-in AI assistant writes the perfect artistic prompts for you.', icon: <MessageSquare /> },
                 { title: 'Pro Typography', desc: 'Optimized headline layouts that convert impressions to clicks.', icon: <Type /> },
                 { title: '2K/4K Exports', desc: 'High-definition images ready for any platform, perfectly sized.', icon: <Download /> },
                 { title: 'Style Presets', desc: 'One-click presets for Cinematic, Minimalist, 3D Render, and more.', icon: <Layers /> },
                 { title: 'Team Workspaces', desc: 'Collaborate with your agency or team members in real-time.', icon: <Users /> },
               ].map((f, i) => (
                 <div key={i} className="p-12 bg-gray-50 rounded-[3rem] border border-gray-100 hover:bg-white hover:shadow-2xl hover:shadow-gray-100 transition-all duration-500 group">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-red-600 mb-8 shadow-sm group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all">
                      {f.icon}
                    </div>
                    <h4 className="text-2xl font-black mb-4">{f.title}</h4>
                    <p className="text-gray-500 font-medium leading-relaxed">{f.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};

// --- AUTH SCREEN ---

const AuthScreen = ({ onLogin, mode }: { onLogin: () => void, mode: 'login' | 'register' }) => (
  <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB] p-6 pt-32 pb-32">
    <div className="max-w-md w-full bg-white p-12 rounded-[4rem] shadow-[0_64px_128px_-32px_rgba(0,0,0,0.08)] border border-gray-100 space-y-10">
      <div className="text-center space-y-3">
        <Link to="/" className="inline-flex items-center space-x-2 mb-4">
          <div className="w-10 h-10 bg-red-600 rounded-2xl flex items-center justify-center">
            <PlusCircle className="text-white" size={24} />
          </div>
          <span className="text-2xl font-black">PinPro</span>
        </Link>
        <h2 className="text-4xl font-black text-gray-900 leading-tight">
          {mode === 'login' ? 'Welcome Back.' : 'Join the Elite.'}
        </h2>
        <p className="text-gray-500 font-bold">Start creating viral content today.</p>
      </div>
      
      <div className="space-y-6">
        <button onClick={onLogin} className="w-full py-5 px-6 flex items-center justify-center space-x-4 bg-white border-2 border-gray-100 rounded-2xl font-bold hover:bg-gray-50 transition-all text-gray-700 active:scale-95">
          <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt="Google" />
          <span>Continue with Google</span>
        </button>
        <div className="relative flex items-center py-2">
          <div className="flex-1 border-t border-gray-100"></div>
          <span className="px-6 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">or connect with email</span>
          <div className="flex-1 border-t border-gray-100"></div>
        </div>
        <div className="space-y-4">
          {mode === 'register' && <input type="text" placeholder="Your Full Name" className="w-full p-5 bg-gray-50 border border-transparent rounded-2xl focus:ring-4 focus:ring-red-50 focus:bg-white outline-none transition-all text-sm font-bold" />}
          <input type="email" placeholder="Email Address" className="w-full p-5 bg-gray-50 border border-transparent rounded-2xl focus:ring-4 focus:ring-red-50 focus:bg-white outline-none transition-all text-sm font-bold" />
          <input type="password" placeholder="Secure Password" className="w-full p-5 bg-gray-50 border border-transparent rounded-2xl focus:ring-4 focus:ring-red-50 focus:bg-white outline-none transition-all text-sm font-bold" />
          <Link to="/app" onClick={onLogin} className="block w-full text-center py-5 px-6 bg-red-600 text-white rounded-[2rem] font-black shadow-2xl shadow-red-100 hover:bg-red-700 transition-all uppercase tracking-widest text-sm active:scale-95">
            {mode === 'login' ? 'Sign In Now' : 'Create My Account'}
          </Link>
        </div>
      </div>
      
      <p className="text-center text-sm font-bold text-gray-400">
        {mode === 'login' ? "New here? " : "Already have an account? "}
        <Link to={mode === 'login' ? '/register' : '/login'} className="text-red-600 hover:underline">
          {mode === 'login' ? 'Sign Up' : 'Log In'}
        </Link>
      </p>
    </div>
  </div>
);

// --- MAIN APP ---

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [lang, setLang] = useState<Language>('en');
  const location = useLocation();

  const isAppRoute = location.pathname.startsWith('/app');

  const handleLogin = () => {
    setUser({
      id: 'u1',
      name: 'Creative Ninja',
      email: 'ninja@pinpro.ai',
      role: UserRole.ADMIN,
      plan: 'FREE',
      dailyPinLimit: 5,
      pinsUsedToday: 0,
      isBanned: false,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ProUser'
    });
  };

  const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
    const isActive = location.pathname === to;
    return (
      <Link 
        to={to} 
        className={`flex items-center space-x-3 p-4 rounded-2xl transition-all duration-300 ${
          isActive 
            ? 'bg-red-600 text-white shadow-xl shadow-red-100 scale-[1.02]' 
            : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'
        }`}
      >
        <Icon size={22} className={isActive ? 'text-white' : 'text-gray-400'} />
        <span className="font-black text-sm uppercase tracking-tight">{label}</span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      {!isAppRoute && <Header user={user} lang={lang} />}
      
      <main>
        <Routes>
          <Route path="/" element={<LandingPage lang={lang} />} />
          <Route path="/pricing" element={<div className="pt-20"><PricingPage /></div>} />
          <Route path="/login" element={<AuthScreen onLogin={handleLogin} mode="login" />} />
          <Route path="/register" element={<AuthScreen onLogin={handleLogin} mode="register" />} />

          {/* Private App Routes */}
          <Route path="/app/*" element={user ? (
            <div className="flex">
              {/* Sidebar */}
              <aside className="fixed left-0 top-0 bottom-0 w-80 bg-white border-r border-gray-100 hidden lg:flex flex-col p-10 z-50">
                <Link to="/" className="flex items-center space-x-3 mb-16">
                  <div className="w-10 h-10 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-100">
                    <PlusCircle className="text-white" size={24} />
                  </div>
                  <h1 className="text-2xl font-black text-gray-900">PinPro</h1>
                </Link>
                
                <nav className="flex-1 space-y-3">
                  <div className="pb-4">
                     <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mb-4 ml-4">Main Menu</p>
                     <NavItem to="/app" icon={LayoutDashboard} label="Dashboard" />
                     <NavItem to="/app/editor" icon={Sparkles} label="Generator" />
                     <NavItem to="/app/prompt-helper" icon={MessageSquare} label="AI Assistant" />
                     <NavItem to="/app/gallery" icon={ImageIcon} label="My Library" />
                  </div>
                  
                  <div className="pt-8 border-t border-gray-100">
                     <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mb-4 ml-4">Account</p>
                     <NavItem to="/app/settings" icon={Settings} label="Settings" />
                     <NavItem to="/app/billing" icon={CreditCard} label="Billing" />
                     {user.role === UserRole.ADMIN && <NavItem to="/app/admin" icon={ShieldCheck} label="Admin Panel" />}
                  </div>
                </nav>

                <div className="pt-10 border-t border-gray-100 space-y-6">
                  <div className="bg-red-50 p-6 rounded-3xl border border-red-100 relative overflow-hidden group">
                     <Crown size={40} className="absolute -right-4 -bottom-4 text-red-600/10 group-hover:scale-150 transition-transform duration-700" />
                     <p className="text-xs font-black text-red-600 uppercase tracking-widest mb-1">Current Plan</p>
                     <p className="text-xl font-black text-red-900">{user.plan}</p>
                     <Link to="/app/billing" className="mt-4 block text-center py-3 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-100 hover:bg-red-700 transition">Upgrade</Link>
                  </div>
                  <button onClick={() => setUser(null)} className="flex items-center space-x-3 text-gray-400 hover:text-red-600 font-bold transition w-full p-4 hover:bg-red-50 rounded-2xl">
                    <LogOut size={20} />
                    <span className="uppercase text-xs tracking-widest">Logout</span>
                  </button>
                </div>
              </aside>

              {/* Main Area */}
              <div className="flex-1 lg:ml-80 min-h-screen">
                <header className="h-24 px-10 border-b border-gray-100 bg-white/50 backdrop-blur-xl flex items-center justify-between lg:justify-end sticky top-0 z-40">
                  <div className="lg:hidden">
                    <Link to="/" className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-red-600 rounded-xl flex items-center justify-center">
                        <PlusCircle className="text-white" size={18} />
                      </div>
                      <span className="text-xl font-black">PinPro</span>
                    </Link>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="hidden sm:flex flex-col text-right">
                       <p className="text-sm font-black text-gray-900 leading-none">{user.name}</p>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{user.email}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-gray-200 border-2 border-white shadow-sm overflow-hidden">
                       <img src={user.avatar} alt="Avatar" />
                    </div>
                  </div>
                </header>

                <div className="p-8 lg:p-12">
                  <Routes>
                    <Route index element={<Dashboard user={user} lang={lang} />} />
                    <Route path="editor" element={<Editor user={user} />} />
                    <Route path="prompt-helper" element={<PromptHelper />} />
                    <Route path="billing" element={<PricingCheckout />} />
                    <Route path="admin" element={user.role === UserRole.ADMIN ? <Admin /> : <Navigate to="/app" />} />
                    <Route path="*" element={<Navigate to="/app" />} />
                  </Routes>
                </div>
              </div>
            </div>
          ) : <Navigate to="/login" />} />
        </Routes>
      </main>

      {!isAppRoute && <Footer />}
    </div>
  );
};

const PricingPage = () => {
  return (
    <div className="pb-32 px-6">
      <div className="max-w-5xl mx-auto text-center space-y-8 mb-24">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
           Flexible Pricing
        </div>
        <h1 className="text-6xl lg:text-8xl font-black text-gray-900 tracking-tighter">Simple Pricing. <br/>Unlimited Potential.</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">No hidden fees. Scale your traffic with professional design assets that actually convert.</p>
      </div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            name: 'Free', 
            price: '$0', 
            features: ['5 Daily Generations', '1K Standard Resolution', 'Basic Styles', 'Community Support'],
            cta: 'Join Now',
            pro: false 
          },
          { 
            name: 'Pro Designer', 
            price: '$19', 
            features: ['Unlimited 2K Generations', 'High-Def Rendering', 'All AI Presets', 'AI Prompt Assistant', 'No Watermarks', 'Priority Support'],
            cta: 'Get Started',
            pro: true 
          },
          { 
            name: 'Agency', 
            price: '$49', 
            features: ['Bulk Generation', 'API Access', 'White Label Options', 'Dedicated Support', 'Team Accounts (5)', 'Custom Styles'],
            cta: 'Contact Sales',
            pro: false 
          }
        ].map((plan, i) => (
          <div key={i} className={`relative p-12 rounded-[4rem] border transition-all duration-500 group hover:scale-105 ${plan.pro ? 'bg-gray-900 text-white border-gray-900 shadow-[0_64px_128px_-32px_rgba(79,70,229,0.3)]' : 'bg-white border-gray-100 shadow-xl shadow-gray-100/50 hover:border-red-200'}`}>
            {plan.pro && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl shadow-red-900">Most Popular Choice</div>
            )}
            <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">{plan.name}</h3>
            <div className="flex items-baseline gap-2 mb-10">
              <span className="text-6xl font-black">{plan.price}</span>
              <span className={plan.pro ? 'text-gray-400' : 'text-gray-500'}>/month</span>
            </div>
            <ul className="space-y-5 mb-12">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center gap-4 text-sm font-bold">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${plan.pro ? 'bg-red-600 text-white' : 'bg-red-50 text-red-600'}`}>
                    <Check size={14} />
                  </div>
                  <span className={plan.pro ? 'text-gray-300' : 'text-gray-600'}>{f}</span>
                </li>
              ))}
            </ul>
            <Link to={plan.pro ? "/app/billing" : "/register"} className={`block w-full py-5 rounded-[2rem] text-center font-black uppercase tracking-widest text-sm transition-all duration-300 ${plan.pro ? 'bg-red-600 text-white hover:bg-red-700 shadow-xl shadow-red-900' : 'bg-gray-100 text-gray-900 hover:bg-gray-900 hover:text-white'}`}>
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
      
      <div className="max-w-3xl mx-auto mt-32 text-center space-y-12">
         <h4 className="text-4xl font-black text-gray-900">Frequently Asked Questions</h4>
         <div className="space-y-6 text-left">
            {[
              { q: 'Can I cancel anytime?', a: 'Yes! We don’t believe in contracts. You can cancel your subscription from your billing dashboard at any time.' },
              { q: 'Do I own the designs?', a: 'Absolutely. Any pin you generate is yours for commercial or personal use. You own 100% of the rights.' },
              { q: 'What is the Pro AI Engine?', a: 'Our Pro Engine uses Gemini 3 Pro to render photorealistic backgrounds with cinematic depth and lighting.' },
            ].map((item, k) => (
              <div key={k} className="p-8 bg-white rounded-3xl border border-gray-100">
                <p className="text-lg font-black mb-2">{item.q}</p>
                <p className="text-gray-500 font-medium">{item.a}</p>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import { 
  Shield, 
  Calendar, 
  LogOut, 
  Menu, 
  X, 
  Sparkles, 
  HeartHandshake, 
  UserCheck, 
  GraduationCap, 
  Users, 
  Compass, 
  Phone
} from 'lucide-react';
import { NavigationTab, UserProfile, UserRole } from '../types';

interface NavbarProps {
  currentUser: UserProfile | null;
  activeTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  onOpenAuth: () => void;
  onChangeRole: (role: UserRole) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activeTab,
  onNavigate,
  onOpenAuth,
  onChangeRole,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: NavigationTab; label: string; icon: any }[] = [
    { id: 'home', label: 'Accueil & Mission', icon: Compass },
    { id: 'disciplines', label: 'Disciplines', icon: HeartHandshake },
    { id: 'schedule', label: 'Planning des Cours', icon: Calendar },
    { id: 'preregistration', label: 'Pré-inscription', icon: Sparkles },
    { id: 'contact', label: 'Contact & Dojo', icon: Phone },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D9] shadow-xs">
      {/* Top Nature & Inclusion Announcement Bar */}
      <div className="bg-[#1E293B] text-[#FAF8F5] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
            <span className="font-bold text-amber-200 text-xs sm:text-sm tracking-wide">
              L'AUBERGE DANSANTE
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300 text-[11px] sm:text-xs">Arts martiaux inclusifs & développement personnel pour enfants en difficulté</span>
          </div>

          {/* Quick Role Tester Toolbar */}
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-slate-400 hidden sm:inline">Tester un profil :</span>
            <div className="inline-flex items-center rounded-lg bg-slate-800/80 p-0.5 border border-slate-700">
              <button
                id="quick-role-admin"
                onClick={() => {
                  onChangeRole('admin');
                  onNavigate('admin-portal');
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                  currentUser?.role === 'admin' 
                    ? 'bg-[#1E3A5F] text-amber-300 shadow-xs' 
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Connecter en tant qu'Administrateur"
              >
                Admin
              </button>
              <button
                id="quick-role-prof"
                onClick={() => {
                  onChangeRole('professeur');
                  onNavigate('teacher-portal');
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                  currentUser?.role === 'professeur' 
                    ? 'bg-[#2D5A43] text-emerald-200 shadow-xs' 
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Connecter en tant que Professeur / Sensei"
              >
                Professeur
              </button>
              <button
                id="quick-role-family"
                onClick={() => {
                  onChangeRole('famille');
                  onNavigate('famille-portal');
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                  currentUser?.role === 'famille' 
                    ? 'bg-[#8C6D58] text-amber-200 shadow-xs' 
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Connecter en tant que Famille / Parent"
              >
                Famille
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-22">
          
          {/* Logo & Brand Identity with ENLARGED Association Name */}
          <button 
            id="nav-logo"
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-3.5 sm:gap-4 text-left group transition-transform focus:outline-hidden py-1 cursor-pointer"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#2D5A43] via-[#1E3A5F] to-[#8C6D58] p-0.5 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <div className="w-full h-full bg-[#FAF8F5] rounded-[14px] flex items-center justify-center">
                <span className="text-2xl sm:text-3xl">🥋</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-heading text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#1E293B] leading-none">
                  L'Auberge Dansante
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] shrink-0"></span>
              </div>
              <p className="text-xs sm:text-sm text-[#475569] font-medium tracking-wide mt-1">
                Arts Martiaux Inclusifs & Développement Personnel
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  id={`nav-link-${link.id}`}
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2D5A43]/15 text-[#2D5A43] border border-[#2D5A43]/30 shadow-xs'
                      : 'text-[#475569] hover:text-[#1E293B] hover:bg-[#F4EFEA]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#2D5A43]' : 'text-[#64748B]'}`} />
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* User Account / Space Actions */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2">
                {/* Specific Dashboard Link based on role */}
                <button
                  id="nav-dashboard-button"
                  onClick={() => {
                    if (currentUser.role === 'admin') onNavigate('admin-portal');
                    else if (currentUser.role === 'professeur') onNavigate('teacher-portal');
                    else onNavigate('famille-portal');
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all shadow-xs cursor-pointer ${
                    currentUser.role === 'admin' 
                      ? 'bg-[#1E3A5F] text-white hover:bg-[#162A45] border-blue-900/30'
                      : currentUser.role === 'professeur'
                      ? 'bg-[#2D5A43] text-white hover:bg-[#244D38] border-emerald-900/30'
                      : 'bg-[#8C6D58] text-white hover:bg-[#785c49] border-amber-900/30'
                  }`}
                >
                  {currentUser.role === 'admin' && <Shield className="w-4 h-4 text-amber-300" />}
                  {currentUser.role === 'professeur' && <GraduationCap className="w-4 h-4 text-emerald-200" />}
                  {currentUser.role === 'famille' && <Users className="w-4 h-4 text-amber-200" />}
                  
                  <span>
                    {currentUser.role === 'admin' ? 'Espace Admin' : currentUser.role === 'professeur' ? 'Espace Professeur' : 'Mon Espace Famille'}
                  </span>
                </button>

                {/* User Info & Logout */}
                <div className="flex items-center gap-2 pl-2 border-l border-[#E2D9CE]">
                  <img
                    src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'}
                    alt={`${currentUser.prenom} ${currentUser.nom}`}
                    className="w-9 h-9 rounded-full object-cover border-2 border-[#D4AF37]/50"
                  />
                  <button
                    id="nav-logout-btn"
                    onClick={onLogout}
                    title="Se déconnecter"
                    className="p-2 rounded-lg text-[#64748B] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="nav-login-btn"
                  onClick={onOpenAuth}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#2D5A43] bg-[#2D5A43]/10 hover:bg-[#2D5A43]/20 border border-[#2D5A43]/30 transition-all cursor-pointer"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Espace Membres</span>
                </button>
                <button
                  id="nav-join-btn"
                  onClick={() => onNavigate('preregistration')}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#2D5A43] hover:bg-[#234936] shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Pré-inscription</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 xl:hidden">
            {currentUser && (
              <button
                onClick={() => {
                  if (currentUser.role === 'admin') onNavigate('admin-portal');
                  else if (currentUser.role === 'professeur') onNavigate('teacher-portal');
                  else onNavigate('famille-portal');
                }}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-[#2D5A43] text-white"
              >
                Espace
              </button>
            )}
            <button
              id="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#F4EFEA] text-[#1E293B] hover:bg-[#EAE3DA] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FAF8F5] border-b border-[#E2D9CE] px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer ${
                    isActive
                      ? 'bg-[#2D5A43] text-white'
                      : 'text-[#334155] hover:bg-[#F4EFEA]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#E2D9CE] space-y-2">
            {currentUser ? (
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-[#F4EFEA] flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#1E293B]">{currentUser.prenom} {currentUser.nom}</p>
                    <p className="text-xs text-[#64748B] capitalize">Rôle : {currentUser.role}</p>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="p-2 rounded-lg bg-rose-100 text-rose-700 text-xs font-semibold cursor-pointer"
                  >
                    Déconnexion
                  </button>
                </div>
                <button
                  onClick={() => {
                    if (currentUser.role === 'admin') onNavigate('admin-portal');
                    else if (currentUser.role === 'professeur') onNavigate('teacher-portal');
                    else onNavigate('famille-portal');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#1E3A5F] text-white font-semibold text-sm cursor-pointer"
                >
                  Accéder à mon espace ({currentUser.role})
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onOpenAuth();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#2D5A43]/10 text-[#2D5A43] font-semibold text-sm border border-[#2D5A43]/30 cursor-pointer"
                >
                  Connexion
                </button>
                <button
                  onClick={() => {
                    onNavigate('preregistration');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#2D5A43] text-white font-semibold text-sm cursor-pointer"
                >
                  Pré-inscription
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

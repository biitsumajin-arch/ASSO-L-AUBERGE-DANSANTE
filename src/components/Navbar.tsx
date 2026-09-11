import React, { useState } from 'react';
import { 
  Shield, 
  Calendar, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Sparkles, 
  HeartHandshake, 
  BookOpen, 
  UserCheck, 
  GraduationCap, 
  Users, 
  Compass, 
  Database,
  Phone
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';

interface NavbarProps {
  currentUser: UserProfile | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onSwitchRole: (role: UserRole) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activeTab,
  setActiveTab,
  onLoginClick,
  onLogoutClick,
  onSwitchRole
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return { label: 'Direction / Admin', bg: 'bg-[#1E3A5F]', text: 'text-blue-100', border: 'border-blue-700/40' };
      case 'professeur':
        return { label: 'Enseignant / Sensei', bg: 'bg-[#2D5A43]', text: 'text-emerald-100', border: 'border-emerald-700/40' };
      case 'famille':
        return { label: 'Espace Famille', bg: 'bg-[#8C6D58]', text: 'text-amber-100', border: 'border-amber-700/40' };
    }
  };

  const navLinks = [
    { id: 'accueil', label: 'Accueil', icon: Compass },
    { id: 'mission', label: 'Notre Mission', icon: HeartHandshake },
    { id: 'agenda', label: 'Agenda des Cours', icon: Calendar },
    { id: 'inscription', label: 'Pré-inscription', icon: Sparkles },
    { id: 'contact', label: 'Contact & Dojo', icon: Phone },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D9] shadow-xs">
      {/* Top Nature & Inclusion Announcement Bar */}
      <div className="bg-[#1E293B] text-[#FAF8F5] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
            <span className="font-medium text-amber-200/90">L'Auberge Dansante</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">Arts martiaux inclusifs & développement personnel pour enfants en difficulté</span>
          </div>

          {/* Quick Role Tester Toolbar */}
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-slate-400 hidden sm:inline">Tester un rôle :</span>
            <div className="inline-flex items-center rounded-lg bg-slate-800/80 p-0.5 border border-slate-700">
              <button
                id="quick-role-admin"
                onClick={() => onSwitchRole('admin')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
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
                onClick={() => onSwitchRole('professeur')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
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
                onClick={() => onSwitchRole('famille')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
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
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <button 
            id="nav-logo"
            onClick={() => setActiveTab('accueil')} 
            className="flex items-center gap-3.5 text-left group transition-transform focus:outline-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2D5A43] via-[#1E3A5F] to-[#8C6D58] p-0.5 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#FAF8F5] rounded-[14px] flex items-center justify-center">
                <span className="text-xl">🥋</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif-heading text-2xl font-bold tracking-tight text-[#1E293B]">
                  L'Auberge Dansante
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
              </div>
              <p className="text-xs text-[#64748B] font-medium tracking-wide">
                Arts Martiaux & Épanouissement
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  id={`nav-link-${link.id}`}
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#2D5A43]/10 text-[#2D5A43] font-semibold border border-[#2D5A43]/20 shadow-xs'
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
                    if (currentUser.role === 'admin') setActiveTab('dashboard-admin');
                    else if (currentUser.role === 'professeur') setActiveTab('dashboard-prof');
                    else setActiveTab('dashboard-famille');
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold border transition-all shadow-xs ${
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
                  <div className="text-left leading-tight hidden xl:block">
                    <p className="text-xs font-bold text-[#1E293B]">{currentUser.prenom} {currentUser.nom}</p>
                    <p className="text-[10px] text-[#64748B] capitalize">{currentUser.role}</p>
                  </div>
                  <button
                    id="nav-logout-btn"
                    onClick={onLogoutClick}
                    title="Se déconnecter"
                    className="p-2 rounded-lg text-[#64748B] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="nav-login-btn"
                  onClick={onLoginClick}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#2D5A43] bg-[#2D5A43]/10 hover:bg-[#2D5A43]/20 border border-[#2D5A43]/30 transition-all"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Espace Membres</span>
                </button>
                <button
                  id="nav-join-btn"
                  onClick={() => setActiveTab('inscription')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#2D5A43] hover:bg-[#234936] shadow-sm hover:shadow-md transition-all border border-[#1E3A5F]/20"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Pré-inscription</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 md:hidden">
            {currentUser && (
              <button
                onClick={() => {
                  if (currentUser.role === 'admin') setActiveTab('dashboard-admin');
                  else if (currentUser.role === 'professeur') setActiveTab('dashboard-prof');
                  else setActiveTab('dashboard-famille');
                }}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-[#2D5A43] text-white"
              >
                Espace
              </button>
            )}
            <button
              id="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#F4EFEA] text-[#1E293B] hover:bg-[#EAE3DA]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#E2D9CE] px-4 pt-2 pb-6 space-y-3">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium ${
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
                      onLogoutClick();
                      setMobileMenuOpen(false);
                    }}
                    className="p-2 rounded-lg bg-rose-100 text-rose-700 text-xs font-semibold"
                  >
                    Déconnexion
                  </button>
                </div>
                <button
                  onClick={() => {
                    if (currentUser.role === 'admin') setActiveTab('dashboard-admin');
                    else if (currentUser.role === 'professeur') setActiveTab('dashboard-prof');
                    else setActiveTab('dashboard-famille');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#1E3A5F] text-white font-semibold text-sm"
                >
                  Accéder à mon espace ({currentUser.role})
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onLoginClick();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#2D5A43]/10 text-[#2D5A43] font-semibold text-sm border border-[#2D5A43]/30"
                >
                  Connexion
                </button>
                <button
                  onClick={() => {
                    setActiveTab('inscription');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#2D5A43] text-white font-semibold text-sm"
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

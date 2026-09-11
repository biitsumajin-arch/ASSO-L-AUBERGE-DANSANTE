import React, { useState } from 'react';
import { UserRole } from '../types';
import { Shield, GraduationCap, Users, Lock, Mail, Check, Copy, Database, Sparkles, X, KeyRound } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginAs: (role: UserRole) => void;
  onLoginCustom: (email: string, role: UserRole, nom: string, prenom: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginAs,
  onLoginCustom
}) => {
  const [activeTab, setActiveTab] = useState<'demo' | 'login' | 'supabase'>('demo');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('famille');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onLoginCustom(email, role, nom || 'Adhérent', prenom || 'Membre');
    onClose();
  };

  const handleCopySql = () => {
    const sqlText = `-- Schema Supabase / Postgres L'Auberge Dansante
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'famille',
  created_at TIMESTAMPTZ DEFAULT NOW()
);`;
    navigator.clipboard.writeText(sqlText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-[#E2D9CE] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#1E293B] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-heading text-xl font-bold">Espace Sécurisé & Membres</h3>
              <p className="text-xs text-slate-300">Supabase Auth • Rôles Admin, Professeur & Famille</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mt-5 border-b border-slate-700 pb-1 text-xs">
            <button
              onClick={() => setActiveTab('demo')}
              className={`pb-2 px-3 font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'demo' ? 'text-amber-300 border-b-2 border-amber-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Accès Démo 1-Clic</span>
            </button>
            <button
              onClick={() => setActiveTab('login')}
              className={`pb-2 px-3 font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'login' ? 'text-amber-300 border-b-2 border-amber-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Identifiants / Inscription</span>
            </button>
            <button
              onClick={() => setActiveTab('supabase')}
              className={`pb-2 px-3 font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'supabase' ? 'text-amber-300 border-b-2 border-amber-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Architecture Supabase</span>
            </button>
          </div>
        </div>

        {/* Tab 1: 1-Click Demo Presets */}
        {activeTab === 'demo' && (
          <div className="p-6 space-y-4">
            <p className="text-xs text-[#64748B]">
              Sélectionnez un rôle pour explorer instantanément les fonctionnalités dédiées :
            </p>

            <div className="space-y-3">
              {/* Admin */}
              <button
                id="btn-login-admin-preset"
                onClick={() => {
                  onLoginAs('admin');
                  onClose();
                }}
                className="w-full p-4 rounded-2xl border border-blue-200 bg-blue-50/50 hover:bg-blue-50 hover:border-blue-400 text-left transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-[#1E3A5F] text-white">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-sm text-[#1E293B]">Claire Beauchamp</strong>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1E3A5F] text-white">
                        Direction / Admin
                      </span>
                    </div>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Accès CRM complet, validation des inscriptions, gestion des professeurs et exports CSV
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#1E3A5F] group-hover:translate-x-1 transition-transform">
                  Entrer →
                </span>
              </button>

              {/* Professeur */}
              <button
                id="btn-login-prof-preset"
                onClick={() => {
                  onLoginAs('professeur');
                  onClose();
                }}
                className="w-full p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 hover:border-emerald-400 text-left transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-[#2D5A43] text-white">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-sm text-[#1E293B]">Sensei Marc Viguier</strong>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#2D5A43] text-white">
                        Professeur
                      </span>
                    </div>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Planning enseignant, feuille d’appel & présence, saisie de la progression bienveillante
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#2D5A43] group-hover:translate-x-1 transition-transform">
                  Entrer →
                </span>
              </button>

              {/* Famille */}
              <button
                id="btn-login-family-preset"
                onClick={() => {
                  onLoginAs('famille');
                  onClose();
                }}
                className="w-full p-4 rounded-2xl border border-amber-200 bg-amber-50/50 hover:bg-amber-50 hover:border-amber-400 text-left transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-[#8C6D58] text-white">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-sm text-[#1E293B]">Sophie Martin</strong>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8C6D58] text-white">
                        Famille / Parent de Léo
                      </span>
                    </div>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Passeport martial de l'enfant, valorisations reçues, planning & documents réservés
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#8C6D58] group-hover:translate-x-1 transition-transform">
                  Entrer →
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Custom Credentials Form */}
        {activeTab === 'login' && (
          <form onSubmit={handleCustomSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#475569] mb-1">Prénom</label>
                <input
                  type="text"
                  placeholder="Jean"
                  value={prenom}
                  onChange={e => setPrenom(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3 py-2 text-xs text-[#1E293B]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#475569] mb-1">Nom</label>
                <input
                  type="text"
                  placeholder="Dupont"
                  value={nom}
                  onChange={e => setNom(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3 py-2 text-xs text-[#1E293B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-1">Email <span className="text-rose-500">*</span></label>
              <input
                type="email"
                required
                placeholder="jean.dupont@email.fr"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3 py-2 text-xs text-[#1E293B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-1">Mot de passe</label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3 py-2 text-xs text-[#1E293B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-1">Rôle dans l'application</label>
              <select
                value={role}
                onChange={e => setRole(e.target.value as UserRole)}
                className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3 py-2 text-xs text-[#1E293B]"
              >
                <option value="famille">Famille / Parent d'élève</option>
                <option value="professeur">Professeur / Enseignant</option>
                <option value="admin">Administrateur / Direction</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#2D5A43] hover:bg-[#234936] text-white font-bold text-xs shadow-md transition-all mt-2 cursor-pointer"
            >
              Se connecter / Créer le compte
            </button>
          </form>
        )}

        {/* Tab 3: Supabase Architecture */}
        {activeTab === 'supabase' && (
          <div className="p-6 space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CE] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#1E293B] flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-[#2D5A43]" />
                  Architecture PostgreSQL / Supabase
                </span>
                <button
                  onClick={handleCopySql}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-[#E2D9CE] text-[11px] font-semibold text-[#2D5A43] hover:bg-emerald-50"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copié !' : 'Copier SQL'}</span>
                </button>
              </div>
              <p className="text-[#64748B] leading-relaxed">
                Le modèle comprend 8 tables relationnelles (Profiles, Eleves, Cours, Professeurs, Inscriptions, Progressions, Presences, Pre-inscriptions, Ressources) avec politiques de sécurité Row-Level Security (RLS) prêtes à l'emploi.
              </p>
            </div>

            <div className="bg-slate-900 text-slate-200 rounded-xl p-3 font-mono text-[10px] overflow-x-auto max-h-36">
              <code>
                {`-- Tables créées dans Supabase :
CREATE TABLE profiles (id UUID PRIMARY KEY, role user_role, ...);
CREATE TABLE eleves (id UUID PRIMARY KEY, famille_id UUID, ...);
CREATE TABLE cours (id UUID PRIMARY KEY, professeur_id UUID, ...);
CREATE TABLE presences (id UUID PRIMARY KEY, cours_id UUID, eleve_id UUID, ...);`}
              </code>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

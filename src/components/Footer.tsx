import React from 'react';
import { Heart, Sparkles, Shield, MapPin, Mail, Phone } from 'lucide-react';
import { NavigationTab } from '../types';

interface FooterProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenAuth: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAuth }) => {
  return (
    <footer className="bg-[#1E293B] text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2D5A43] to-[#1E3A5F] flex items-center justify-center text-white text-lg font-serif-heading font-bold shadow-md border border-[#D4AF37]/40">
                AD
              </div>
              <div>
                <span className="font-serif-heading font-bold text-lg text-white block leading-none">
                  L'Auberge Dansante
                </span>
                <span className="text-[10px] text-[#D4AF37] uppercase tracking-wider font-semibold">
                  Arts Martiaux Inclusifs
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Association sportive loi 1901 dédiée à l'épanouissement, à la motricité et à la confiance des enfants en difficulté ou à besoins spécifiques par la pratique martiale bienveillante.
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-300 bg-slate-800/80 p-2 rounded-xl border border-slate-700">
              <Heart className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Petits groupes de 6 à 8 enfants • Pas de compétition</span>
            </div>
          </div>

          {/* Navigation Rapide */}
          <div className="space-y-3">
            <h4 className="font-serif-heading text-sm font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Accueil & Notre Philosophie
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('disciplines'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Nos Disciplines Adaptées
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('schedule'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Agenda & Créneaux des Cours
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('preregistration'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-300 transition-colors font-semibold text-[#D4AF37] cursor-pointer"
                >
                  Pré-inscription sans paiement
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Venir au Dojo
                </button>
              </li>
            </ul>
          </div>

          {/* Espaces Sécurisés */}
          <div className="space-y-3">
            <h4 className="font-serif-heading text-sm font-bold text-white uppercase tracking-wider">
              Espace Membre & Sécurisé
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenAuth}
                  className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5 text-blue-400" />
                  <span>Portail Supabase Auth</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('famille-portal')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Espace Famille (Passeport de l'enfant)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('teacher-portal')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Espace Professeur (Émargement & Progrès)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin-portal')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Direction / Tableau de Bord
                </button>
              </li>
            </ul>
          </div>

          {/* Coordonnées */}
          <div className="space-y-3">
            <h4 className="font-serif-heading text-sm font-bold text-white uppercase tracking-wider">
              Dojo & Permanences
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                <span>14 Allée des Chênes Verts, 75014 Paris</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-300 shrink-0" />
                <span>contact@auberge-dansante.fr</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>01 42 68 90 12</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-800">
                Agrément Sport Santé & Jeunesse Éducation Populaire.
              </p>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} L'Auberge Dansante. Tous droits réservés.</p>
          <p className="flex items-center gap-1 text-[11px]">
            <span>Conçu avec bienveillance pour l'inclusion par les arts martiaux</span>
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          </p>
        </div>
      </div>
    </footer>
  );
};

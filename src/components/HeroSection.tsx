import React from 'react';
import { Sparkles, Calendar, Heart, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { NavigationTab } from '../types';

interface HeroSectionProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:py-20 bg-gradient-to-b from-[#FAF8F5] via-[#F4EFEA] to-[#FAF8F5]">
      {/* Discreet decorative subtle backdrop */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-[#2D5A43]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-[#8C6D58]/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Association Emblem Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#2D5A43]/10 border border-[#2D5A43]/20 text-[#2D5A43] text-xs sm:text-sm font-bold shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
              <span className="tracking-wide uppercase">Association L'Auberge Dansante • Arts Martiaux Inclusifs</span>
            </div>

            {/* Main Headline with Prominent Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif-heading text-[#1E293B] leading-[1.12] tracking-tight">
              L'Auberge Dansante
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-normal text-[#2D5A43] italic mt-2">
                L'art martial comme refuge, le mouvement comme renaissance.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl font-normal">
              <strong>L’Auberge Dansante</strong> est une association sportive qui accueille les enfants et adolescents en difficulté 
              (hypersensibilité, TDAH, troubles du spectre de l'autisme, dyspraxie ou manque d'estime de soi) 
              à travers une pratique douce, bienveillante et adaptée des arts martiaux traditionnels.
            </p>

            {/* Key Pledges Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-[#334155]">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0" />
                <span>Groupes restreints (6 à 8 élèves max)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0" />
                <span>Enseignants diplômés APA & Sport Santé</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0" />
                <span>Zéro esprit de compétition destructeur</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0" />
                <span>Passeport de valorisation individualisé</span>
              </div>
            </div>

            {/* Actions CTA */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                id="hero-cta-register"
                onClick={() => onNavigate('preregistration')}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#2D5A43] hover:bg-[#234936] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all border border-[#1E3A5F]/20 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Pré-inscrire mon enfant</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                id="hero-cta-schedule"
                onClick={() => onNavigate('schedule')}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-[#FAF8F5] text-[#1E293B] font-bold text-sm sm:text-base border border-[#E2D9CE] shadow-xs hover:border-[#2D5A43]/40 transition-all cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-[#8C6D58]" />
                <span>Consulter le planning des cours</span>
              </button>
            </div>

            {/* Social Trust Metrics */}
            <div className="pt-6 border-t border-[#E8E2D9] flex flex-wrap items-center gap-6 text-xs text-[#64748B]">
              <div className="flex items-center gap-2">
                <span className="font-serif-heading font-bold text-lg text-[#1E293B]">100%</span>
                <span>Inclusif & Bienveillant</span>
              </div>
              <div className="w-px h-4 bg-[#D1C7BA]"></div>
              <div className="flex items-center gap-2">
                <span className="font-serif-heading font-bold text-lg text-[#2D5A43]">6</span>
                <span>Disciplines Martiales Complémentaires</span>
              </div>
              <div className="w-px h-4 bg-[#D1C7BA]"></div>
              <div className="flex items-center gap-2">
                <span className="font-serif-heading font-bold text-lg text-[#8C6D58]">Dojo</span>
                <span>Calme & Espace Sensoriel Préservé</span>
              </div>
            </div>

          </div>

          {/* Visual Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Gold border accent wrapper */}
              <div className="rounded-3xl p-1 bg-gradient-to-br from-[#D4AF37]/40 via-[#2D5A43]/30 to-[#8C6D58]/40 shadow-xl">
                <div className="relative rounded-[22px] overflow-hidden bg-white">
                  
                  {/* Dojo Nature Hero Image */}
                  <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=1000" 
                      alt="Dojo traditionnel et nature - L'Auberge Dansante" 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B]/80 via-[#1E293B]/20 to-transparent"></div>
                    
                    {/* Floating Badge */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#2D5A43]/90 text-amber-200 text-xs font-semibold backdrop-blur-xs mb-1.5">
                        <span>Dojo Les Bambous & Salle Le Chêne</span>
                      </div>
                      <p className="font-serif-heading text-lg font-bold">Un sanctuaire de calme et de respect</p>
                      <p className="text-xs text-slate-200">Tatami naturel, lumière tamisée, environnement apaisant</p>
                    </div>
                  </div>

                  {/* Highlights Bento */}
                  <div className="p-5 space-y-3 bg-[#FAF8F5]">
                    <div className="p-3.5 rounded-xl bg-white border border-[#E8E2D9] flex items-start gap-3.5 shadow-xs">
                      <div className="p-2 rounded-lg bg-[#2D5A43]/10 text-[#2D5A43] shrink-0">
                        <Heart className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#1E293B]">L’Inclusion au cœur de chaque geste</h4>
                        <p className="text-xs text-[#64748B] mt-0.5">
                          Chaque enfant progresse à son propre tempo, guidé par un enseignant attentif à ses besoins sensoriels et émotionnels.
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-[#E8E2D9] flex items-start gap-3.5 shadow-xs">
                      <div className="p-2 rounded-lg bg-[#8C6D58]/15 text-[#8C6D58] shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#1E293B]">Valorisation & Gratification positive</h4>
                        <p className="text-xs text-[#64748B] mt-0.5">
                          Validation des acquis d'ancrage, de concentration et de motricité pour restaurer l'estime de soi.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Heart, Sparkles, Smile, ShieldAlert, Compass, Target, Feather, Activity } from 'lucide-react';

export const MissionSection: React.FC = () => {
  const pillars = [
    {
      icon: Heart,
      title: 'Bienveillance & Zéro Violence',
      desc: 'Les arts martiaux ne sont jamais enseignés comme une arme de domination, mais comme un art du dialogue postural, de l’esquive fluide et du respect inconditionnel de l’autre.',
      badge: 'Philosophie',
      color: 'border-emerald-800/20 bg-emerald-50/50 text-[#2D5A43]'
    },
    {
      icon: Smile,
      title: 'Accueil des Neurodiversités & Fragilités',
      desc: 'Troubles du spectre autistique (TSA), TDAH, dyspraxie, phobie scolaire ou hypersensibilité : nos enseignants adaptent le volume sonore, les consignes et les contacts physiques.',
      badge: 'Inclusion',
      color: 'border-amber-800/20 bg-amber-50/50 text-[#8C6D58]'
    },
    {
      icon: Feather,
      title: 'Respiration, Ancrage & Gestion du Stress',
      desc: 'Chaque séance intègre des rituels de retour au calme inspirés du Qi Gong et du Tai-Chi, offrant aux enfants des outils concrets réutilisables à l’école et à la maison.',
      badge: 'Sérénité',
      color: 'border-blue-800/20 bg-blue-50/50 text-[#1E3A5F]'
    },
    {
      icon: Target,
      title: 'Passeport de Progrès Sans Comparaison',
      desc: 'Pas de compétition anxiogène. L’enfant est félicité pour ses victoires intérieures : oser monter sur le tatami, réussir une roulade, aider un camarade, persévérer avec le sourire.',
      badge: 'Épanouissement',
      color: 'border-slate-800/20 bg-slate-50/50 text-[#1E293B]'
    }
  ];

  const testimonies = [
    {
      quote: "Léo était tétanisé dans les clubs de sport classiques en raison de son TDAH. À L'Auberge Dansante, Sensei Marc lui a offert un espace sécurisant. En six mois, il a retrouvé le sourire et canalise ses angoisses.",
      author: "Sophie M.",
      detail: "Maman de Léo, 8 ans (Aïkido Adapté)"
    },
    {
      quote: "La Capoeira inclusive avec Tiago a libéré la parole et l'agilité de notre fille Jade. Elle qui souffrait de timidité extrême se sent désormais accueillie sans aucun jugement.",
      author: "Alain M.",
      detail: "Papa de Jade, 12 ans (Capoeira)"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FAF8F5] border-t border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8C6D58]/15 text-[#8C6D58] text-xs font-semibold">
            <span>Pourquoi L'Auberge Dansante ?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-heading text-[#1E293B] tracking-tight">
            Une approche pédagogique fondée sur le respect et la sécurité affective
          </h2>
          <p className="text-[#64748B] text-base leading-relaxed">
            Notre vocation n'est pas de former des champions de combat, mais d'aider chaque enfant 
            à habiter son corps en confiance, à tisser des liens bienveillants et à découvrir sa force intérieure.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#E2D9CE] hover:border-[#2D5A43]/40 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl ${pillar.color} inline-block group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D58] bg-[#F4EFEA] px-2.5 py-1 rounded-md">
                      {pillar.badge}
                    </span>
                  </div>
                  <h3 className="font-serif-heading text-xl font-bold text-[#1E293B]">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F1EAE1] flex items-center gap-2 text-xs font-semibold text-[#2D5A43]">
                  <span>Accompagnement individualisé</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonials & Pedagogical quote */}
        <div className="bg-[#F4EFEA] rounded-3xl p-8 md:p-12 border border-[#E2D9CE] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#2D5A43]">
                Témoignages de Familles
              </span>
              <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#1E293B]">
                Des changements visibles dans le quotidien des enfants
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Retrouver le sommeil, oser s'exprimer à l'école, réussir à surmonter les moments de frustration : le dojo devient un laboratoire de vie sécurisant.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {testimonies.map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-[#E2D9CE] shadow-xs flex flex-col justify-between">
                  <p className="text-xs text-[#334155] italic leading-relaxed mb-4">
                    « {item.quote} »
                  </p>
                  <div className="pt-3 border-t border-[#F1EAE1]">
                    <p className="text-xs font-bold text-[#1E293B]">{item.author}</p>
                    <p className="text-[11px] text-[#8C6D58]">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Course, DocumentResource, Student, UserProfile } from '../types';
import { 
  Users, 
  Award, 
  Calendar, 
  BookOpen, 
  Download, 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  FileText, 
  Video, 
  Clock, 
  MapPin, 
  Check, 
  Smile,
  AlertCircle
} from 'lucide-react';

interface FamilyDashboardProps {
  currentUser: UserProfile;
  students: Student[];
  courses: Course[];
  documents: DocumentResource[];
}

export const FamilyDashboard: React.FC<FamilyDashboardProps> = ({
  currentUser,
  students,
  courses,
  documents
}) => {
  // Find family child or default to first student for demonstration
  const myChild = students.find(s => s.familleId === currentUser.id || s.familleEmail.toLowerCase() === currentUser.email.toLowerCase()) || students[0];

  const myCourses = courses.filter(c => myChild?.coursInscritsIds.includes(c.id));
  const memberDocuments = documents.filter(d => d.publicCible === 'tous' || d.publicCible === 'famille');

  const [activeSubTab, setActiveSubTab] = useState<'passport' | 'schedule' | 'resources'>('passport');

  if (!myChild) {
    return (
      <div className="py-12 text-center">
        <p className="text-[#64748B]">Aucun profil élève n'est encore associé à votre compte.</p>
      </div>
    );
  }

  return (
    <div className="py-8 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Family Header Banner */}
        <div className="bg-gradient-to-r from-[#8C6D58] via-[#2D5A43] to-[#1E3A5F] rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xs border-2 border-[#D4AF37] flex items-center justify-center text-2xl shadow-inner">
              🥋
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-900/60 text-amber-200 border border-amber-600/30">
                  Espace Famille & Adhérent
                </span>
                <span className="text-xs text-slate-300">• Saison 2024-2025</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-serif-heading mt-1">
                Famille de {myChild.prenom} {myChild.nom}
              </h1>
              <p className="text-xs sm:text-sm text-slate-200 mt-0.5">
                Passeport sportif & d'épanouissement personnel de votre enfant
              </p>
            </div>
          </div>

          {/* Child Badge Status */}
          <div className="bg-black/20 backdrop-blur-xs p-4 rounded-2xl border border-white/15 space-y-1 text-right">
            <p className="text-[11px] text-amber-200 uppercase tracking-wider font-bold">Grade Actuel</p>
            <p className="font-serif-heading text-lg font-bold text-white">{myChild.niveauActuel}</p>
            <span className="inline-block text-[10px] text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/30">
              Certificat médical : {myChild.certificatMedical ? '✓ À jour' : 'En attente'}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#E2D9CE] pb-3 text-sm">
          <button
            onClick={() => setActiveSubTab('passport')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              activeSubTab === 'passport'
                ? 'bg-[#2D5A43] text-white shadow-xs'
                : 'bg-white text-[#475569] border border-[#E2D9CE] hover:bg-[#FAF8F5]'
            }`}
          >
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span>Passeport du Pratiquant ({myChild.progression.length} acquis)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('schedule')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              activeSubTab === 'schedule'
                ? 'bg-[#2D5A43] text-white shadow-xs'
                : 'bg-white text-[#475569] border border-[#E2D9CE] hover:bg-[#FAF8F5]'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#D4AF37]" />
            <span>Planning des Cours ({myCourses.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('resources')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              activeSubTab === 'resources'
                ? 'bg-[#2D5A43] text-white shadow-xs'
                : 'bg-white text-[#475569] border border-[#E2D9CE] hover:bg-[#FAF8F5]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#D4AF37]" />
            <span>Documents & Guides Réservés ({memberDocuments.length})</span>
          </button>
        </div>

        {/* TAB 1: PASSPORT & PROGRESS */}
        {activeSubTab === 'passport' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Child Profile Overview */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl border border-[#E2D9CE] p-6 shadow-xs space-y-4">
                <h3 className="font-serif-heading text-lg font-bold text-[#1E293B] pb-2 border-b border-[#F1EAE1]">
                  Fiche de l'Élève
                </h3>

                <div className="space-y-3 text-xs text-[#475569]">
                  <div>
                    <span className="text-[#64748B] block">Prénom & Nom :</span>
                    <strong className="text-sm text-[#1E293B]">{myChild.prenom} {myChild.nom}</strong>
                  </div>
                  <div>
                    <span className="text-[#64748B] block">Âge :</span>
                    <strong className="text-sm text-[#1E293B]">{myChild.age} ans (Né(e) le {myChild.dateNaissance})</strong>
                  </div>
                  <div>
                    <span className="text-[#64748B] block">Date d'inscription :</span>
                    <strong className="text-sm text-[#1E293B]">{myChild.dateInscription}</strong>
                  </div>
                  
                  <div className="pt-2 border-t border-[#F1EAE1]">
                    <span className="text-[#64748B] block mb-1">Aménagements & Sensibilités transmises :</span>
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                      {myChild.besoinsSpecifiques}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#F1EAE1]">
                    <span className="text-[#64748B] block">Contact d'urgence enregistré :</span>
                    <strong className="text-sm text-[#1E293B]">{myChild.contactUrgenceNom}</strong>
                    <p className="text-[11px] text-[#64748B]">{myChild.contactUrgenceTel} ({myChild.contactUrgenceRelation})</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Progression Milestones Timeline */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white rounded-3xl border border-[#E2D9CE] p-6 sm:p-8 shadow-xs space-y-6">
                
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#F1EAE1]">
                  <div>
                    <h3 className="font-serif-heading text-2xl font-bold text-[#1E293B] flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                      <span>Le Journal des Victoires Personnelles</span>
                    </h3>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Chaque encouragement consigné ici célèbre les progrès et le courage de {myChild.prenom}.
                    </p>
                  </div>

                  <span className="text-xs font-bold text-[#2D5A43] bg-[#2D5A43]/10 px-3 py-1 rounded-full">
                    {myChild.progression.length} validation{myChild.progression.length > 1 ? 's' : ''}
                  </span>
                </div>

                {myChild.progression.length === 0 ? (
                  <div className="p-10 text-center bg-[#FAF8F5] rounded-2xl border border-[#E2D9CE] space-y-2">
                    <Heart className="w-8 h-8 text-[#8C6D58] mx-auto" />
                    <p className="font-serif-heading text-base font-bold text-[#1E293B]">
                      Le passeport est en cours d'initialisation
                    </p>
                    <p className="text-xs text-[#64748B] max-w-sm mx-auto">
                      Les premières observations et encouragements de l'enseignant apparaîtront ici après les prochaines séances.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {myChild.progression.map((item) => (
                      <div
                        key={item.id}
                        className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E2D9CE] space-y-3 relative overflow-hidden"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#2D5A43] bg-white px-2.5 py-0.5 rounded-md border border-[#E2D9CE]">
                              {item.discipline}
                            </span>
                            {item.gradeCeinture && (
                              <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-md border border-amber-300">
                                🎖️ {item.gradeCeinture}
                              </span>
                            )}
                          </div>

                          <span className="text-xs text-[#64748B] font-medium">
                            Validé le {item.date}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-serif-heading text-lg font-bold text-[#1E293B]">
                            {item.competenceCle}
                          </h4>
                          <p className="text-xs sm:text-sm text-[#334155] italic bg-white p-3 rounded-xl border border-[#E8E2D9] mt-2 leading-relaxed">
                            « {item.commentaireBienveillant} »
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-[#64748B] pt-1">
                          <span>Évalué avec bienveillance par : <strong className="text-[#1E293B]">{item.professeurNom}</strong></span>
                          <span className="font-bold text-[#2D5A43] flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" />
                            {item.noteEval === 'maitrise' ? 'Maîtrise validée' : 'Acquis en séance'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>

          </div>
        )}

        {/* TAB 2: CHILD SCHEDULE */}
        {activeSubTab === 'schedule' && (
          <div className="bg-white rounded-3xl border border-[#E2D9CE] p-6 sm:p-8 shadow-xs space-y-6">
            <h3 className="font-serif-heading text-xl font-bold text-[#1E293B]">
              Les Cours Hebdomadaires de {myChild.prenom}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myCourses.map(course => (
                <div key={course.id} className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E2D9CE] space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-[#2D5A43] bg-white px-2.5 py-1 rounded-md border border-[#E2D9CE]">
                      {course.discipline}
                    </span>
                    <span className="text-xs font-bold text-[#8C6D58] bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      Inscrit(e)
                    </span>
                  </div>

                  <div>
                    <h4 className="font-serif-heading text-xl font-bold text-[#1E293B]">
                      {course.titre}
                    </h4>
                    <p className="text-xs text-[#64748B] mt-1">{course.description}</p>
                  </div>

                  <div className="space-y-2 text-xs text-[#334155] pt-3 border-t border-[#E8E2D9]">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#2D5A43]" />
                      <strong>{course.jour} de {course.heureDebut} à {course.heureFin}</strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#8C6D58]" />
                      <span>{course.salle}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#1E3A5F]" />
                      <span>Sensei : <strong>{course.professeurNom}</strong></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: MEMBER RESOURCES & DOCUMENTS */}
        {activeSubTab === 'resources' && (
          <div className="bg-white rounded-3xl border border-[#E2D9CE] p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h3 className="font-serif-heading text-xl font-bold text-[#1E293B]">
                Documents, Fiches Mémo & Vidéos Réservés aux Familles
              </h3>
              <p className="text-xs text-[#64748B] mt-1">
                Téléchargez les livrets d'accompagnement pour prolonger les bienfaits des séances à la maison.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {memberDocuments.map(doc => (
                <div key={doc.id} className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E2D9CE] flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D5A43] bg-white px-2 py-0.5 rounded-md border border-[#E2D9CE]">
                        {doc.format}
                      </span>
                      <span className="text-[11px] text-[#64748B]">{doc.taille}</span>
                    </div>

                    <h4 className="font-serif-heading text-base font-bold text-[#1E293B]">
                      {doc.titre}
                    </h4>

                    <p className="text-xs text-[#64748B] leading-relaxed">
                      {doc.description}
                    </p>
                  </div>

                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Téléchargement de : ${doc.titre} (${doc.format})`);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-[#2D5A43] text-[#2D5A43] hover:text-white font-semibold text-xs border border-[#E2D9CE] transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Télécharger la ressource</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

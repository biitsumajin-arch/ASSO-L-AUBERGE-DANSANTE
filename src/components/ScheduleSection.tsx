import React, { useState } from 'react';
import { Course, DayOfWeek, DisciplineType, LevelType, Teacher } from '../types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Users, 
  Filter, 
  Sparkles, 
  CheckCircle2, 
  Info, 
  ArrowRight,
  ChevronRight,
  Layers
} from 'lucide-react';

interface ScheduleSectionProps {
  courses: Course[];
  teachers: Teacher[];
  onPreRegisterCourse: (courseId: string) => void;
  initialDisciplineFilter?: DisciplineType | 'all';
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  courses,
  teachers,
  onPreRegisterCourse,
  initialDisciplineFilter = 'all'
}) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>(initialDisciplineFilter);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [selectedTeacher, setSelectedTeacher] = useState<string>('all');
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'weekly'>('grid');

  const days: DayOfWeek[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const disciplines: DisciplineType[] = [
    'Aïkido Adapté',
    'Judo Éducatif',
    'Capoeira Inclusive',
    'Tai-Chi & Respiration',
    'Karaté Do Doux',
    'Éveil Martial'
  ];
  const levels: LevelType[] = [
    'Éveil (4-6 ans)',
    'Initiation (7-10 ans)',
    'Ados (11-15 ans)',
    'Tous niveaux'
  ];

  // Filtering logic
  const filteredCourses = courses.filter(course => {
    if (selectedDiscipline !== 'all' && course.discipline !== selectedDiscipline) return false;
    if (selectedLevel !== 'all' && course.niveau !== selectedLevel) return false;
    if (selectedDay !== 'all' && course.jour !== selectedDay) return false;
    if (selectedTeacher !== 'all' && course.professeurId !== selectedTeacher) return false;
    return true;
  });

  const resetFilters = () => {
    setSelectedDiscipline('all');
    setSelectedLevel('all');
    setSelectedDay('all');
    setSelectedTeacher('all');
  };

  const getDisciplineTheme = (discipline: DisciplineType) => {
    switch (discipline) {
      case 'Aïkido Adapté':
        return { badge: 'bg-[#2D5A43]/15 text-[#2D5A43] border-[#2D5A43]/30', dot: 'bg-[#2D5A43]' };
      case 'Judo Éducatif':
        return { badge: 'bg-[#1E3A5F]/15 text-[#1E3A5F] border-[#1E3A5F]/30', dot: 'bg-[#1E3A5F]' };
      case 'Capoeira Inclusive':
        return { badge: 'bg-[#8C6D58]/15 text-[#8C6D58] border-[#8C6D58]/30', dot: 'bg-[#8C6D58]' };
      case 'Tai-Chi & Respiration':
        return { badge: 'bg-[#3D7858]/15 text-[#3D7858] border-[#3D7858]/30', dot: 'bg-[#3D7858]' };
      case 'Karaté Do Doux':
        return { badge: 'bg-slate-200 text-slate-800 border-slate-300', dot: 'bg-slate-700' };
      case 'Éveil Martial':
        return { badge: 'bg-amber-100 text-amber-900 border-amber-300', dot: 'bg-[#D4AF37]' };
      default:
        return { badge: 'bg-slate-100 text-slate-700 border-slate-200', dot: 'bg-slate-500' };
    }
  };

  return (
    <section className="py-12 md:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3A5F]/10 text-[#1E3A5F] text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            <span>Planning & Agenda Hebdomadaire</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-heading text-[#1E293B] tracking-tight">
            Agenda des Cours & Ateliers Adaptés
          </h2>
          <p className="text-sm sm:text-base text-[#64748B]">
            Trouvez le créneau idéal pour votre enfant selon son âge, sa discipline préférée et sa sensibilité. 
            Les places sont limitées pour préserver la quiétude des séances.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E2D9CE] shadow-xs mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-3 border-b border-[#F1EAE1]">
            <div className="flex items-center gap-2 text-sm font-bold text-[#1E293B]">
              <Filter className="w-4 h-4 text-[#2D5A43]" />
              <span>Filtrer les cours</span>
              <span className="text-xs font-normal text-[#64748B]">
                ({filteredCourses.length} cours trouvé{filteredCourses.length > 1 ? 's' : ''})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={resetFilters}
                className="text-xs text-[#8C6D58] hover:text-[#1E293B] font-semibold underline cursor-pointer"
              >
                Réinitialiser les filtres
              </button>
              
              <div className="hidden sm:flex items-center rounded-lg bg-[#FAF8F5] p-1 border border-[#E2D9CE] text-xs">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded-md font-medium transition-all ${
                    viewMode === 'grid' ? 'bg-white text-[#1E293B] shadow-xs' : 'text-[#64748B]'
                  }`}
                >
                  Grille
                </button>
                <button
                  onClick={() => setViewMode('weekly')}
                  className={`px-3 py-1 rounded-md font-medium transition-all ${
                    viewMode === 'weekly' ? 'bg-white text-[#1E293B] shadow-xs' : 'text-[#64748B]'
                  }`}
                >
                  Vue Semaine
                </button>
              </div>
            </div>
          </div>

          {/* Filter Selects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* Discipline */}
            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-1">Discipline :</label>
              <select
                id="filter-discipline"
                value={selectedDiscipline}
                onChange={(e) => setSelectedDiscipline(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#1E293B] focus:ring-2 focus:ring-[#2D5A43] focus:outline-hidden"
              >
                <option value="all">Toutes les disciplines ({courses.length})</option>
                {disciplines.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Level */}
            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-1">Tranche d'âge / Niveau :</label>
              <select
                id="filter-level"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#1E293B] focus:ring-2 focus:ring-[#2D5A43] focus:outline-hidden"
              >
                <option value="all">Tous les âges & niveaux</option>
                {levels.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            {/* Day */}
            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-1">Jour :</label>
              <select
                id="filter-day"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#1E293B] focus:ring-2 focus:ring-[#2D5A43] focus:outline-hidden"
              >
                <option value="all">Tous les jours</option>
                {days.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Teacher */}
            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-1">Enseignant / Sensei :</label>
              <select
                id="filter-teacher"
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#1E293B] focus:ring-2 focus:ring-[#2D5A43] focus:outline-hidden"
              >
                <option value="all">Tous les enseignants</option>
                {teachers.map(t => (
                  <option key={t.id} value={t.id}>{t.prenom} {t.nom}</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Course Listings */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#E2D9CE] space-y-3">
            <Info className="w-8 h-8 text-[#8C6D58] mx-auto" />
            <h3 className="font-serif-heading text-xl font-bold text-[#1E293B]">
              Aucun cours ne correspond à ces critères
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto">
              Essayez d'élargir votre recherche ou de réinitialiser les filtres pour consulter l'ensemble des créneaux.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-xl bg-[#2D5A43] text-white text-xs font-semibold"
            >
              Voir tous les cours
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const theme = getDisciplineTheme(course.discipline);
              const availableSeats = course.capaciteMax - course.inscritsIds.length;
              const isFull = availableSeats <= 0;

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border border-[#E2D9CE] hover:border-[#2D5A43]/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-6">
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${theme.badge} flex items-center gap-1.5`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`}></span>
                        {course.discipline}
                      </span>
                      <span className="text-[11px] font-semibold text-[#8C6D58] bg-[#FAF8F5] px-2 py-0.5 rounded-md border border-[#E2D9CE]">
                        {course.niveau}
                      </span>
                    </div>

                    {/* Course Title */}
                    <h3 className="font-serif-heading text-xl font-bold text-[#1E293B] group-hover:text-[#2D5A43] transition-colors leading-snug">
                      {course.titre}
                    </h3>

                    <p className="text-xs text-[#64748B] mt-2 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Practical details */}
                    <div className="mt-4 pt-4 border-t border-[#F1EAE1] space-y-2 text-xs text-[#475569]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-[#2D5A43]" />
                          <span className="font-semibold text-[#1E293B]">{course.jour}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#8C6D58]" />
                          <span>{course.heureDebut} - {course.heureFin}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-[#1E3A5F]" />
                          <span>{course.professeurNom}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-[#64748B]">
                          <MapPin className="w-3.5 h-3.5 text-amber-600" />
                          <span className="truncate max-w-[130px]">{course.salle}</span>
                        </div>
                      </div>
                    </div>

                    {/* Capacity Indicator */}
                    <div className="mt-4 pt-3 border-t border-[#F1EAE1] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#64748B]" />
                        <span className="text-[11px] text-[#64748B]">
                          {course.inscritsIds.length} / {course.capaciteMax} inscrits
                        </span>
                      </div>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        isFull 
                          ? 'bg-rose-100 text-rose-700' 
                          : availableSeats <= 2 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {isFull ? 'Complet' : `${availableSeats} place${availableSeats > 1 ? 's' : ''} libre${availableSeats > 1 ? 's' : ''}`}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 bg-[#FAF8F5] border-t border-[#E8E2D9] grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setActiveCourseModal(course)}
                      className="py-2 px-3 rounded-xl bg-white hover:bg-[#F4EFEA] text-[#1E293B] text-xs font-semibold border border-[#E2D9CE] transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5 text-[#64748B]" />
                      <span>Détails</span>
                    </button>

                    <button
                      onClick={() => onPreRegisterCourse(course.id)}
                      disabled={isFull}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                        isFull
                          ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                          : 'bg-[#2D5A43] hover:bg-[#234936] text-white shadow-xs'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>{isFull ? 'Liste d\'attente' : 'S\'inscrire'}</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* Weekly Matrix View */
          <div className="space-y-6">
            {days.map(day => {
              const dayCourses = filteredCourses.filter(c => c.jour === day);
              if (dayCourses.length === 0) return null;

              return (
                <div key={day} className="bg-white rounded-2xl border border-[#E2D9CE] overflow-hidden shadow-xs">
                  <div className="bg-[#1E293B] text-white px-6 py-3 flex items-center justify-between">
                    <h3 className="font-serif-heading text-lg font-bold flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#D4AF37]" />
                      <span>{day}</span>
                    </h3>
                    <span className="text-xs text-slate-300 font-medium">
                      {dayCourses.length} cours
                    </span>
                  </div>

                  <div className="divide-y divide-[#F1EAE1]">
                    {dayCourses.map(c => {
                      const availableSeats = c.capaciteMax - c.inscritsIds.length;
                      return (
                        <div key={c.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-[#2D5A43] bg-[#2D5A43]/10 px-2 py-0.5 rounded-md">
                                {c.heureDebut} - {c.heureFin}
                              </span>
                              <span className="text-xs font-semibold text-[#8C6D58]">
                                {c.discipline}
                              </span>
                              <span className="text-[11px] text-[#64748B]">
                                • {c.niveau}
                              </span>
                            </div>
                            <h4 className="font-serif-heading text-base font-bold text-[#1E293B]">
                              {c.titre}
                            </h4>
                            <p className="text-xs text-[#64748B]">
                              Professeur : <strong className="text-[#1E293B]">{c.professeurNom}</strong> | Salle : {c.salle}
                            </p>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <span className="text-xs text-[#64748B]">
                              {availableSeats} place{availableSeats > 1 ? 's' : ''}
                            </span>
                            <button
                              onClick={() => setActiveCourseModal(c)}
                              className="px-3 py-1.5 rounded-lg bg-white border border-[#E2D9CE] text-xs font-semibold text-[#1E293B]"
                            >
                              Détails
                            </button>
                            <button
                              onClick={() => onPreRegisterCourse(c.id)}
                              className="px-3 py-1.5 rounded-lg bg-[#2D5A43] text-white text-xs font-semibold shadow-xs"
                            >
                              Pré-inscrire
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Course Details Modal */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-[#E2D9CE] shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in duration-200">
            
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#2D5A43]/10 text-[#2D5A43]">
                  {activeCourseModal.discipline}
                </span>
                <h3 className="font-serif-heading text-2xl font-bold text-[#1E293B] mt-2">
                  {activeCourseModal.titre}
                </h3>
                <p className="text-xs text-[#8C6D58] font-medium">{activeCourseModal.niveau}</p>
              </div>
              <button
                onClick={() => setActiveCourseModal(null)}
                className="p-1.5 rounded-lg bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8E2D9] text-xs text-[#334155]">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[#64748B] block">Créneau :</span>
                  <strong className="text-[#1E293B]">{activeCourseModal.jour} {activeCourseModal.heureDebut} - {activeCourseModal.heureFin}</strong>
                </div>
                <div>
                  <span className="text-[#64748B] block">Lieu :</span>
                  <strong className="text-[#1E293B]">{activeCourseModal.salle}</strong>
                </div>
                <div>
                  <span className="text-[#64748B] block">Enseignant :</span>
                  <strong className="text-[#1E293B]">{activeCourseModal.professeurNom}</strong>
                </div>
                <div>
                  <span className="text-[#64748B] block">Capacité :</span>
                  <strong className="text-[#1E293B]">{activeCourseModal.inscritsIds.length} / {activeCourseModal.capaciteMax} élèves</strong>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E293B]">
                Description Pédagogique :
              </h4>
              <p className="text-xs text-[#475569] leading-relaxed">
                {activeCourseModal.description}
              </p>
            </div>

            {activeCourseModal.objectifs && activeCourseModal.objectifs.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D5A43]">
                  Objectifs d'Épanouissement :
                </h4>
                <div className="space-y-1.5">
                  {activeCourseModal.objectifs.map((obj, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#334155]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2D5A43] shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-[#E8E2D9] flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveCourseModal(null)}
                className="px-4 py-2.5 rounded-xl border border-[#E2D9CE] text-xs font-semibold text-[#475569] hover:bg-[#FAF8F5]"
              >
                Fermer
              </button>
              <button
                onClick={() => {
                  onPreRegisterCourse(activeCourseModal.id);
                  setActiveCourseModal(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#2D5A43] text-white text-xs font-semibold shadow-md hover:bg-[#234936]"
              >
                Passer à la pré-inscription
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

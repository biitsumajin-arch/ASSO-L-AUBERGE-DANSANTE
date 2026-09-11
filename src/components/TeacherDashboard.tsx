import React, { useState } from 'react';
import { Course, Student, Teacher, UserProfile } from '../types';
import { 
  GraduationCap, 
  Calendar, 
  Clock, 
  Users, 
  Award, 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  MessageSquare, 
  Heart, 
  Shield, 
  Plus, 
  Check, 
  Save, 
  Info,
  ChevronRight
} from 'lucide-react';

interface TeacherDashboardProps {
  currentUser: UserProfile;
  teachers: Teacher[];
  courses: Course[];
  students: Student[];
  onAddProgression: (studentId: string, item: { discipline: any; competenceCle: string; noteEval: 'en_cours' | 'acquis' | 'maitrise'; commentaireBienveillant: string; professeurNom: string; gradeCeinture?: string }) => void;
  onToggleAttendance: (coursId: string, eleveId: string, eleveNom: string, date: string, present: boolean, remarques?: string) => void;
  attendanceRecords: any[];
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  currentUser,
  teachers,
  courses,
  students,
  onAddProgression,
  onToggleAttendance,
  attendanceRecords
}) => {
  // Find matching teacher profile
  const currentTeacher = teachers.find(t => t.email.toLowerCase() === currentUser.email.toLowerCase()) || teachers[0];
  
  // Teacher's courses
  const myCourses = courses.filter(c => c.professeurId === currentTeacher.id || c.professeurNom.toLowerCase().includes(currentUser.nom.toLowerCase()));
  const [selectedCourseId, setSelectedCourseId] = useState<string>(myCourses[0]?.id || courses[0]?.id || '');
  const [selectedStudentForGrading, setSelectedStudentForGrading] = useState<Student | null>(null);

  // Today's date for attendance
  const todayStr = new Date().toISOString().split('T')[0];
  const [attendanceDate, setAttendanceDate] = useState(todayStr);

  // New progression form state
  const [newCompetence, setNewCompetence] = useState('');
  const [newNoteEval, setNewNoteEval] = useState<'en_cours' | 'acquis' | 'maitrise'>('acquis');
  const [newCommentaire, setNewCommentaire] = useState('');
  const [newGradeCeinture, setNewGradeCeinture] = useState('');
  const [progressionSaved, setProgressionSaved] = useState(false);

  const activeCourse = courses.find(c => c.id === selectedCourseId) || myCourses[0] || courses[0];
  const enrolledStudents = students.filter(s => activeCourse?.inscritsIds.includes(s.id));

  const handleSaveProgression = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentForGrading || !newCompetence || !newCommentaire) return;

    onAddProgression(selectedStudentForGrading.id, {
      discipline: activeCourse ? activeCourse.discipline : 'Aïkido Adapté',
      competenceCle: newCompetence,
      noteEval: newNoteEval,
      commentaireBienveillant: newCommentaire,
      professeurNom: `${currentUser.prenom} ${currentUser.nom}`,
      gradeCeinture: newGradeCeinture || undefined
    });

    setProgressionSaved(true);
    setTimeout(() => {
      setProgressionSaved(false);
      setNewCompetence('');
      setNewCommentaire('');
      setNewGradeCeinture('');
    }, 2000);
  };

  return (
    <div className="py-8 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-[#2D5A43] to-[#1E3A5F] rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatarUrl || currentTeacher.avatarUrl}
              alt={currentUser.prenom}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-[#D4AF37]"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-700/60 text-emerald-200 border border-emerald-500/30">
                  Espace Enseignant / Sensei
                </span>
                <span className="text-xs text-slate-300">• {currentTeacher.disciplines.join(', ')}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-serif-heading mt-1">
                Bonjour, Sensei {currentUser.prenom} {currentUser.nom}
              </h1>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl">
                {currentTeacher.approchePedagogique}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-black/20 p-3 rounded-2xl border border-white/10 shrink-0">
            <div className="text-center px-3">
              <p className="text-xl font-bold font-serif-heading text-amber-300">{myCourses.length}</p>
              <p className="text-[10px] text-slate-300">Mes Cours</p>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center px-3">
              <p className="text-xl font-bold font-serif-heading text-emerald-300">
                {myCourses.reduce((acc, c) => acc + c.inscritsIds.length, 0)}
              </p>
              <p className="text-[10px] text-slate-300">Élèves Suivis</p>
            </div>
          </div>
        </div>

        {/* Course Selector Tabs */}
        <div className="bg-white rounded-2xl p-4 border border-[#E2D9CE] shadow-xs">
          <div className="flex items-center justify-between gap-4 mb-3">
            <h3 className="font-serif-heading text-base font-bold text-[#1E293B] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#2D5A43]" />
              <span>Sélectionner le cours à gérer :</span>
            </h3>
            <span className="text-xs text-[#64748B]">Date de séance : {attendanceDate}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {myCourses.map(course => {
              const isSelected = course.id === selectedCourseId;
              return (
                <button
                  key={course.id}
                  onClick={() => {
                    setSelectedCourseId(course.id);
                    setSelectedStudentForGrading(null);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#2D5A43]/10 border-[#2D5A43] shadow-xs'
                      : 'bg-[#FAF8F5] border-[#E2D9CE] hover:border-[#2D5A43]/40'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold text-[#2D5A43] bg-white px-2 py-0.5 rounded-md border border-[#E2D9CE]">
                      {course.discipline}
                    </span>
                    <span className="text-[11px] text-[#64748B] font-semibold">
                      {course.jour} {course.heureDebut}
                    </span>
                  </div>
                  <h4 className="font-serif-heading text-sm font-bold text-[#1E293B] truncate">
                    {course.titre}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-[#64748B] mt-2 pt-2 border-t border-[#E8E2D9]">
                    <span>{course.salle}</span>
                    <span className="font-bold text-[#1E293B]">{course.inscritsIds.length} élèves</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Grid: Attendance Sheet & Student Progression */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Attendance Roll Call (Feuille d'émargement) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl border border-[#E2D9CE] p-6 shadow-xs space-y-4">
              
              <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[#F1EAE1]">
                <div>
                  <h3 className="font-serif-heading text-xl font-bold text-[#1E293B] flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#2D5A43]" />
                    <span>Feuille d'Émargement & Appel</span>
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    {activeCourse?.titre} • {activeCourse?.jour} ({activeCourse?.heureDebut} - {activeCourse?.heureFin})
                  </p>
                </div>

                <input
                  type="date"
                  value={attendanceDate}
                  onChange={e => setAttendanceDate(e.target.value)}
                  className="bg-[#FAF8F5] border border-[#E2D9CE] rounded-lg px-2.5 py-1 text-xs text-[#1E293B]"
                />
              </div>

              {enrolledStudents.length === 0 ? (
                <div className="p-8 text-center bg-[#FAF8F5] rounded-2xl border border-[#E2D9CE] text-xs text-[#64748B]">
                  Aucun élève inscrit sur ce créneau pour le moment.
                </div>
              ) : (
                <div className="space-y-3">
                  {enrolledStudents.map(student => {
                    const record = attendanceRecords.find(a => a.coursId === activeCourse?.id && a.eleveId === student.id && a.date === attendanceDate);
                    const isPresent = record ? record.present : true; // Default present

                    return (
                      <div
                        key={student.id}
                        className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          selectedStudentForGrading?.id === student.id
                            ? 'bg-[#2D5A43]/5 border-[#2D5A43]'
                            : 'bg-white border-[#E2D9CE]'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[#1E293B]">
                              {student.prenom} {student.nom}
                            </span>
                            <span className="text-[11px] text-[#8C6D58] bg-[#FAF8F5] px-2 py-0.5 rounded-md border border-[#E2D9CE]">
                              {student.age} ans • {student.niveauActuel}
                            </span>
                          </div>

                          {/* Specific Needs / Sensitivity alerts */}
                          <div className="flex items-start gap-1.5 text-[11px] text-amber-900 bg-amber-50 p-1.5 rounded-lg border border-amber-200">
                            <Info className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                            <span>{student.besoinsSpecifiques}</span>
                          </div>

                          <p className="text-[10px] text-[#64748B]">
                            Contact urgence : {student.contactUrgenceNom} ({student.contactUrgenceTel})
                          </p>
                        </div>

                        {/* Actions: Attendance Toggle & Evaluate */}
                        <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F1EAE1]">
                          <div className="flex items-center rounded-lg bg-[#FAF8F5] p-0.5 border border-[#E2D9CE]">
                            <button
                              onClick={() => onToggleAttendance(activeCourse!.id, student.id, `${student.prenom} ${student.nom}`, attendanceDate, true)}
                              className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-all ${
                                isPresent ? 'bg-[#2D5A43] text-white shadow-xs' : 'text-[#64748B]'
                              }`}
                            >
                              <Check className="w-3 h-3" />
                              <span>Présent</span>
                            </button>
                            <button
                              onClick={() => onToggleAttendance(activeCourse!.id, student.id, `${student.prenom} ${student.nom}`, attendanceDate, false)}
                              className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-all ${
                                !isPresent ? 'bg-rose-600 text-white shadow-xs' : 'text-[#64748B]'
                              }`}
                            >
                              <span>Absent</span>
                            </button>
                          </div>

                          <button
                            onClick={() => setSelectedStudentForGrading(student)}
                            className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#8C6D58] border border-amber-200 transition-colors text-xs font-semibold flex items-center gap-1"
                            title="Valoriser / Saisir un progrès"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                            <span className="hidden sm:inline">Évaluer</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          </div>

          {/* Right Column: Saisie de la progression bienveillante */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-[#E2D9CE] p-6 shadow-xs space-y-4">
              
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#F1EAE1]">
                <div className="p-2 rounded-xl bg-[#8C6D58]/15 text-[#8C6D58]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-heading text-lg font-bold text-[#1E293B]">
                    Saisie de la Progression Positive
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    Valoriser les efforts et les réussites de l'enfant
                  </p>
                </div>
              </div>

              {selectedStudentForGrading ? (
                <form onSubmit={handleSaveProgression} className="space-y-4 text-xs">
                  
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#2D5A43] uppercase tracking-wider block">Élève sélectionné :</span>
                      <strong className="text-sm text-[#1E293B]">{selectedStudentForGrading.prenom} {selectedStudentForGrading.nom}</strong>
                      <p className="text-[11px] text-[#64748B]">Grade actuel : {selectedStudentForGrading.niveauActuel}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedStudentForGrading(null)}
                      className="text-[11px] text-[#64748B] hover:text-[#1E293B] underline"
                    >
                      Changer
                    </button>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#475569] mb-1">
                      Compétence ou attitude observée <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex : Roulade avant en douceur, posture du salut, écoute du partenaire, calme..."
                      value={newCompetence}
                      onChange={e => setNewCompetence(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3 py-2 text-xs text-[#1E293B]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#475569] mb-1">
                      Niveau d'acquisition
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setNewNoteEval('en_cours')}
                        className={`py-1.5 px-2 rounded-lg border font-semibold text-[11px] transition-all ${
                          newNoteEval === 'en_cours' ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-[#FAF8F5] border-[#E2D9CE] text-[#64748B]'
                        }`}
                      >
                        🌱 En progrès
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewNoteEval('acquis')}
                        className={`py-1.5 px-2 rounded-lg border font-semibold text-[11px] transition-all ${
                          newNoteEval === 'acquis' ? 'bg-emerald-100 border-emerald-300 text-emerald-900' : 'bg-[#FAF8F5] border-[#E2D9CE] text-[#64748B]'
                        }`}
                      >
                        ⭐ Acquis
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewNoteEval('maitrise')}
                        className={`py-1.5 px-2 rounded-lg border font-semibold text-[11px] transition-all ${
                          newNoteEval === 'maitrise' ? 'bg-blue-100 border-blue-300 text-blue-900' : 'bg-[#FAF8F5] border-[#E2D9CE] text-[#64748B]'
                        }`}
                      >
                        🏆 Maîtrisé
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#475569] mb-1">
                      Commentaire bienveillant & encourageant <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Ex : Bravo à Léo qui a su surmonter son appréhension et a aidé son camarade avec beaucoup de douceur !"
                      value={newCommentaire}
                      onChange={e => setNewCommentaire(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3 py-2 text-xs text-[#1E293B]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#475569] mb-1">
                      Nouveau grade / Barrette de ceinture (facultatif)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex : Barrette Jaune, Ceinture Blanche-Jaune..."
                      value={newGradeCeinture}
                      onChange={e => setNewGradeCeinture(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3 py-2 text-xs text-[#1E293B]"
                    />
                  </div>

                  {progressionSaved ? (
                    <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-center font-bold flex items-center justify-center gap-2">
                      <Check className="w-4 h-4" />
                      <span>Évaluation enregistrée et visible par la famille !</span>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-[#2D5A43] hover:bg-[#234936] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Valider & Ajouter au passeport de l'élève</span>
                    </button>
                  )}

                </form>
              ) : (
                <div className="p-8 text-center bg-[#FAF8F5] rounded-2xl border border-[#E2D9CE] text-xs text-[#64748B] space-y-2">
                  <Sparkles className="w-6 h-6 text-[#8C6D58] mx-auto" />
                  <p className="font-semibold text-[#1E293B]">Aucun élève sélectionné</p>
                  <p>Cliquez sur le bouton "Évaluer" à côté d'un élève dans la liste d'appel pour saisir un progrès.</p>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

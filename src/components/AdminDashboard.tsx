import React, { useState } from 'react';
import { 
  Course, 
  DayOfWeek, 
  DisciplineType, 
  DocumentResource, 
  LevelType, 
  PreRegistration, 
  Student, 
  Teacher, 
  UserProfile 
} from '../types';
import { 
  Shield, 
  Users, 
  GraduationCap, 
  Calendar, 
  Sparkles, 
  FileSpreadsheet, 
  Database, 
  Plus, 
  Search, 
  Filter, 
  Check, 
  X, 
  Trash2, 
  Edit, 
  Download, 
  Eye, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  Clock,
  MapPin,
  Heart
} from 'lucide-react';
import { 
  exportCoursesToCSV, 
  exportPreRegistrationsToCSV, 
  exportStudentsToCSV 
} from '../lib/csvExporter';

interface AdminDashboardProps {
  currentUser: UserProfile;
  students: Student[];
  teachers: Teacher[];
  courses: Course[];
  preRegistrations: PreRegistration[];
  documents: DocumentResource[];
  onAddStudent: (student: any) => void;
  onUpdateStudent: (id: string, updates: Partial<Student>) => void;
  onDeleteStudent: (id: string) => void;
  onAddCourse: (course: any) => void;
  onUpdateCourse: (id: string, updates: Partial<Course>) => void;
  onDeleteCourse: (id: string) => void;
  onUpdateTeacher: (id: string, updates: Partial<Teacher>) => void;
  onAddTeacher: (teacher: any) => void;
  onUpdatePreRegStatus: (id: string, statut: 'en_attente' | 'validee' | 'refusee', notes?: string) => void;
  onConvertPreReg: (id: string) => void;
  onResetDemoData: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  students,
  teachers,
  courses,
  preRegistrations,
  documents,
  onAddStudent,
  onUpdateStudent,
  onDeleteStudent,
  onAddCourse,
  onUpdateCourse,
  onDeleteCourse,
  onUpdateTeacher,
  onAddTeacher,
  onUpdatePreRegStatus,
  onConvertPreReg,
  onResetDemoData
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'teachers' | 'courses' | 'prereg' | 'reports' | 'supabase'>('overview');

  // Search and filters
  const [studentSearch, setStudentSearch] = useState('');
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<Student | null>(null);
  
  // Modals for creation
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);

  // New Student Form State
  const [newStudent, setNewStudent] = useState({
    prenom: '',
    nom: '',
    age: 8,
    dateNaissance: '2017-01-01',
    familleNom: '',
    familleEmail: '',
    familleTelephone: '',
    contactUrgenceNom: '',
    contactUrgenceTel: '',
    contactUrgenceRelation: 'Parent',
    besoinsSpecifiques: '',
    niveauActuel: 'Ceinture Blanche',
    coursInscritsIds: [] as string[],
    certificatMedical: true,
    statut: 'actif' as const
  });

  // New Course Form State
  const [newCourse, setNewCourse] = useState({
    titre: '',
    discipline: 'Aïkido Adapté' as DisciplineType,
    jour: 'Mercredi' as DayOfWeek,
    heureDebut: '14:00',
    heureFin: '15:15',
    professeurId: teachers[0]?.id || '',
    professeurNom: `${teachers[0]?.prenom} ${teachers[0]?.nom}` || 'Marc Viguier',
    niveau: 'Initiation (7-10 ans)' as LevelType,
    salle: 'Dojo Principal - Les Bambous',
    capaciteMax: 8,
    description: '',
    objectifs: ['Découverte des rituels', 'Motricité et équilibre'],
    couleurAccent: '#2D5A43'
  });

  // New Teacher Form State
  const [newTeacherForm, setNewTeacherForm] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    disciplines: ['Aïkido Adapté'] as DisciplineType[],
    diplomes: ['Diplôme Enseignant Sport Adapté'],
    approchePedagogique: 'Pédagogie positive et valorisation du progrès.',
    disponibilites: ['Mercredi', 'Samedi'],
    actif: true,
    userId: `user-prof-${Date.now()}`
  });

  const [copiedSql, setCopiedSql] = useState(false);

  // Stats calculation
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.statut === 'actif').length;
  const totalCourses = courses.length;
  const totalCapacity = courses.reduce((acc, c) => acc + c.capaciteMax, 0);
  const totalEnrolledSlots = courses.reduce((acc, c) => acc + c.inscritsIds.length, 0);
  const occupancyRate = totalCapacity > 0 ? Math.round((totalEnrolledSlots / totalCapacity) * 100) : 0;
  const pendingPreRegs = preRegistrations.filter(p => p.statut === 'en_attente').length;

  const filteredStudents = students.filter(s => {
    const query = studentSearch.toLowerCase();
    return s.prenom.toLowerCase().includes(query) ||
           s.nom.toLowerCase().includes(query) ||
           s.familleNom.toLowerCase().includes(query) ||
           s.besoinsSpecifiques.toLowerCase().includes(query);
  });

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.prenom || !newStudent.nom || !newStudent.familleEmail) return;

    onAddStudent({
      ...newStudent,
      familleId: `famille-${Date.now()}`,
      contactUrgenceNom: newStudent.contactUrgenceNom || `${newStudent.familleNom} (Parent)`,
      contactUrgenceTel: newStudent.contactUrgenceTel || newStudent.familleTelephone
    });

    setIsAddStudentOpen(false);
    setNewStudent({
      prenom: '',
      nom: '',
      age: 8,
      dateNaissance: '2017-01-01',
      familleNom: '',
      familleEmail: '',
      familleTelephone: '',
      contactUrgenceNom: '',
      contactUrgenceTel: '',
      contactUrgenceRelation: 'Parent',
      besoinsSpecifiques: '',
      niveauActuel: 'Ceinture Blanche',
      coursInscritsIds: [],
      certificatMedical: true,
      statut: 'actif'
    });
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const teacher = teachers.find(t => t.id === newCourse.professeurId);
    onAddCourse({
      ...newCourse,
      professeurNom: teacher ? `${teacher.prenom} ${teacher.nom}` : newCourse.professeurNom
    });
    setIsAddCourseOpen(false);
  };

  const handleCreateTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacherForm.prenom || !newTeacherForm.nom || !newTeacherForm.email) return;
    onAddTeacher(newTeacherForm);
    setIsAddTeacherOpen(false);
  };

  return (
    <div className="py-8 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Administration Header */}
        <div className="bg-[#1E293B] rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#1E3A5F] border-2 border-[#D4AF37] flex items-center justify-center text-2xl shadow-inner">
              <Shield className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#1E3A5F] text-blue-200 border border-blue-400/30">
                  Direction Générale & Pôle Pédagogique
                </span>
                <span className="text-xs text-slate-300">• L'Auberge Dansante</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-serif-heading mt-1">
                Tableau de Bord Administrateur
              </h1>
              <p className="text-xs sm:text-sm text-slate-300">
                Gestion des élèves, familles, professeurs, planification et données Supabase
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onResetDemoData}
              className="text-xs text-slate-400 hover:text-white px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700 cursor-pointer"
            >
              Réinitialiser données démo
            </button>
          </div>
        </div>

        {/* Administration Navigation Bar */}
        <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-[#E2D9CE] shadow-xs text-xs sm:text-sm">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'overview' ? 'bg-[#1E3A5F] text-white shadow-xs' : 'text-[#475569] hover:bg-[#FAF8F5]'
            }`}
          >
            <Shield className="w-4 h-4 text-amber-300" />
            <span>Vue Globale & Métriques</span>
          </button>

          <button
            onClick={() => setActiveTab('students')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'students' ? 'bg-[#1E3A5F] text-white shadow-xs' : 'text-[#475569] hover:bg-[#FAF8F5]'
            }`}
          >
            <Users className="w-4 h-4 text-emerald-300" />
            <span>Élèves & Familles ({students.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('prereg')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'prereg' ? 'bg-[#1E3A5F] text-white shadow-xs' : 'text-[#475569] hover:bg-[#FAF8F5]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Pré-inscriptions ({pendingPreRegs > 0 ? `${pendingPreRegs} en attente` : '0'})</span>
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'courses' ? 'bg-[#1E3A5F] text-white shadow-xs' : 'text-[#475569] hover:bg-[#FAF8F5]'
            }`}
          >
            <Calendar className="w-4 h-4 text-blue-300" />
            <span>Planification des Cours ({courses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('teachers')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'teachers' ? 'bg-[#1E3A5F] text-white shadow-xs' : 'text-[#475569] hover:bg-[#FAF8F5]'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-purple-300" />
            <span>Professeurs ({teachers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'reports' ? 'bg-[#1E3A5F] text-white shadow-xs' : 'text-[#475569] hover:bg-[#FAF8F5]'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-amber-400" />
            <span>Rapports & Exports CSV</span>
          </button>

          <button
            onClick={() => setActiveTab('supabase')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'supabase' ? 'bg-[#1E3A5F] text-white shadow-xs' : 'text-[#475569] hover:bg-[#FAF8F5]'
            }`}
          >
            <Database className="w-4 h-4 text-cyan-300" />
            <span>Schéma Supabase / SQL</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-6 rounded-2xl bg-white border border-[#E2D9CE] shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Élèves Inscrits</span>
                  <div className="p-2 rounded-xl bg-blue-50 text-[#1E3A5F]">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-3xl font-bold font-serif-heading text-[#1E293B]">{totalStudents}</p>
                  <p className="text-xs text-emerald-600 font-semibold mt-1">✓ {activeStudents} actifs sur le tatami</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E2D9CE] shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Taux de Remplissage</span>
                  <div className="p-2 rounded-xl bg-emerald-50 text-[#2D5A43]">
                    <Calendar className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-3xl font-bold font-serif-heading text-[#2D5A43]">{occupancyRate}%</p>
                  <p className="text-xs text-[#64748B] mt-1">{totalEnrolledSlots} places occupées / {totalCapacity}</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E2D9CE] shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Pré-inscriptions</span>
                  <div className="p-2 rounded-xl bg-amber-50 text-[#8C6D58]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-3xl font-bold font-serif-heading text-[#8C6D58]">{pendingPreRegs}</p>
                  <p className="text-xs text-amber-700 font-semibold mt-1">
                    {pendingPreRegs > 0 ? 'Demandes à valider' : 'Aucune demande en attente'}
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E2D9CE] shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Corps Enseignant</span>
                  <div className="p-2 rounded-xl bg-purple-50 text-purple-900">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-3xl font-bold font-serif-heading text-[#1E293B]">{teachers.length}</p>
                  <p className="text-xs text-[#64748B] mt-1">Éducateurs sport santé & APA</p>
                </div>
              </div>

            </div>

            {/* Quick Actions & Recent Pre-registrations */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <div className="lg:col-span-8 bg-white rounded-3xl border border-[#E2D9CE] p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#F1EAE1]">
                  <h3 className="font-serif-heading text-lg font-bold text-[#1E293B] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    <span>Dernières Demandes de Pré-inscription</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('prereg')}
                    className="text-xs font-bold text-[#2D5A43] hover:underline"
                  >
                    Voir tout ({preRegistrations.length}) →
                  </button>
                </div>

                <div className="space-y-3">
                  {preRegistrations.slice(0, 3).map(preReg => (
                    <div key={preReg.id} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E2D9CE] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-sm text-[#1E293B]">{preReg.enfantPrenom} {preReg.enfantNom}</strong>
                          <span className="text-[11px] text-[#64748B]">({preReg.enfantAge} ans)</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            preReg.statut === 'validee' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {preReg.statut === 'validee' ? 'Validée' : 'En attente'}
                          </span>
                        </div>
                        <p className="text-xs text-[#64748B] mt-1">
                          Parent : {preReg.parentPrenom} {preReg.parentNom} ({preReg.parentEmail} - {preReg.parentTelephone})
                        </p>
                        {preReg.besoinsParticuliers && (
                          <p className="text-[11px] text-amber-900 italic mt-1 bg-amber-50/80 p-1.5 rounded-lg border border-amber-200">
                            « {preReg.besoinsParticuliers} »
                          </p>
                        )}
                      </div>

                      {preReg.statut === 'en_attente' && (
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => onConvertPreReg(preReg.id)}
                            className="px-3 py-1.5 rounded-xl bg-[#2D5A43] text-white text-xs font-bold shadow-xs hover:bg-[#234936]"
                          >
                            Valider & Intégrer
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 bg-white rounded-3xl border border-[#E2D9CE] p-6 shadow-xs space-y-4">
                <h3 className="font-serif-heading text-lg font-bold text-[#1E293B] pb-2 border-b border-[#F1EAE1]">
                  Exportations Rapides
                </h3>

                <p className="text-xs text-[#64748B]">
                  Générez les fichiers officiels pour les assurances, subventions et mairies :
                </p>

                <div className="space-y-2">
                  <button
                    onClick={() => exportStudentsToCSV(students)}
                    className="w-full p-3 rounded-xl bg-[#FAF8F5] hover:bg-[#F4EFEA] border border-[#E2D9CE] text-left text-xs font-bold text-[#1E293B] flex items-center justify-between"
                  >
                    <span>Export CSV - Liste des Élèves</span>
                    <Download className="w-4 h-4 text-[#2D5A43]" />
                  </button>

                  <button
                    onClick={() => exportCoursesToCSV(courses)}
                    className="w-full p-3 rounded-xl bg-[#FAF8F5] hover:bg-[#F4EFEA] border border-[#E2D9CE] text-left text-xs font-bold text-[#1E293B] flex items-center justify-between"
                  >
                    <span>Export CSV - Planning des Cours</span>
                    <Download className="w-4 h-4 text-[#1E3A5F]" />
                  </button>

                  <button
                    onClick={() => exportPreRegistrationsToCSV(preRegistrations)}
                    className="w-full p-3 rounded-xl bg-[#FAF8F5] hover:bg-[#F4EFEA] border border-[#E2D9CE] text-left text-xs font-bold text-[#1E293B] flex items-center justify-between"
                  >
                    <span>Export CSV - Pré-inscriptions</span>
                    <Download className="w-4 h-4 text-[#8C6D58]" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: STUDENTS & FAMILIES MANAGEMENT */}
        {activeTab === 'students' && (
          <div className="bg-white rounded-3xl border border-[#E2D9CE] p-6 sm:p-8 shadow-xs space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F1EAE1]">
              <div>
                <h3 className="font-serif-heading text-2xl font-bold text-[#1E293B]">
                  Annuaire des Élèves & Familles
                </h3>
                <p className="text-xs text-[#64748B]">
                  Suivi des dossiers, sensibilités spécifiques et contacts d'urgence
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => exportStudentsToCSV(students)}
                  className="px-3.5 py-2 rounded-xl bg-white border border-[#E2D9CE] text-xs font-semibold text-[#1E293B] hover:bg-[#FAF8F5] flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-[#2D5A43]" />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={() => setIsAddStudentOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#2D5A43] hover:bg-[#234936] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ajouter un élève</span>
                </button>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#64748B]" />
              <input
                type="text"
                placeholder="Rechercher par prénom, nom, famille, besoin spécifique (TDAH, dyspraxie...)..."
                value={studentSearch}
                onChange={e => setStudentSearch(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#1E293B]"
              />
            </div>

            {/* Students Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAF8F5] text-[#475569] font-bold border-b border-[#E2D9CE]">
                    <th className="p-3">Élève</th>
                    <th className="p-3">Âge & Niveau</th>
                    <th className="p-3">Besoins & Sensibilités</th>
                    <th className="p-3">Famille & Urgence</th>
                    <th className="p-3">Cours</th>
                    <th className="p-3">Certif. Médical</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1EAE1]">
                  {filteredStudents.map(student => (
                    <tr key={student.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                      <td className="p-3">
                        <strong className="text-sm text-[#1E293B] block">{student.prenom} {student.nom}</strong>
                        <span className="text-[10px] text-[#64748B]">Inscrit le {student.dateInscription}</span>
                      </td>
                      <td className="p-3">
                        <span className="font-semibold text-[#1E293B] block">{student.age} ans</span>
                        <span className="text-[11px] text-[#8C6D58]">{student.niveauActuel}</span>
                      </td>
                      <td className="p-3 max-w-xs">
                        <p className="text-[11px] text-amber-900 bg-amber-50/90 p-1.5 rounded-md border border-amber-200 line-clamp-2">
                          {student.besoinsSpecifiques}
                        </p>
                      </td>
                      <td className="p-3">
                        <p className="font-bold text-[#1E293B]">{student.familleNom}</p>
                        <p className="text-[11px] text-[#64748B]">{student.familleTelephone}</p>
                        <p className="text-[10px] text-[#64748B]">Urg: {student.contactUrgenceTel}</p>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full bg-[#2D5A43]/10 text-[#2D5A43] font-bold text-[11px]">
                          {student.coursInscritsIds.length} créneau{student.coursInscritsIds.length > 1 ? 'x' : ''}
                        </span>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => onUpdateStudent(student.id, { certificatMedical: !student.certificatMedical })}
                          className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                            student.certificatMedical ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {student.certificatMedical ? '✓ Reçu' : '✗ Manquant'}
                        </button>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedStudentForModal(student)}
                            className="p-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100"
                            title="Voir la fiche"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Supprimer le dossier de ${student.prenom} ${student.nom} ?`)) {
                                onDeleteStudent(student.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100"
                            title="Supprimer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 3: PRE-REGISTRATIONS PIPELINE */}
        {activeTab === 'prereg' && (
          <div className="bg-white rounded-3xl border border-[#E2D9CE] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F1EAE1]">
              <div>
                <h3 className="font-serif-heading text-2xl font-bold text-[#1E293B]">
                  Gestion des Demandes de Pré-inscription
                </h3>
                <p className="text-xs text-[#64748B]">
                  Validez les dossiers et convertissez-les en élèves d'un simple clic
                </p>
              </div>

              <button
                onClick={() => exportPreRegistrationsToCSV(preRegistrations)}
                className="px-3.5 py-2 rounded-xl bg-white border border-[#E2D9CE] text-xs font-semibold text-[#1E293B] hover:bg-[#FAF8F5] flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-[#8C6D58]" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="space-y-4">
              {preRegistrations.map(preReg => {
                const requestedCourses = courses.filter(c => preReg.coursSouhaiteIds.includes(c.id));

                return (
                  <div key={preReg.id} className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E2D9CE] space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <strong className="text-base text-[#1E293B]">{preReg.enfantPrenom} {preReg.enfantNom}</strong>
                        <span className="text-xs text-[#8C6D58] font-semibold">{preReg.enfantAge} ans</span>
                        <span className="text-xs text-[#64748B]">• Demandé le {preReg.dateDemande}</span>
                      </div>

                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        preReg.statut === 'validee' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : preReg.statut === 'refusee'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {preReg.statut === 'validee' ? 'Validée & Intégrée' : preReg.statut === 'refusee' ? 'Refusée' : 'En attente d\'examen'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#475569]">
                      <div>
                        <strong className="text-[#1E293B] block">Parent référent :</strong>
                        <p>{preReg.parentPrenom} {preReg.parentNom}</p>
                        <p>{preReg.parentEmail} | {preReg.parentTelephone}</p>
                      </div>

                      <div>
                        <strong className="text-[#1E293B] block">Cours demandés :</strong>
                        <p>{requestedCourses.map(c => c.titre).join(', ') || 'Séance découverte générale'}</p>
                      </div>
                    </div>

                    {preReg.besoinsParticuliers && (
                      <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                        <strong>Sensibilités / Besoins signalés :</strong>
                        <p className="mt-0.5">{preReg.besoinsParticuliers}</p>
                      </div>
                    )}

                    {preReg.statut === 'en_attente' && (
                      <div className="pt-2 border-t border-[#E8E2D9] flex items-center justify-end gap-2">
                        <button
                          onClick={() => onUpdatePreRegStatus(preReg.id, 'refusee')}
                          className="px-3 py-1.5 rounded-xl border border-[#E2D9CE] text-xs font-semibold text-rose-700 hover:bg-rose-50"
                        >
                          Refuser
                        </button>
                        <button
                          onClick={() => onConvertPreReg(preReg.id)}
                          className="px-4 py-1.5 rounded-xl bg-[#2D5A43] text-white text-xs font-bold shadow-xs hover:bg-[#234936] flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Valider & Inscrire comme élève</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: COURSES MANAGEMENT */}
        {activeTab === 'courses' && (
          <div className="bg-white rounded-3xl border border-[#E2D9CE] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F1EAE1]">
              <div>
                <h3 className="font-serif-heading text-2xl font-bold text-[#1E293B]">
                  Planification des Cours & Affectation des Professeurs
                </h3>
                <p className="text-xs text-[#64748B]">
                  Configurez les créneaux, les jauges de places et les salles
                </p>
              </div>

              <button
                onClick={() => setIsAddCourseOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#2D5A43] hover:bg-[#234936] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Nouveau cours</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => (
                <div key={course.id} className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E2D9CE] space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold text-[#2D5A43] bg-white px-2 py-0.5 rounded-md border border-[#E2D9CE]">
                        {course.discipline}
                      </span>
                      <span className="text-xs text-[#8C6D58] font-bold">
                        {course.jour} {course.heureDebut}-{course.heureFin}
                      </span>
                    </div>

                    <h4 className="font-serif-heading text-base font-bold text-[#1E293B]">
                      {course.titre}
                    </h4>

                    <p className="text-xs text-[#64748B]">{course.salle}</p>
                    <p className="text-xs text-[#1E293B]">
                      Enseignant : <strong>{course.professeurNom}</strong>
                    </p>

                    <div className="pt-2 border-t border-[#E8E2D9] flex items-center justify-between text-xs text-[#475569]">
                      <span>Inscrits : {course.inscritsIds.length} / {course.capaciteMax}</span>
                      <span className="font-bold text-[#2D5A43]">
                        {Math.round((course.inscritsIds.length / course.capaciteMax) * 100)}%
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#E8E2D9] flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        if (confirm(`Supprimer le cours "${course.titre}" ?`)) {
                          onDeleteCourse(course.id);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: TEACHERS MANAGEMENT */}
        {activeTab === 'teachers' && (
          <div className="bg-white rounded-3xl border border-[#E2D9CE] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F1EAE1]">
              <div>
                <h3 className="font-serif-heading text-2xl font-bold text-[#1E293B]">
                  Gestion des Professeurs & Éducateurs
                </h3>
                <p className="text-xs text-[#64748B]">
                  Diplômes, disciplines enseignées et autorisations
                </p>
              </div>

              <button
                onClick={() => setIsAddTeacherOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#2D5A43] hover:bg-[#234936] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un professeur</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teachers.map(teacher => (
                <div key={teacher.id} className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E2D9CE] space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={teacher.avatarUrl}
                      alt={teacher.prenom}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-[#D4AF37]"
                    />
                    <div>
                      <h4 className="font-serif-heading text-lg font-bold text-[#1E293B]">
                        Sensei {teacher.prenom} {teacher.nom}
                      </h4>
                      <p className="text-xs text-[#2D5A43] font-bold">{teacher.disciplines.join(', ')}</p>
                      <p className="text-[11px] text-[#64748B]">{teacher.email} | {teacher.telephone}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-[#475569]">
                    <div>
                      <strong className="text-[#1E293B] block">Approche pédagogique :</strong>
                      <p className="italic">{teacher.approchePedagogique}</p>
                    </div>

                    <div>
                      <strong className="text-[#1E293B] block">Diplômes & Certifications :</strong>
                      <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                        {teacher.diplomes.map((d, idx) => (
                          <li key={idx}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: REPORTS & CSV EXPORT */}
        {activeTab === 'reports' && (
          <div className="bg-white rounded-3xl border border-[#E2D9CE] p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h3 className="font-serif-heading text-2xl font-bold text-[#1E293B]">
                Rapports d'Activité & Exports CSV
              </h3>
              <p className="text-xs text-[#64748B]">
                Exports normalisés pour vos déclarations administratives, subventions et bilan associatif
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E2D9CE] space-y-3">
                <div className="p-3 rounded-xl bg-[#2D5A43]/10 text-[#2D5A43] w-fit">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="font-serif-heading text-lg font-bold text-[#1E293B]">Registre des Élèves</h4>
                <p className="text-xs text-[#64748B]">
                  Contient les coordonnées complètes, âges, sensibilités médicales et dates d'inscription.
                </p>
                <button
                  onClick={() => exportStudentsToCSV(students)}
                  className="w-full py-2.5 rounded-xl bg-[#2D5A43] text-white text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Télécharger eleves.csv</span>
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E2D9CE] space-y-3">
                <div className="p-3 rounded-xl bg-[#1E3A5F]/10 text-[#1E3A5F] w-fit">
                  <Calendar className="w-6 h-6" />
                </div>
                <h4 className="font-serif-heading text-lg font-bold text-[#1E293B]">Planning des Cours</h4>
                <p className="text-xs text-[#64748B]">
                  Contient les jauges d'occupation, les créneaux horaires, disciplines et salles.
                </p>
                <button
                  onClick={() => exportCoursesToCSV(courses)}
                  className="w-full py-2.5 rounded-xl bg-[#1E3A5F] text-white text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Télécharger planning.csv</span>
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E2D9CE] space-y-3">
                <div className="p-3 rounded-xl bg-[#8C6D58]/15 text-[#8C6D58] w-fit">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="font-serif-heading text-lg font-bold text-[#1E293B]">Pré-inscriptions</h4>
                <p className="text-xs text-[#64748B]">
                  Historique des demandes en ligne avec statut, besoins spécifiques et notes de suivi.
                </p>
                <button
                  onClick={() => exportPreRegistrationsToCSV(preRegistrations)}
                  className="w-full py-2.5 rounded-xl bg-[#8C6D58] text-white text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Télécharger demandes.csv</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: SUPABASE SCHEMA EXPLORER */}
        {activeTab === 'supabase' && (
          <div className="bg-white rounded-3xl border border-[#E2D9CE] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif-heading text-2xl font-bold text-[#1E293B]">
                  Schéma PostgreSQL / Supabase
                </h3>
                <p className="text-xs text-[#64748B]">
                  Script DDL complet avec rôles RBAC, contraintes et politiques RLS
                </p>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(`-- SCHEMA POSTGRESQL SUPABASE L'AUBERGE DANSANTE...`);
                  setCopiedSql(true);
                  setTimeout(() => setCopiedSql(false), 2000);
                }}
                className="px-4 py-2 rounded-xl bg-[#1E3A5F] text-white text-xs font-bold flex items-center gap-2"
              >
                {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSql ? 'Copié !' : 'Copier le script SQL'}</span>
              </button>
            </div>

            <div className="bg-slate-900 text-slate-100 p-4 rounded-2xl font-mono text-xs overflow-x-auto max-h-96">
              <pre>
{`-- =========================================================
-- SCHEMA SUPABASE / POSTGRESQL - L'AUBERGE DANSANTE
-- =========================================================

CREATE TYPE user_role AS ENUM ('admin', 'professeur', 'famille');
CREATE TYPE discipline_type AS ENUM ('Aïkido Adapté', 'Judo Éducatif', 'Capoeira Inclusive', 'Tai-Chi & Respiration', 'Karaté Do Doux', 'Éveil Martial');

-- Table Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'famille',
  telephone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table Eleves
CREATE TABLE public.eleves (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  age INT NOT NULL,
  famille_id UUID REFERENCES public.profiles(id),
  besoins_specifiques TEXT,
  niveau_actuel TEXT,
  certificat_medical BOOLEAN DEFAULT FALSE
);

-- Table Cours
CREATE TABLE public.cours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titre TEXT NOT NULL,
  discipline discipline_type NOT NULL,
  capacite_max INT DEFAULT 8
);`}
              </pre>
            </div>
          </div>
        )}

      </div>

      {/* Modal Add Student */}
      {isAddStudentOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-serif-heading text-xl font-bold text-[#1E293B]">Ajouter un nouvel élève</h3>
              <button onClick={() => setIsAddStudentOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Prénom de l'élève</label>
                  <input
                    type="text"
                    required
                    placeholder="Léo"
                    value={newStudent.prenom}
                    onChange={e => setNewStudent({ ...newStudent, prenom: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Nom de famille</label>
                  <input
                    type="text"
                    required
                    placeholder="Martin"
                    value={newStudent.nom}
                    onChange={e => setNewStudent({ ...newStudent, nom: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Âge</label>
                  <input
                    type="number"
                    min={4}
                    max={17}
                    value={newStudent.age}
                    onChange={e => setNewStudent({ ...newStudent, age: parseInt(e.target.value) || 8 })}
                    className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Grade / Niveau initial</label>
                  <input
                    type="text"
                    value={newStudent.niveauActuel}
                    onChange={e => setNewStudent({ ...newStudent, niveauActuel: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Sensibilités & Besoins spécifiques</label>
                <textarea
                  rows={2}
                  placeholder="Ex : TDAH, hypersensibilité, dyspraxie..."
                  value={newStudent.besoinsSpecifiques}
                  onChange={e => setNewStudent({ ...newStudent, besoinsSpecifiques: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Email Famille</label>
                  <input
                    type="email"
                    required
                    placeholder="famille@email.fr"
                    value={newStudent.familleEmail}
                    onChange={e => setNewStudent({ ...newStudent, familleEmail: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Téléphone Famille</label>
                  <input
                    type="tel"
                    placeholder="06 12 34 56 78"
                    value={newStudent.familleTelephone}
                    onChange={e => setNewStudent({ ...newStudent, familleTelephone: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddStudentOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E2D9CE]"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2D5A43] text-white font-bold"
                >
                  Créer la fiche élève
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Course */}
      {isAddCourseOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-serif-heading text-xl font-bold text-[#1E293B]">Créer un nouveau cours</h3>
              <button onClick={() => setIsAddCourseOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Titre du cours</label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Aïkido Douceur & Éveil"
                  value={newCourse.titre}
                  onChange={e => setNewCourse({ ...newCourse, titre: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Discipline</label>
                  <select
                    value={newCourse.discipline}
                    onChange={e => setNewCourse({ ...newCourse, discipline: e.target.value as DisciplineType })}
                    className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3 py-2"
                  >
                    <option value="Aïkido Adapté">Aïkido Adapté</option>
                    <option value="Judo Éducatif">Judo Éducatif</option>
                    <option value="Capoeira Inclusive">Capoeira Inclusive</option>
                    <option value="Tai-Chi & Respiration">Tai-Chi & Respiration</option>
                    <option value="Karaté Do Doux">Karaté Do Doux</option>
                    <option value="Éveil Martial">Éveil Martial</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold block mb-1">Jour</label>
                  <select
                    value={newCourse.jour}
                    onChange={e => setNewCourse({ ...newCourse, jour: e.target.value as DayOfWeek })}
                    className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3 py-2"
                  >
                    <option value="Lundi">Lundi</option>
                    <option value="Mardi">Mardi</option>
                    <option value="Mercredi">Mercredi</option>
                    <option value="Jeudi">Jeudi</option>
                    <option value="Vendredi">Vendredi</option>
                    <option value="Samedi">Samedi</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Heure Début</label>
                  <input
                    type="time"
                    value={newCourse.heureDebut}
                    onChange={e => setNewCourse({ ...newCourse, heureDebut: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Heure Fin</label>
                  <input
                    type="time"
                    value={newCourse.heureFin}
                    onChange={e => setNewCourse({ ...newCourse, heureFin: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Enseignant</label>
                  <select
                    value={newCourse.professeurId}
                    onChange={e => setNewCourse({ ...newCourse, professeurId: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3 py-2"
                  >
                    {teachers.map(t => (
                      <option key={t.id} value={t.id}>{t.prenom} {t.nom}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold block mb-1">Capacité max</label>
                  <input
                    type="number"
                    min={4}
                    max={12}
                    value={newCourse.capaciteMax}
                    onChange={e => setNewCourse({ ...newCourse, capaciteMax: parseInt(e.target.value) || 8 })}
                    className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Description pédagogique</label>
                <textarea
                  rows={2}
                  placeholder="Objectifs et déroulé de l'atelier..."
                  value={newCourse.description}
                  onChange={e => setNewCourse({ ...newCourse, description: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3 py-2"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddCourseOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E2D9CE]"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2D5A43] text-white font-bold"
                >
                  Enregistrer le cours
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Teacher */}
      {isAddTeacherOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-serif-heading text-xl font-bold text-[#1E293B]">Ajouter un Professeur</h3>
              <button onClick={() => setIsAddTeacherOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleCreateTeacher} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Prénom</label>
                  <input
                    type="text"
                    required
                    placeholder="Jean"
                    value={newTeacherForm.prenom}
                    onChange={e => setNewTeacherForm({ ...newTeacherForm, prenom: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Nom</label>
                  <input
                    type="text"
                    required
                    placeholder="Dupont"
                    value={newTeacherForm.nom}
                    onChange={e => setNewTeacherForm({ ...newTeacherForm, nom: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Email professionnel</label>
                <input
                  type="email"
                  required
                  placeholder="jean.dupont@auberge-dansante.fr"
                  value={newTeacherForm.email}
                  onChange={e => setNewTeacherForm({ ...newTeacherForm, email: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Approche pédagogique & sport santé</label>
                <textarea
                  rows={2}
                  placeholder="Spécialité motrice, bienveillance..."
                  value={newTeacherForm.approchePedagogique}
                  onChange={e => setNewTeacherForm({ ...newTeacherForm, approchePedagogique: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3 py-2"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddTeacherOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E2D9CE]"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2D5A43] text-white font-bold"
                >
                  Ajouter l'enseignant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal View Student Details */}
      {selectedStudentForModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#2D5A43]/10 text-[#2D5A43]">
                  Fiche Élève Associative
                </span>
                <h3 className="font-serif-heading text-2xl font-bold text-[#1E293B] mt-1">
                  {selectedStudentForModal.prenom} {selectedStudentForModal.nom}
                </h3>
                <p className="text-xs text-[#8C6D58] font-bold">Grade : {selectedStudentForModal.niveauActuel}</p>
              </div>
              <button onClick={() => setSelectedStudentForModal(null)} className="p-1 rounded-lg hover:bg-slate-100">✕</button>
            </div>

            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8E2D9] space-y-2 text-xs text-[#475569]">
              <p><strong>Âge :</strong> {selectedStudentForModal.age} ans (Né(e) le {selectedStudentForModal.dateNaissance})</p>
              <p><strong>Parent :</strong> {selectedStudentForModal.familleNom} ({selectedStudentForModal.familleEmail})</p>
              <p><strong>Urgence :</strong> {selectedStudentForModal.contactUrgenceNom} - {selectedStudentForModal.contactUrgenceTel}</p>
              <div className="pt-2 border-t">
                <strong>Besoins spécifiques :</strong>
                <p className="italic mt-0.5 text-amber-900">{selectedStudentForModal.besoinsSpecifiques}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-serif-heading text-base font-bold text-[#1E293B]">
                Historique des Valorisations & Progrès ({selectedStudentForModal.progression.length})
              </h4>
              {selectedStudentForModal.progression.length === 0 ? (
                <p className="text-xs text-[#64748B]">Aucun progrès consigné pour l'instant.</p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedStudentForModal.progression.map(p => (
                    <div key={p.id} className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CE] text-xs">
                      <div className="flex justify-between font-semibold text-[#1E293B]">
                        <span>{p.competenceCle}</span>
                        <span className="text-[10px] text-[#64748B]">{p.date}</span>
                      </div>
                      <p className="text-[11px] text-[#475569] italic mt-1">« {p.commentaireBienveillant} »</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t flex justify-end">
              <button
                onClick={() => setSelectedStudentForModal(null)}
                className="px-5 py-2 rounded-xl bg-[#1E3A5F] text-white text-xs font-bold"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

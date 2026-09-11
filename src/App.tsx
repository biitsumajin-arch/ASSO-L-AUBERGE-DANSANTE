/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAppStore } from './lib/store';
import { NavigationTab } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MissionSection } from './components/MissionSection';
import { DisciplinesSection } from './components/DisciplinesSection';
import { ScheduleSection } from './components/ScheduleSection';
import { PreRegistrationForm } from './components/PreRegistrationForm';
import { ContactSection } from './components/ContactSection';
import { TeacherDashboard } from './components/TeacherDashboard';
import { FamilyDashboard } from './components/FamilyDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';

export default function App() {
  const {
    currentUser,
    loginAs,
    loginWithCredentials,
    logout,
    students,
    teachers,
    courses,
    preRegistrations,
    documents,
    attendance,
    submitPreRegistration,
    updatePreRegistrationStatus,
    convertPreRegistrationToStudent,
    addStudent,
    updateStudent,
    deleteStudent,
    addCourse,
    updateCourse,
    deleteCourse,
    addTeacher,
    updateTeacher,
    addProgression,
    toggleAttendance,
    resetToDemoData
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [selectedCourseForPreReg, setSelectedCourseForPreReg] = useState<string | undefined>(undefined);

  const handleSelectCourseForPreReg = (courseId: string) => {
    setSelectedCourseForPreReg(courseId);
    setActiveTab('preregistration');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (tab: NavigationTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E293B] font-sans antialiased selection:bg-[#2D5A43] selection:text-white">
      
      {/* Top Navigation Bar */}
      <Navbar
        currentUser={currentUser}
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onChangeRole={loginAs}
        onLogout={logout}
      />

      {/* Main Content Area */}
      <main className="grow">
        {/* PUBLIC VIEW: HOME (Hero + Mission + Disciplines preview + Schedule preview + Pre-reg callout) */}
        {activeTab === 'home' && (
          <div>
            <HeroSection onNavigate={handleNavigate} />
            <MissionSection />
            <DisciplinesSection onSelectCourse={handleSelectCourseForPreReg} />
            <ScheduleSection
              courses={courses}
              teachers={teachers}
              onSelectCourse={handleSelectCourseForPreReg}
            />
            <PreRegistrationForm
              courses={courses}
              initialSelectedCourseId={selectedCourseForPreReg}
              onSubmit={submitPreRegistration}
            />
            <ContactSection />
          </div>
        )}

        {/* PUBLIC VIEW: DISCIPLINES */}
        {activeTab === 'disciplines' && (
          <div className="pt-6">
            <DisciplinesSection onSelectCourse={handleSelectCourseForPreReg} />
            <div className="max-w-7xl mx-auto px-4 pb-16 text-center">
              <button
                onClick={() => handleNavigate('preregistration')}
                className="px-8 py-3.5 rounded-2xl bg-[#2D5A43] hover:bg-[#234936] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                Pré-inscrire mon enfant sans engagement →
              </button>
            </div>
          </div>
        )}

        {/* PUBLIC VIEW: SCHEDULE */}
        {activeTab === 'schedule' && (
          <div className="pt-6">
            <ScheduleSection
              courses={courses}
              teachers={teachers}
              onSelectCourse={handleSelectCourseForPreReg}
            />
          </div>
        )}

        {/* PUBLIC VIEW: PRE-REGISTRATION */}
        {activeTab === 'preregistration' && (
          <div className="pt-6 pb-12">
            <PreRegistrationForm
              courses={courses}
              initialSelectedCourseId={selectedCourseForPreReg}
              onSubmit={submitPreRegistration}
            />
          </div>
        )}

        {/* PUBLIC VIEW: CONTACT */}
        {activeTab === 'contact' && (
          <div className="pt-6 pb-12">
            <ContactSection />
          </div>
        )}

        {/* SECURE VIEW: TEACHER PORTAL */}
        {activeTab === 'teacher-portal' && (
          <TeacherDashboard
            currentUser={currentUser || {
              id: 'guest-teacher',
              email: 'professeur@auberge-dansante.fr',
              nom: 'Viguier',
              prenom: 'Marc',
              role: 'professeur',
              telephone: '06 11 22 33 44'
            }}
            teachers={teachers}
            courses={courses}
            students={students}
            onAddProgression={addProgression}
            onToggleAttendance={toggleAttendance}
            attendanceRecords={attendance}
          />
        )}

        {/* SECURE VIEW: FAMILY / MEMBER PORTAL */}
        {activeTab === 'famille-portal' && (
          <FamilyDashboard
            currentUser={currentUser || {
              id: 'guest-famille',
              email: 'famille@email.fr',
              nom: 'Martin',
              prenom: 'Sophie',
              role: 'famille',
              telephone: '06 99 88 77 66'
            }}
            students={students}
            courses={courses}
            documents={documents}
          />
        )}

        {/* SECURE VIEW: ADMIN DASHBOARD */}
        {activeTab === 'admin-portal' && (
          <AdminDashboard
            currentUser={currentUser || {
              id: 'guest-admin',
              email: 'admin@auberge-dansante.fr',
              nom: 'Beauchamp',
              prenom: 'Claire',
              role: 'admin',
              telephone: '01 42 68 90 12'
            }}
            students={students}
            teachers={teachers}
            courses={courses}
            preRegistrations={preRegistrations}
            documents={documents}
            onAddStudent={addStudent}
            onUpdateStudent={updateStudent}
            onDeleteStudent={deleteStudent}
            onAddCourse={addCourse}
            onUpdateCourse={updateCourse}
            onDeleteCourse={deleteCourse}
            onAddTeacher={addTeacher}
            onUpdateTeacher={updateTeacher}
            onUpdatePreRegStatus={updatePreRegistrationStatus}
            onConvertPreReg={convertPreRegistrationToStudent}
            onResetDemoData={resetToDemoData}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} onOpenAuth={() => setIsAuthModalOpen(true)} />

      {/* Supabase Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginAs={(role) => {
          loginAs(role);
          if (role === 'admin') setActiveTab('admin-portal');
          else if (role === 'professeur') setActiveTab('teacher-portal');
          else setActiveTab('famille-portal');
        }}
        onLoginCustom={(email, role, nom, prenom) => {
          loginWithCredentials(email, role, nom, prenom);
          if (role === 'admin') setActiveTab('admin-portal');
          else if (role === 'professeur') setActiveTab('teacher-portal');
          else setActiveTab('famille-portal');
        }}
      />

    </div>
  );
}

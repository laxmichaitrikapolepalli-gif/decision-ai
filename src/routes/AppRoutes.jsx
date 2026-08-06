import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { ProtectedRoute } from '../components/common/ProtectedRoute';

import { LandingPage } from '../pages/landing/LandingPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { SignupPage } from '../pages/auth/SignupPage';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';
import { OTPVerificationPage } from '../pages/auth/OTPVerificationPage';
import { ResetPasswordPage } from '../pages/auth/ResetPasswordPage';

import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { NewDecisionPage } from '../pages/decisions/NewDecisionPage';
import { DecisionResultPage } from '../pages/decisions/DecisionResultPage';
import { DecisionBattlePage } from '../pages/decisions/DecisionBattlePage';
import { ScenarioSimulatorPage } from '../pages/simulator/ScenarioSimulatorPage';
import { AIInsightsPage } from '../pages/insights/AIInsightsPage';
import { DecisionHistoryPage } from '../pages/decisions/DecisionHistoryPage';
import { ReportsPage } from '../pages/reports/ReportsPage';
import { AnalyticsPage } from '../pages/analytics/AnalyticsPage';
import { SettingsPage } from '../pages/settings/SettingsPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth Layout Pages */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/otp-verify" element={<OTPVerificationPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* Protected Dashboard App Pages */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/decisions/new" element={<NewDecisionPage />} />
          <Route path="/decisions/result/:id" element={<DecisionResultPage />} />
          <Route path="/decisions/battle" element={<DecisionBattlePage />} />
          <Route path="/simulator" element={<ScenarioSimulatorPage />} />
          <Route path="/insights" element={<AIInsightsPage />} />
          <Route path="/decisions/history" element={<DecisionHistoryPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      {/* Fallback 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

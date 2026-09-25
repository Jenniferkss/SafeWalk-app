/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenSwitcher } from './components/ScreenSwitcher';
import { INITIAL_CONTACTS, INITIAL_ROUTES, INITIAL_USER } from './data/mockData';
import { ActiveRouteScreen } from './screens/ActiveRouteScreen';
import { ContactsScreen } from './screens/ContactsScreen';
import { EmergencyHelpScreen } from './screens/EmergencyHelpScreen';
import { GpsUnavailableScreen } from './screens/GpsUnavailableScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { HomeScreen } from './screens/HomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { MotionAlertScreen } from './screens/MotionAlertScreen';
import { PermissionsScreen } from './screens/PermissionsScreen';
import { RouteDetailScreen } from './screens/RouteDetailScreen';
import { RouteSummaryScreen } from './screens/RouteSummaryScreen';
import { Contact, RouteRecord, ScreenType, UserProfile } from './types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [screenHistory, setScreenHistory] = useState<ScreenType[]>(['home']);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  // App Data State
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [routes, setRoutes] = useState<RouteRecord[]>(INITIAL_ROUTES);
  const [selectedRoute, setSelectedRoute] = useState<RouteRecord>(INITIAL_ROUTES[0]);
  const [activeDestination, setActiveDestination] = useState<string>('Casa');

  const navigateTo = (screen: ScreenType) => {
    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop();
      const prevScreen = newHistory[newHistory.length - 1];
      setScreenHistory(newHistory);
      setCurrentScreen(prevScreen);
    } else {
      setCurrentScreen('home');
    }
  };

  // Contact actions
  const handleAddContact = (newContactData: Omit<Contact, 'id'>) => {
    const newContact: Contact = {
      ...newContactData,
      id: Date.now().toString(),
    };
    setContacts((prev) => [newContact, ...prev]);
  };

  const handleDeleteContact = (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const handleEditContact = (id: string, updated: Partial<Contact>) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
  };

  // Route actions
  const handleStartRoute = (destination: string = 'Casa') => {
    setActiveDestination(destination);
    navigateTo('active-route');
  };

  const handleRepeatRoute = (route: RouteRecord) => {
    setActiveDestination(route.destination);
    navigateTo('active-route');
  };

  const handleSelectRouteFromHistory = (route: RouteRecord) => {
    setSelectedRoute(route);
    navigateTo('route-detail');
  };

  return (
    <div className="min-h-screen bg-background text-on-surface antialiased font-sans selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Active Screen Rendering */}
      {currentScreen === 'login' && (
        <LoginScreen
          onSuccess={(next) => navigateTo(next)}
          onOpenScreenSwitcher={() => setIsSwitcherOpen(true)}
        />
      )}

      {currentScreen === 'permissions' && (
        <PermissionsScreen
          onConfirm={() => navigateTo('home')}
          onBack={goBack}
          onOpenScreenSwitcher={() => setIsSwitcherOpen(true)}
        />
      )}

      {currentScreen === 'home' && (
        <HomeScreen
          user={user}
          contactsCount={contacts.length}
          completedRoutesCount={routes.length}
          onNavigate={(screen) => navigateTo(screen)}
          onStartRoute={handleStartRoute}
          onOpenScreenSwitcher={() => setIsSwitcherOpen(true)}
        />
      )}

      {currentScreen === 'active-route' && (
        <ActiveRouteScreen
          user={user}
          destinationTitle={activeDestination}
          onFinishRoute={() => navigateTo('route-summary')}
          onEmergency={() => navigateTo('emergency-help')}
          onTriggerAlert={() => navigateTo('motion-alert')}
          onTriggerGpsOff={() => navigateTo('gps-unavailable')}
          onBack={goBack}
          onOpenScreenSwitcher={() => setIsSwitcherOpen(true)}
        />
      )}

      {currentScreen === 'motion-alert' && (
        <MotionAlertScreen
          user={user}
          onSafeConfirm={() => navigateTo('active-route')}
          onEmergencyTrigger={() => navigateTo('emergency-help')}
          onBack={goBack}
          onOpenScreenSwitcher={() => setIsSwitcherOpen(true)}
        />
      )}

      {currentScreen === 'emergency-help' && (
        <EmergencyHelpScreen
          user={user}
          onBack={() => navigateTo('active-route')}
          onOpenScreenSwitcher={() => setIsSwitcherOpen(true)}
        />
      )}

      {currentScreen === 'route-summary' && (
        <RouteSummaryScreen
          user={user}
          destinationTitle={activeDestination}
          onHome={() => navigateTo('home')}
          onBack={() => navigateTo('active-route')}
          onOpenScreenSwitcher={() => setIsSwitcherOpen(true)}
        />
      )}

      {currentScreen === 'history' && (
        <HistoryScreen
          user={user}
          routes={routes}
          onSelectRoute={handleSelectRouteFromHistory}
          onNavigate={(screen) => navigateTo(screen)}
          onOpenScreenSwitcher={() => setIsSwitcherOpen(true)}
        />
      )}

      {currentScreen === 'route-detail' && (
        <RouteDetailScreen
          user={user}
          route={selectedRoute}
          onRepeatRoute={handleRepeatRoute}
          onBack={() => navigateTo('history')}
          onOpenScreenSwitcher={() => setIsSwitcherOpen(true)}
        />
      )}

      {currentScreen === 'contacts' && (
        <ContactsScreen
          user={user}
          contacts={contacts}
          onAddContact={handleAddContact}
          onDeleteContact={handleDeleteContact}
          onEditContact={handleEditContact}
          onNavigate={(screen) => navigateTo(screen)}
          onOpenScreenSwitcher={() => setIsSwitcherOpen(true)}
        />
      )}

      {currentScreen === 'gps-unavailable' && (
        <GpsUnavailableScreen
          user={user}
          onRetrySuccess={() => navigateTo('active-route')}
          onBack={goBack}
          onOpenScreenSwitcher={() => setIsSwitcherOpen(true)}
        />
      )}

      {/* Screen Switcher Drawer for quick inspection of all 11 screens */}
      <ScreenSwitcher
        isOpen={isSwitcherOpen}
        onClose={() => setIsSwitcherOpen(false)}
        currentScreen={currentScreen}
        onSelectScreen={(screen) => navigateTo(screen)}
      />
    </div>
  );
}

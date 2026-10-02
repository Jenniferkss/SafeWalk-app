import React, { useState } from 'react';

import { ScreenSwitcher } from './src/components/ScreenSwitcher';
import {
  INITIAL_CONTACTS,
  INITIAL_ROUTES,
  INITIAL_USER,
} from './src/data/mockData';

import { ActiveRouteScreen } from './src/screens/ActiveRouteScreen';
import { ContactsScreen } from './src/screens/ContactsScreen';
import { EmergencyHelpScreen } from './src/screens/EmergencyHelpScreen';
import { GpsUnavailableScreen } from './src/screens/GpsUnavailableScreen';
import { HistoryScreen } from './src/screens/HistoryScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { MotionAlertScreen } from './src/screens/MotionAlertScreen';
import { PermissionsScreen } from './src/screens/PermissionsScreen';
import { RouteDetailScreen } from './src/screens/RouteDetailScreen';
import { RouteSummaryScreen } from './src/screens/RouteSummaryScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [screenHistory, setScreenHistory] = useState(['home']);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  // App Data State
  const [user, setUser] = useState(INITIAL_USER);
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [routes, setRoutes] = useState(INITIAL_ROUTES);
  const [selectedRoute, setSelectedRoute] = useState(INITIAL_ROUTES[0]);
  const [activeDestination, setActiveDestination] = useState('Casa');

  const navigateTo = (screen) => {
    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
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
  const handleAddContact = (newContactData) => {
    const newContact = {
      ...newContactData,
      id: Date.now().toString(),
    };

    setContacts((prev) => [newContact, ...prev]);
  };

  const handleDeleteContact = (id) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  const handleEditContact = (id, updated) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id ? { ...contact, ...updated } : contact
      )
    );
  };

  // Route actions
  const handleStartRoute = (destination = 'Casa') => {
    setActiveDestination(destination);
    navigateTo('active-route');
  };

  const handleRepeatRoute = (route) => {
    setActiveDestination(route.destination);
    navigateTo('active-route');
  };

  const handleSelectRouteFromHistory = (route) => {
    setSelectedRoute(route);
    navigateTo('route-detail');
  };

  return (
    <>
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

      <ScreenSwitcher
        isOpen={isSwitcherOpen}
        onClose={() => setIsSwitcherOpen(false)}
        currentScreen={currentScreen}
        onSelectScreen={(screen) => navigateTo(screen)}
      />
    </>
  );
}
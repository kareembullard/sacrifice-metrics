
import React, { useState } from 'react';
import { TabButton } from './components/ui';
import Dashboard from './components/Dashboard';
import SacrificeImpactTable from './components/SacrificeImpactTable';
import Formulas from './components/Formulas';
import Tracker from './components/Tracker';

type Tab = 'Dashboard' | 'Impact Table' | 'Formulas' | 'Tracker';

export default function App() {
    const [activeTab, setActiveTab] = useState<Tab>('Dashboard');

    const renderContent = () => {
        switch (activeTab) {
            case 'Dashboard':
                return <Dashboard />;
            case 'Impact Table':
                return <SacrificeImpactTable />;
            case 'Formulas':
                return <Formulas />;
            case 'Tracker':
                return <Tracker />;
            default:
                return null;
        }
    };

    const tabs: Tab[] = ['Dashboard', 'Impact Table', 'Formulas', 'Tracker'];

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans bg-gradient-to-br from-gray-900 via-gray-900 to-indigo-900/50">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <header className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500">
                        Sacrifice Metrics Dashboard
                    </h1>
                    <p className="mt-2 text-lg text-gray-400">Quantifying the impact of life choices.</p>
                </header>

                <nav className="flex justify-center mb-8 bg-black/20 p-2 rounded-lg backdrop-blur-sm sticky top-4 z-10">
                    <div className="flex space-x-1 sm:space-x-2">
                       {tabs.map(tab => (
                           <TabButton key={tab} onClick={() => setActiveTab(tab)} isActive={activeTab === tab}>
                               {tab}
                           </TabButton>
                       ))}
                    </div>
                </nav>

                <main>
                    {renderContent()}
                </main>

                <footer className="text-center mt-12 text-gray-500 text-sm">
                    <p>Dashboard designed to provide clarity on life's trade-offs.</p>
                </footer>
            </div>
        </div>
    );
}

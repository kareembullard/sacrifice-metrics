
import React from 'react';
import CumulativeImpact from './CumulativeImpact';
import ProgressionChart from './ProgressionChart';

const Dashboard: React.FC = () => {
    return (
        <div className="space-y-6">
            <CumulativeImpact />
            <ProgressionChart />
        </div>
    );
};

export default Dashboard;

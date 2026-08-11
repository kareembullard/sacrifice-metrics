
import React from 'react';
import { Card } from './ui';

const Tracker: React.FC = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
            <h3 className="text-xl font-bold text-white mb-4">Daily Metrics to Track</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Hours saved from each sacrifice</li>
                <li>Money saved/invested</li>
                <li>Productivity rating (1-10)</li>
                <li>Health feeling (1-10)</li>
                <li>Mood score (1-10)</li>
                <li>Tasks completed</li>
            </ul>
        </Card>
        <Card>
            <h3 className="text-xl font-bold text-white mb-4">Weekly Calculations</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Total hours reclaimed</li>
                <li>Net financial position</li>
                <li>Average scores across all metrics</li>
                <li>Progress toward ROI break-even points</li>
            </ul>
        </Card>
        <Card>
            <h3 className="text-xl font-bold text-white mb-4">Monthly Analysis</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Trend analysis of all metrics</li>
                <li>Adjustment recommendations</li>
                <li>Sacrifice effectiveness ranking</li>
                <li>Goal alignment assessment</li>
            </ul>
        </Card>
    </div>
);

export default Tracker;

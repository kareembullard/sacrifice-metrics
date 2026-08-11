
import React from 'react';
import { Card } from './ui';
import { roiCategoryData, formatCurrency, formatNumber } from '../constants';

const CumulativeImpact: React.FC = () => {
    // These values are derived from the 12-month mark in monthlyProgressionData
    const totalGains = {
        time: 65,
        financial: -2720,
        productivity: 30,
        health: 35,
        mood: 19,
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <h2 className="text-2xl font-bold text-white mb-4">Total Annual Gains</h2>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300">Time Freed:</span>
                        <span className="text-2xl font-bold text-blue-400">{formatNumber(totalGains.time * 52)} hrs/year</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300">Net Financial Impact:</span>
                        <span className={`text-2xl font-bold ${totalGains.financial < 0 ? 'text-red-400' : 'text-green-400'}`}>{formatCurrency(totalGains.financial)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300">Productivity Gain:</span>
                        <span className="text-2xl font-bold text-purple-400">+{totalGains.productivity} points</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300">Health Improvement:</span>
                        <span className="text-2xl font-bold text-green-400">+{totalGains.health} points</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300">Mood Net Change:</span>
                        <span className="text-2xl font-bold text-yellow-400">+{totalGains.mood} points</span>
                    </div>
                </div>
            </Card>
            <Card>
                <h2 className="text-2xl font-bold text-white mb-4">ROI by Category</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-300">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="p-2">Category</th>
                                <th className="p-2 text-right">Investment</th>
                                <th className="p-2 text-right">Annual Return</th>
                                <th className="p-2 text-right">5-Year ROI</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roiCategoryData.map(item => (
                                <tr key={item.category} className="border-b border-gray-800">
                                    <td className="p-2 font-medium text-white">{item.category}</td>
                                    <td className="p-2 text-right">{formatCurrency(item.investment)}</td>
                                    <td className={`p-2 text-right ${item.annualReturn < 0 ? 'text-red-400' : 'text-green-400'}`}>{formatCurrency(item.annualReturn)}</td>
                                    <td className="p-2 text-right font-bold text-indigo-400">{item.roi5Year === '∞' ? '∞' : `${formatNumber(item.roi5Year)}%`}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default CumulativeImpact;

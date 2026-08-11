
import React, { useState, useMemo } from 'react';
import { Card } from './ui';
import { formatCurrency, formatNumber, sacrificeData } from '../constants';

const Formulas: React.FC = () => {
    const [hourlyRate, setHourlyRate] = useState(50);
    const [lifeExtension, setLifeExtension] = useState(5);
    const [qolMultiplier, setQolMultiplier] = useState(100000);
    const [baseProd, setBaseProd] = useState(100);

    const totals = useMemo(() => ({
        hoursSaved: sacrificeData.reduce((acc, s) => acc + s.hoursSaved, 0),
        healthScore: sacrificeData.reduce((acc, s) => acc + s.healthScore, 0),
        prodScore: sacrificeData.reduce((acc, s) => acc + s.productivityScore, 0),
    }), []);
    
    const timeValue = totals.hoursSaved * 52 * hourlyRate;
    const healthRoi = totals.healthScore * lifeExtension * qolMultiplier;
    const enhancedOutput = baseProd * (1 + totals.prodScore / 100);

    const sliderClass = "w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500";

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <h3 className="text-xl font-bold text-white mb-2">Time Value Calculation</h3>
                <p className="text-sm text-gray-400 mb-4">Annual Time Value = (Hrs Saved/Wk × 52) × Hourly Rate</p>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Your Hourly Rate: {formatCurrency(hourlyRate)}</label>
                    <input
                        type="range"
                        min="10"
                        max="200"
                        step="5"
                        value={hourlyRate}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHourlyRate(Number(e.target.value))}
                        className={sliderClass}
                    />
                </div>
                <p className="text-gray-300">({totals.hoursSaved} × 52) × {formatCurrency(hourlyRate)} = <span className="text-2xl font-bold text-blue-400">{formatCurrency(timeValue)}</span></p>
            </Card>
            <Card>
                <h3 className="text-xl font-bold text-white mb-2">Compound Health Benefits</h3>
                <p className="text-sm text-gray-400 mb-4">Health ROI = (Health Score Gain × Life Extension Years × QoL Multiplier)</p>
                 <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Life Extension: {lifeExtension} years</label>
                    <input type="range" min="1" max="15" value={lifeExtension} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLifeExtension(Number(e.target.value))} className={sliderClass} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">QoL Multiplier: {formatCurrency(qolMultiplier)}</label>
                    <input type="range" min="25000" max="250000" step="25000" value={qolMultiplier} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQolMultiplier(Number(e.target.value))} className={sliderClass} />
                </div>
                <p className="text-gray-300">{totals.healthScore} × {lifeExtension} × {formatCurrency(qolMultiplier)} = <span className="text-2xl font-bold text-green-400">{formatCurrency(healthRoi)}</span></p>
            </Card>
            <Card>
                <h3 className="text-xl font-bold text-white mb-2">Productivity Multiplier</h3>
                <p className="text-sm text-gray-400 mb-4">Enhanced Output = Base Productivity × (1 + Prod. Gain/100)</p>
                 <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Base Productivity Units: {baseProd}</label>
                    <input type="range" min="50" max="500" step="10" value={baseProd} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBaseProd(Number(e.target.value))} className={sliderClass} />
                </div>
                <p className="text-gray-300">{baseProd} × (1 + {totals.prodScore}/100) = <span className="text-2xl font-bold text-purple-400">{formatNumber(parseFloat(enhancedOutput.toFixed(0)))} units</span></p>
            </Card>
        </div>
    );
};

export default Formulas;

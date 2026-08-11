
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from './ui';
import { monthlyProgressionData, formatCurrency, formatNumber } from '../constants';

const ProgressionChart: React.FC = () => {
    return (
        <Card className="w-full h-[500px]">
            <h2 className="text-2xl font-bold text-white mb-4">Metrics Progression Over 24 Months</h2>
            <ResponsiveContainer width="100%" height="90%">
                <LineChart data={monthlyProgressionData} margin={{ top: 5, right: 30, left: 30, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                    <XAxis dataKey="month" tick={{ fill: '#9ca3af' }} label={{ value: 'Month', position: 'insideBottom', offset: -10, fill: '#9ca3af' }} />
                    
                    <YAxis 
                        yAxisId="left" 
                        tick={{ fill: '#9ca3af' }} 
                        tickFormatter={(value) => formatNumber(value as number)} 
                        label={{ value: 'Cumulative Values', angle: -90, position: 'insideLeft', fill: '#9ca3af', dx: -25 }}
                    />
                    <YAxis 
                        yAxisId="right" 
                        orientation="right" 
                        tick={{ fill: '#9ca3af' }} 
                        label={{ value: 'Scores', angle: 90, position: 'insideRight', fill: '#9ca3af', dx: 25 }}
                    />
                    
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(31, 41, 55, 0.8)',
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '0.5rem',
                        }}
                        labelStyle={{ color: '#d1d5db' }}
                        formatter={(value: number, name: string) => {
                             if (name === 'Net Financial Gain ($)') return [formatCurrency(value), name];
                             return [formatNumber(value), name];
                        }}
                    />
                    <Legend wrapperStyle={{ color: '#d1d5db', paddingTop: '30px' }} />

                    <Line yAxisId="left" type="monotone" dataKey="hours" name="Cumulative Hours Saved" stroke="#38bdf8" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                    <Line yAxisId="left" type="monotone" dataKey="financial" name="Net Financial Gain ($)" stroke="#4ade80" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                    <Line yAxisId="right" type="monotone" dataKey="productivity" name="Productivity Score" stroke="#a78bfa" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                    <Line yAxisId="right" type="monotone" dataKey="health" name="Health Score" stroke="#f472b6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                    <Line yAxisId="right" type="monotone" dataKey="mood" name="Mood Score" stroke="#facc15" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default ProgressionChart;


import React, { useState, useMemo } from 'react';
import { sacrificeData, formatCurrency } from '../constants';
import { Sacrifice, SacrificeCategory } from '../types';
import { Card } from './ui';
import { IconChevronDown, IconChevronsUpDown, IconArrowUp, IconArrowDown } from './icons';

type SortDirection = 'ascending' | 'descending';
type SortKey = keyof Sacrifice;

const SacrificeImpactTable: React.FC = () => {
    const [filter, setFilter] = useState<string>('All');
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({ key: 'sacrifice', direction: 'ascending' });

    const categories: string[] = ['All', ...Array.from(new Set(sacrificeData.map(item => item.category)))];

    const sortedFilteredData = useMemo(() => {
        let data = [...sacrificeData];
        if (filter !== 'All') {
            data = data.filter(item => item.category === filter);
        }
        if (sortConfig.key) {
            data.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return data;
    }, [filter, sortConfig]);

    const requestSort = (key: SortKey) => {
        let direction: SortDirection = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key: SortKey) => {
        if (sortConfig.key !== key) {
            return <IconChevronsUpDown className="h-4 w-4 inline ml-1 text-gray-500" />;
        }
        if (sortConfig.direction === 'ascending') {
            return <IconArrowUp className="h-4 w-4 inline ml-1 text-indigo-400" />;
        }
        return <IconArrowDown className="h-4 w-4 inline ml-1 text-indigo-400" />;
    };
    
    const headers: { key: SortKey; label: string }[] = [
        { key: 'sacrifice', label: 'Sacrifice' },
        { key: 'category', label: 'Category' },
        { key: 'hoursSaved', label: 'Hrs Saved/Wk' },
        { key: 'financialImpact', label: 'Annual Financial Impact' },
        { key: 'productivityScore', label: 'Prod. Score' },
        { key: 'healthScore', label: 'Health Score' },
        { key: 'moodScore', label: 'Mood Score' },
        { key: 'initialCost', label: 'Initial Cost' },
        { key: 'roiTimeline', label: 'ROI (Months)' },
    ];

    const categoryColorMap: Record<SacrificeCategory, string> = {
        Health: 'bg-green-500/20 text-green-300',
        Time: 'bg-blue-500/20 text-blue-300',
        Business: 'bg-purple-500/20 text-purple-300',
        Financial: 'bg-yellow-500/20 text-yellow-300'
    };

    return (
        <Card className="w-full">
            <h2 className="text-2xl font-bold text-white mb-4">Enhanced Sacrifice Impact</h2>
            <div className="flex justify-end mb-4">
                <div className="relative">
                    <select
                        value={filter}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilter(e.target.value)}
                        className="appearance-none bg-black/30 text-white rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <IconChevronDown className="h-5 w-5 text-gray-400 absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none" />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-gray-300">
                    <thead>
                        <tr className="border-b border-gray-700">
                            {headers.map(header => (
                                <th key={header.key} className="p-3 cursor-pointer select-none" onClick={() => requestSort(header.key)}>
                                    {header.label} {getSortIcon(header.key)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedFilteredData.map((item) => (
                            <tr key={item.id} className="border-b border-gray-800 hover:bg-white/5">
                                <td className="p-3 font-medium text-white">{item.sacrifice}</td>
                                <td className="p-3"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${categoryColorMap[item.category]}`}>{item.category}</span></td>
                                <td className="p-3 text-center">{item.hoursSaved}</td>
                                <td className={`p-3 text-right ${item.financialImpact < 0 ? 'text-red-400' : 'text-green-400'}`}>{formatCurrency(item.financialImpact)}</td>
                                <td className="p-3 text-center">{item.productivityScore}</td>
                                <td className="p-3 text-center">{item.healthScore}</td>
                                <td className={`p-3 text-center ${item.moodScore < 0 ? 'text-red-400' : 'text-white'}`}>{item.moodScore}</td>
                                <td className="p-3 text-right">{formatCurrency(item.initialCost)}</td>
                                <td className="p-3 text-center">{item.roiTimeline}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default SacrificeImpactTable;

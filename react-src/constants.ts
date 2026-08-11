
import { Sacrifice, RoiCategory, MonthlyProgression } from './types';

export const sacrificeData: Sacrifice[] = [
    { id: 1, sacrifice: 'Quit smoking', category: 'Health', hoursSaved: 7, financialImpact: 2400, monthlyTimeGain: 30, productivityScore: 3, healthScore: 8, moodScore: 4, initialCost: 0, roiTimeline: 1 },
    { id: 2, sacrifice: 'Cut social media 90%', category: 'Time', hoursSaved: 14, financialImpact: 0, monthlyTimeGain: 60, productivityScore: 4, healthScore: 2, moodScore: 3, initialCost: 0, roiTimeline: 1 },
    { id: 3, sacrifice: 'Miss social events (50%)', category: 'Time', hoursSaved: 8, financialImpact: 480, monthlyTimeGain: 32, productivityScore: 2, healthScore: 1, moodScore: -1, initialCost: 0, roiTimeline: 2 },
    { id: 4, sacrifice: 'Invest in business education', category: 'Business', hoursSaved: 0, financialImpact: -10000, monthlyTimeGain: 0, productivityScore: 6, healthScore: 1, moodScore: 5, initialCost: 10000, roiTimeline: 18 },
    { id: 5, sacrifice: 'Cut draining relationships', category: 'Health', hoursSaved: 5, financialImpact: 0, monthlyTimeGain: 20, productivityScore: 3, healthScore: 3, moodScore: 6, initialCost: 0, roiTimeline: 1 },
    { id: 6, sacrifice: 'Eliminate late-night entertainment', category: 'Time', hoursSaved: 10, financialImpact: 0, monthlyTimeGain: 43, productivityScore: 4, healthScore: 4, moodScore: 2, initialCost: 0, roiTimeline: 1 },
    { id: 7, sacrifice: 'Delegate/rehome pet', category: 'Time', hoursSaved: 14, financialImpact: 1800, monthlyTimeGain: 60, productivityScore: 5, healthScore: 7, moodScore: -2, initialCost: 0, roiTimeline: 1 },
    { id: 8, sacrifice: 'Quit drinking alcohol', category: 'Health', hoursSaved: 3, financialImpact: 1200, monthlyTimeGain: 13, productivityScore: 2, healthScore: 6, moodScore: 1, initialCost: 0, roiTimeline: 1 },
    { id: 9, sacrifice: 'Cancel unused subscriptions', category: 'Financial', hoursSaved: 0, financialImpact: 600, monthlyTimeGain: 0, productivityScore: 0, healthScore: 0, moodScore: 1, initialCost: 0, roiTimeline: 0 },
    { id: 10, sacrifice: 'Meal prep vs dining out', category: 'Health', hoursSaved: 4, financialImpact: 3600, monthlyTimeGain: 17, productivityScore: 1, healthScore: 3, moodScore: 0, initialCost: 200, roiTimeline: 1 },
];

export const roiCategoryData: RoiCategory[] = [
    { category: 'Health sacrifices', investment: 200, annualReturn: 5400, breakEven: 1, roi5Year: 2600 },
    { category: 'Time optimization', investment: 0, annualReturn: 0, breakEven: 0, roi5Year: '∞' },
    { category: 'Education/Business', investment: 10000, annualReturn: -10000, breakEven: 18, roi5Year: 150 },
    { category: 'Habit elimination', investment: 0, annualReturn: 4200, breakEven: 1, roi5Year: '∞' },
];

export const monthlyProgressionData: MonthlyProgression[] = [
    { month: 1, hours: 280, financial: -8520, productivity: 25, health: 30, mood: 15 },
    { month: 3, hours: 840, financial: -7920, productivity: 28, health: 33, mood: 17 },
    { month: 6, hours: 1680, financial: -6720, productivity: 30, health: 35, mood: 19 },
    { month: 12, hours: 3380, financial: -2720, productivity: 30, health: 35, mood: 19 },
    { month: 18, hours: 5070, financial: 2280, productivity: 30, health: 35, mood: 19 },
    { month: 24, hours: 6760, financial: 7280, productivity: 30, health: 35, mood: 19 },
];

export const formatCurrency = (value: number): string => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);
export const formatNumber = (value: number): string => new Intl.NumberFormat('en-US').format(value);

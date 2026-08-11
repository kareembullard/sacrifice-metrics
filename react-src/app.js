// Data from the application
const sacrificeData = [
    { id: 1, sacrifice: 'Quit smoking', category: 'Health', hoursSaved: 7, financialImpact: 2400, monthlyTimeGain: 30, productivityScore: 3, healthScore: 8, moodScore: 4, initialCost: 0, roiTimeline: 1 },
    { id: 2, sacrifice: 'Cut social media 90%', category: 'Time', hoursSaved: 14, financialImpact: 0, monthlyTimeGain: 60, productivityScore: 4, healthScore: 2, moodScore: 3, initialCost: 0, roiTimeline: 1 },
    { id: 3, sacrifice: 'Miss social events (50%)', category: 'Time', hoursSaved: 8, financialImpact: 480, monthlyTimeGain: 32, productivityScore: 2, healthScore: 1, moodScore: -1, initialCost: 0, roiTimeline: 2 },
    { id: 4, sacrifice: 'Invest in business education', category: 'Business', hoursSaved: 0, financialImpact: -10000, monthlyTimeGain: 0, productivityScore: 6, healthScore: 1, moodScore: 5, initialCost: 10000, roiTimeline: 18 },
    { id: 5, sacrifice: 'Cut draining relationships', category: 'Health', hoursSaved: 5, financialImpact: 0, monthlyTimeGain: 20, productivityScore: 3, healthScore: 3, moodScore: 6, initialCost: 0, roiTimeline: 1 },
    { id: 6, sacrifice: 'Eliminate late-night entertainment', category: 'Time', hoursSaved: 10, financialImpact: 0, monthlyTimeGain: 43, productivityScore: 4, healthScore: 4, moodScore: 2, initialCost: 0, roiTimeline: 1 },
    { id: 7, sacrifice: 'Delegate/rehome pet', category: 'Time', hoursSaved: 14, financialImpact: 1800, monthlyTimeGain: 60, productivityScore: 5, healthScore: 7, moodScore: -2, initialCost: 0, roiTimeline: 1 },
    { id: 8, sacrifice: 'Quit drinking alcohol', category: 'Health', hoursSaved: 3, financialImpact: 1200, monthlyTimeGain: 13, productivityScore: 2, healthScore: 6, moodScore: 1, initialCost: 0, roiTimeline: 1 },
    { id: 9, sacrifice: 'Cancel unused subscriptions', category: 'Financial', hoursSaved: 0, financialImpact: 600, monthlyTimeGain: 0, productivityScore: 0, healthScore: 0, moodScore: 1, initialCost: 0, roiTimeline: 0 },
    { id: 10, sacrifice: 'Meal prep vs dining out', category: 'Health', hoursSaved: 4, financialImpact: 3600, monthlyTimeGain: 17, productivityScore: 1, healthScore: 3, moodScore: 0, initialCost: 200, roiTimeline: 1 }
];

const roiCategoryData = [
    { category: 'Health sacrifices', investment: 200, annualReturn: 5400, breakEven: 1, roi5Year: 2600 },
    { category: 'Time optimization', investment: 0, annualReturn: 0, breakEven: 0, roi5Year: '∞' },
    { category: 'Education/Business', investment: 10000, annualReturn: -10000, breakEven: 18, roi5Year: 150 },
    { category: 'Habit elimination', investment: 0, annualReturn: 4200, breakEven: 1, roi5Year: '∞' }
];

const monthlyProgressionData = [
    { month: 1, hours: 280, financial: -8520, productivity: 25, health: 30, mood: 15 },
    { month: 3, hours: 840, financial: -7920, productivity: 28, health: 33, mood: 17 },
    { month: 6, hours: 1680, financial: -6720, productivity: 30, health: 35, mood: 19 },
    { month: 12, hours: 3380, financial: -2720, productivity: 30, health: 35, mood: 19 },
    { month: 18, hours: 5070, financial: 2280, productivity: 30, health: 35, mood: 19 },
    { month: 24, hours: 6760, financial: 7280, productivity: 30, health: 35, mood: 19 }
];

const totalGains = {
    time: 65,
    financial: -2720,
    productivity: 30,
    health: 35,
    mood: 19
};

// Helper functions
const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD', 
        minimumFractionDigits: 0 
    }).format(value);
};

const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
};

// Global variables
let currentSortConfig = { key: 'sacrifice', direction: 'ascending' };
let currentFilter = 'All';
let progressionChart = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    populateDashboard();
    populateImpactTable();
    initializeFormulas();
    initializeChart();
});

// Tab management
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Set initial active tab
    tabButtons[0].classList.add('active');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Hide all tab contents
            tabContents.forEach(content => content.classList.add('hidden'));
            
            // Show target tab content
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.remove('hidden');
            }
        });
    });
}

// Dashboard population
function populateDashboard() {
    // Total gains
    document.getElementById('total-time').textContent = formatNumber(totalGains.time * 52) + ' hrs/year';
    
    const financialElement = document.getElementById('total-financial');
    financialElement.textContent = formatCurrency(totalGains.financial);
    financialElement.className = totalGains.financial < 0 ? 'text-2xl font-bold text-red-400' : 'text-2xl font-bold text-green-400';
    
    document.getElementById('total-productivity').textContent = '+' + totalGains.productivity + ' points';
    document.getElementById('total-health').textContent = '+' + totalGains.health + ' points';
    document.getElementById('total-mood').textContent = '+' + totalGains.mood + ' points';
    
    // ROI table
    const roiTableBody = document.getElementById('roi-table-body');
    roiTableBody.innerHTML = '';
    
    roiCategoryData.forEach(item => {
        const row = document.createElement('tr');
        row.className = 'border-b border-gray-800';
        
        const returnClass = item.annualReturn < 0 ? 'text-red-400' : 'text-green-400';
        const roiDisplay = item.roi5Year === '∞' ? '∞' : formatNumber(item.roi5Year) + '%';
        
        row.innerHTML = `
            <td class="p-2 font-medium text-white">${item.category}</td>
            <td class="p-2 text-right">${formatCurrency(item.investment)}</td>
            <td class="p-2 text-right ${returnClass}">${formatCurrency(item.annualReturn)}</td>
            <td class="p-2 text-right font-bold text-indigo-400">${roiDisplay}</td>
        `;
        
        roiTableBody.appendChild(row);
    });
}

// Impact table population and management
function populateImpactTable() {
    const categoryFilter = document.getElementById('category-filter');
    const tableBody = document.getElementById('sacrifice-table-body');
    
    // Filter change handler
    categoryFilter.addEventListener('change', (e) => {
        currentFilter = e.target.value;
        renderTable();
    });
    
    // Sort handlers
    const sortableHeaders = document.querySelectorAll('[data-sort]');
    sortableHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const sortKey = header.getAttribute('data-sort');
            requestSort(sortKey);
        });
    });
    
    renderTable();
}

function requestSort(key) {
    let direction = 'ascending';
    if (currentSortConfig.key === key && currentSortConfig.direction === 'ascending') {
        direction = 'descending';
    }
    currentSortConfig = { key, direction };
    
    updateSortIcons();
    renderTable();
}

function updateSortIcons() {
    const sortableHeaders = document.querySelectorAll('[data-sort]');
    sortableHeaders.forEach(header => {
        const sortIcon = header.querySelector('.sort-icon');
        const sortKey = header.getAttribute('data-sort');
        
        if (currentSortConfig.key === sortKey) {
            sortIcon.textContent = currentSortConfig.direction === 'ascending' ? '↑' : '↓';
            sortIcon.className = 'sort-icon asc';
        } else {
            sortIcon.textContent = '⇅';
            sortIcon.className = 'sort-icon';
        }
    });
}

function renderTable() {
    const tableBody = document.getElementById('sacrifice-table-body');
    
    // Filter data
    let filteredData = [...sacrificeData];
    if (currentFilter !== 'All') {
        filteredData = filteredData.filter(item => item.category === currentFilter);
    }
    
    // Sort data
    filteredData.sort((a, b) => {
        const aVal = a[currentSortConfig.key];
        const bVal = b[currentSortConfig.key];
        
        if (aVal < bVal) {
            return currentSortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aVal > bVal) {
            return currentSortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });
    
    // Clear and populate table
    tableBody.innerHTML = '';
    
    filteredData.forEach(item => {
        const row = document.createElement('tr');
        row.className = 'border-b border-gray-800 hover:bg-white/5';
        
        const categoryClass = getCategoryClass(item.category);
        const financialClass = item.financialImpact < 0 ? 'financial-negative' : 'financial-positive';
        const moodClass = item.moodScore < 0 ? 'mood-negative' : '';
        
        row.innerHTML = `
            <td class="p-3 font-medium text-white">${item.sacrifice}</td>
            <td class="p-3">
                <span class="category-badge ${categoryClass}">${item.category}</span>
            </td>
            <td class="p-3 text-center">${item.hoursSaved}</td>
            <td class="p-3 text-right ${financialClass}">${formatCurrency(item.financialImpact)}</td>
            <td class="p-3 text-center">${item.productivityScore}</td>
            <td class="p-3 text-center">${item.healthScore}</td>
            <td class="p-3 text-center ${moodClass}">${item.moodScore}</td>
            <td class="p-3 text-right">${formatCurrency(item.initialCost)}</td>
            <td class="p-3 text-center">${item.roiTimeline}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

function getCategoryClass(category) {
    switch(category) {
        case 'Health': return 'category-health';
        case 'Time': return 'category-time';
        case 'Business': return 'category-business';
        case 'Financial': return 'category-financial';
        default: return '';
    }
}

// Formulas tab initialization
function initializeFormulas() {
    const hourlyRateSlider = document.getElementById('hourly-rate');
    const lifeExtensionSlider = document.getElementById('life-extension');
    const qolMultiplierSlider = document.getElementById('qol-multiplier');
    const baseProdSlider = document.getElementById('base-prod');
    
    // Initial calculations
    updateTimeValue();
    updateHealthRoi();
    updateProductivityMultiplier();
    
    // Event listeners
    hourlyRateSlider.addEventListener('input', updateTimeValue);
    lifeExtensionSlider.addEventListener('input', updateHealthRoi);
    qolMultiplierSlider.addEventListener('input', updateHealthRoi);
    baseProdSlider.addEventListener('input', updateProductivityMultiplier);
}

function updateTimeValue() {
    const hourlyRate = parseInt(document.getElementById('hourly-rate').value);
    const timeValue = 65 * 52 * hourlyRate;
    
    document.getElementById('hourly-rate-display').textContent = formatCurrency(hourlyRate);
    document.getElementById('hourly-rate-calc').textContent = formatCurrency(hourlyRate);
    document.getElementById('time-value-result').textContent = formatCurrency(timeValue);
}

function updateHealthRoi() {
    const lifeExtension = parseInt(document.getElementById('life-extension').value);
    const qolMultiplier = parseInt(document.getElementById('qol-multiplier').value);
    const healthRoi = 35 * lifeExtension * qolMultiplier;
    
    document.getElementById('life-extension-display').textContent = lifeExtension;
    document.getElementById('qol-multiplier-display').textContent = formatCurrency(qolMultiplier);
    document.getElementById('life-extension-calc').textContent = lifeExtension;
    document.getElementById('qol-multiplier-calc').textContent = formatCurrency(qolMultiplier);
    document.getElementById('health-roi-result').textContent = formatCurrency(healthRoi);
}

function updateProductivityMultiplier() {
    const baseProd = parseInt(document.getElementById('base-prod').value);
    const enhancedOutput = baseProd * (1 + 30 / 100);
    
    document.getElementById('base-prod-display').textContent = baseProd;
    document.getElementById('base-prod-calc').textContent = baseProd;
    document.getElementById('productivity-result').textContent = formatNumber(Math.round(enhancedOutput));
}

// Chart initialization
function initializeChart() {
    const ctx = document.getElementById('progressionChart').getContext('2d');
    
    progressionChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: monthlyProgressionData.map(d => `Month ${d.month}`),
            datasets: [
                {
                    label: 'Cumulative Hours Saved',
                    data: monthlyProgressionData.map(d => d.hours),
                    borderColor: '#38bdf8',
                    backgroundColor: 'rgba(56, 189, 248, 0.1)',
                    yAxisID: 'y',
                    tension: 0.4
                },
                {
                    label: 'Net Financial Gain ($)',
                    data: monthlyProgressionData.map(d => d.financial),
                    borderColor: '#4ade80',
                    backgroundColor: 'rgba(74, 222, 128, 0.1)',
                    yAxisID: 'y',
                    tension: 0.4
                },
                {
                    label: 'Productivity Score',
                    data: monthlyProgressionData.map(d => d.productivity),
                    borderColor: '#a78bfa',
                    backgroundColor: 'rgba(167, 139, 250, 0.1)',
                    yAxisID: 'y1',
                    tension: 0.4
                },
                {
                    label: 'Health Score',
                    data: monthlyProgressionData.map(d => d.health),
                    borderColor: '#f472b6',
                    backgroundColor: 'rgba(244, 114, 182, 0.1)',
                    yAxisID: 'y1',
                    tension: 0.4
                },
                {
                    label: 'Mood Score',
                    data: monthlyProgressionData.map(d => d.mood),
                    borderColor: '#facc15',
                    backgroundColor: 'rgba(250, 204, 21, 0.1)',
                    yAxisID: 'y1',
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Month',
                        color: '#9ca3af'
                    },
                    ticks: {
                        color: '#9ca3af'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Cumulative Values',
                        color: '#9ca3af'
                    },
                    ticks: {
                        color: '#9ca3af',
                        callback: function(value) {
                            return formatNumber(value);
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Scores',
                        color: '#9ca3af'
                    },
                    ticks: {
                        color: '#9ca3af'
                    },
                    grid: {
                        drawOnChartArea: false,
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#d1d5db',
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(31, 41, 55, 0.8)',
                    titleColor: '#d1d5db',
                    bodyColor: '#d1d5db',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.dataset.label === 'Net Financial Gain ($)') {
                                label += formatCurrency(context.parsed.y);
                            } else {
                                label += formatNumber(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
}
import axios from 'axios';

// Axios instance with base configuration
const api = axios.create({
  baseURL: 'https://api.decisionsphere.ai/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Simulated delay helper for mock responses
const mockDelay = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock Data Objects
export const MOCK_USER = {
  id: 'usr_99812',
  name: 'Dr. Sarah Vance',
  email: 'sarah.vance@enterprise-ai.com',
  role: 'Chief Strategy Officer',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
  company: 'AeroTech Dynamics',
  tier: 'Enterprise AI Plan',
};

export const MOCK_DASHBOARD_DATA = {
  kpis: {
    totalDecisions: 1248,
    accuracyRate: 98.4,
    riskReduction: 35.2,
    capitalSaved: '$4.2M',
  },
  riskScore: 24, // Low risk overall
  confidenceScore: 94,
  todayAISummary: "AI recommendation engine indicates high market readiness for European Expansion Phase II. Supply chain risk reduced by 14% following raw material re-indexing.",
  recentDecisions: [
    {
      id: 'DEC-2026-089',
      title: 'Store Expansion: Hyderabad vs Bangalore',
      category: 'Market Growth',
      impact: 'High',
      confidence: 96,
      risk: 'Medium',
      status: 'Approved',
      date: '2026-08-04',
      roi: '+28%',
      region: 'India South'
    },
    {
      id: 'DEC-2026-088',
      title: 'Cloud Infrastructure Migration to Quantum-Safe Node',
      category: 'IT Infrastructure',
      impact: 'Critical',
      confidence: 98,
      risk: 'Low',
      status: 'Completed',
      date: '2026-08-01',
      roi: '+42%',
      region: 'North America'
    },
    {
      id: 'DEC-2026-087',
      title: 'AI R&D Budget Allocation Q3-Q4',
      category: 'Finance',
      impact: 'High',
      confidence: 91,
      risk: 'High',
      status: 'In Review',
      date: '2026-07-28',
      roi: '+35%',
      region: 'Global'
    },
    {
      id: 'DEC-2026-086',
      title: 'Supply Chain Supplier Redundancy Contract',
      category: 'Operations',
      impact: 'Medium',
      confidence: 94,
      risk: 'Low',
      status: 'Executed',
      date: '2026-07-22',
      roi: '+18%',
      region: 'Europe'
    }
  ],
  upcomingDecisions: [
    { id: 'DEC-UP-01', title: 'Automated Factory Robotics Rollout', dueDate: 'Aug 12, 2026', urgency: 'High' },
    { id: 'DEC-UP-02', title: 'Direct-to-Consumer EU Licensing', dueDate: 'Aug 18, 2026', urgency: 'Medium' },
    { id: 'DEC-UP-03', title: 'Generative Design Patent Acquisition', dueDate: 'Aug 25, 2026', urgency: 'Low' },
  ],
};

export const MOCK_DECISION_DETAILS = {
  id: 'DEC-2026-089',
  title: 'Store Expansion: Hyderabad vs Bangalore Strategic Launch',
  description: 'Comparative spatial-economic analysis evaluating market saturation, tech talent density, commercial real estate cost, regulatory friction, and 3-year projected ROI.',
  industry: 'Retail & Technology Hardware',
  budget: '$2,500,000',
  timeline: '6 Months',
  score: 92,
  confidenceMeter: 96,
  riskMeter: 28, // Out of 100
  aiRecommendation: 'Execute launch in Hyderabad (Hitec City Hub Phase II). Higher initial talent retention rate (+22%), lower square-foot capital expenditure (-18%), and favorable municipal tech subsidies yield an estimated 8.4-month faster payback period than Bangalore.',
  pros: [
    'Subsidized tech-zone infrastructure tax credits in Hyderabad',
    'Lower attrition rate among tier-1 engineering talent',
    '38% lower initial commercial real estate lease overhead',
    'Faster municipal approval workflow (~14 days average)'
  ],
  cons: [
    'Bangalore retains slightly higher initial enterprise ecosystem brand density',
    'Requires setting up new logistics regional fulfillment node'
  ],
  swot: {
    strengths: ['Strong government tech incentive alignment', 'High ROI margin buffer', 'Flexible zoning'],
    weaknesses: ['New regional management team required', 'Initial warehouse setup delay'],
    opportunities: ['First-mover advantage in Financial District Phase III', 'AI talent recruitment pool expansion'],
    threats: ['Local utility tariff fluctuations', 'Competing hyper-scaler expansion']
  },
  actionPlan: [
    { step: 1, title: 'Real Estate & Zoning Sign-off', duration: 'Week 1-2', status: 'Done' },
    { step: 2, title: 'Supply Chain & Inventory Node Setup', duration: 'Week 3-6', status: 'In Progress' },
    { step: 3, title: 'Core Executive & Store Talent Onboarding', duration: 'Week 6-10', status: 'Pending' },
    { step: 4, title: 'Grand Soft Launch & AI Demand Optimization', duration: 'Week 12-14', status: 'Pending' }
  ],
  alternatives: [
    { name: 'Bangalore (Whitefield Tech Hub)', score: 84, recommendation: 'Viable secondary option if enterprise B2B sales leads exceed 45% in Q4.' },
    { name: 'Chennai (Guindy Industrial Park)', score: 71, recommendation: 'Lower cost structure but higher supply chain lead-time risk.' },
  ]
};

export const MOCK_INSIGHTS = [
  {
    id: 'ins-1',
    type: 'Trend Detection',
    title: 'Surge in Commercial Lease Arbitrage in APAC Tech Corridors',
    description: 'Real-time spatial analysis shows a 14.2% cost differential favoring secondary tech hubs over traditional metros.',
    impact: 'High Positive',
    confidence: 97,
    action: 'Reallocate 15% of real estate expansion capital to emerging corridors.'
  },
  {
    id: 'ins-2',
    type: 'Hidden Risk',
    title: 'Component Supply Delay Warning: Q4 Semiconductor Packaging',
    description: 'Predictive Monte Carlo models highlight potential 3-week logistics bottleneck in SEA maritime transit.',
    impact: 'High Negative',
    confidence: 91,
    action: 'Activate secondary supplier contingency clause before Aug 20.'
  },
  {
    id: 'ins-3',
    type: 'Opportunity',
    title: 'Energy Tariff Arbitrage via Solar PPA in Southern Facilities',
    description: 'Dynamic power grid pricing models predict a $380,000 annual operational expense savings.',
    impact: 'Medium Positive',
    confidence: 95,
    action: 'Initiate green energy PPA RFP immediately.'
  }
];

// Placeholder Mock Service Methods (Connected to Axios patterns)
export const apiService = {
  // Authentication
  login: async (credentials) => {
    await mockDelay(700);
    /* Real integration example:
       return await api.post('/auth/login', credentials);
    */
    if (credentials.email && credentials.password) {
      return { status: 200, data: { user: MOCK_USER, token: 'jwt_token_ds_mock_9921' } };
    }
    throw new Error('Invalid credentials');
  },

  signup: async (userData) => {
    await mockDelay(800);
    return { status: 201, data: { user: { ...MOCK_USER, ...userData }, token: 'jwt_token_ds_mock_new' } };
  },

  forgotPassword: async (email) => {
    await mockDelay(600);
    return { status: 200, data: { message: 'Reset link and OTP sent to your email.' } };
  },

  verifyOTP: async (otp) => {
    await mockDelay(600);
    return { status: 200, data: { message: 'OTP verified successfully.' } };
  },

  resetPassword: async (passwordData) => {
    await mockDelay(700);
    return { status: 200, data: { message: 'Password reset successfully.' } };
  },

  // Dashboard & Analytics
  getDashboardData: async () => {
    await mockDelay(500);
    return { status: 200, data: MOCK_DASHBOARD_DATA };
  },

  // Decisions
  createDecision: async (decisionPayload) => {
    await mockDelay(1200); // Simulate AI Monte Carlo calculation engine latency
    return {
      status: 201,
      data: {
        id: `DEC-2026-${Math.floor(100 + Math.random() * 900)}`,
        ...decisionPayload,
        score: Math.floor(85 + Math.random() * 12),
        confidenceMeter: Math.floor(90 + Math.random() * 8),
        riskMeter: Math.floor(15 + Math.random() * 25),
        aiRecommendation: `AI Simulation completed using 10,000 Monte Carlo iterations. Proposed strategy achieves an optimal risk-reward ratio with expected ROI of ${decisionPayload.expectedRoi || '+32%'}.`,
        swot: MOCK_DECISION_DETAILS.swot,
        actionPlan: MOCK_DECISION_DETAILS.actionPlan,
        alternatives: MOCK_DECISION_DETAILS.alternatives
      }
    };
  },

  getDecisionById: async (id) => {
    await mockDelay(400);
    return { status: 200, data: { ...MOCK_DECISION_DETAILS, id } };
  },

  getHistory: async () => {
    await mockDelay(500);
    return { status: 200, data: MOCK_DASHBOARD_DATA.recentDecisions };
  },

  getBattleComparison: async (optionA, optionB) => {
    await mockDelay(900);
    return {
      status: 200,
      data: {
        optionA: {
          name: optionA.name || 'Hyderabad Store',
          score: 92,
          costScore: 88,
          roiScore: 94,
          riskScore: 82,
          marketScore: 95,
          competitionScore: 89,
          growthScore: 96,
          timeToMarket: '3.5 Months',
          winner: true
        },
        optionB: {
          name: optionB.name || 'Bangalore Store',
          score: 84,
          costScore: 74,
          roiScore: 88,
          riskScore: 79,
          marketScore: 92,
          competitionScore: 91,
          growthScore: 85,
          timeToMarket: '4.8 Months',
          winner: false
        },
        aiSummary: 'Hyderabad wins overall due to 18% lower operational expenditure and 1.3 months faster time-to-market.'
      }
    };
  },

  getSimulatorData: async (sliders) => {
    await mockDelay(300);
    const { budget, timeline, risk, teamSize } = sliders;
    const calculatedRoi = Math.round(budget * 0.28 + (100 - risk) * 0.15 + teamSize * 0.5);
    const calculatedConfidence = Math.round(85 + (timeline * 0.5) - (risk * 0.2));
    
    return {
      status: 200,
      data: {
        projectedRoi: `${calculatedRoi}%`,
        confidenceScore: `${Math.min(99, Math.max(60, calculatedConfidence))}%`,
        riskLevel: risk > 60 ? 'High Risk' : risk > 35 ? 'Moderate Risk' : 'Optimal Low Risk',
        chartData: [
          { month: 'Month 1', conservative: budget * 0.1, expected: budget * 0.15, aggressive: budget * 0.2 },
          { month: 'Month 2', conservative: budget * 0.3, expected: budget * 0.42, aggressive: budget * 0.55 },
          { month: 'Month 3', conservative: budget * 0.55, expected: budget * 0.78, aggressive: budget * 0.95 },
          { month: 'Month 4', conservative: budget * 0.85, expected: budget * 1.15, aggressive: budget * 1.45 },
          { month: 'Month 5', conservative: budget * 1.1, expected: budget * 1.5, aggressive: budget * 1.95 },
          { month: 'Month 6', conservative: budget * 1.4, expected: budget * 1.95, aggressive: budget * 2.5 },
        ]
      }
    };
  },

  getInsights: async () => {
    await mockDelay(400);
    return { status: 200, data: MOCK_INSIGHTS };
  },

  getReports: async () => {
    await mockDelay(500);
    return {
      status: 200,
      data: [
        { id: 'REP-01', title: 'Q3 Enterprise AI Strategy Review', date: '2026-08-01', format: 'PDF', size: '2.4 MB' },
        { id: 'REP-02', title: 'Global APAC Spatial Expansion Audit', date: '2026-07-28', format: 'PDF', size: '4.1 MB' },
        { id: 'REP-03', title: 'Supply Chain Resilience & Risk Matrix', date: '2026-07-15', format: 'PDF', size: '1.8 MB' },
      ]
    };
  },

  sendAIChatPrompt: async (message) => {
    await mockDelay(900);
    let reply = "Based on our predictive models, this decision strategy aligns with your target ROI threshold while maintaining risk variance under 12%. Shall I generate a full scenario simulation report?";
    if (message.toLowerCase().includes('hyderabad') || message.toLowerCase().includes('bangalore')) {
      reply = "Hyderabad demonstrates a 14% higher capital efficiency score over Bangalore, primarily driven by commercial lease subsidies and lower talent acquisition friction in 2026.";
    } else if (message.toLowerCase().includes('budget') || message.toLowerCase().includes('roi')) {
      reply = "Increasing your budget allocation by 15% yields a non-linear 28% increase in expected ROI due to economies of scale in infrastructure deployment.";
    }
    return { status: 200, data: { reply, confidence: 96, sources: ['Monte Carlo Engine v4', 'APAC Real Estate Index 2026'] } };
  }
};

export default api;

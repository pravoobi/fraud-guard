export const fraudModules = [
  {
    id: 'upi-fraud',
    title: 'UPI Fraud Protection',
    description: 'Learn to identify and prevent UPI-related frauds',
    icon: '💳',
    difficulty: 'Beginner',
    estimatedTime: '15 mins',
    color: 'bg-blue-500',
    scenarios: [
      {
        id: 'fake-cashback-call',
        title: 'Fake Cashback Call Scenario',
        description: 'Someone calls claiming to offer cashback if you enter your PIN',
        type: 'phone-call'
      },
      {
        id: 'payment-request-confusion',
        title: 'Payment Request vs Payment Flow',
        description: 'Understanding the difference between sending and receiving money',
        type: 'upi-interface'
      }
    ]
  },
  {
    id: 'bank-impersonation',
    title: 'Bank Impersonation Detection',
    description: 'Recognize fake bank representatives and calls',
    icon: '🏦',
    difficulty: 'Intermediate',
    estimatedTime: '20 mins',
    color: 'bg-green-500',
    scenarios: [
      {
        id: 'fake-bank-call',
        title: 'Fake Bank Representative Call',
        description: 'A caller claims to be from your bank asking for sensitive information',
        type: 'phone-call'
      },
      {
        id: 'caller-id-spoofing',
        title: 'Caller ID Spoofing Demo',
        description: 'How scammers can fake official phone numbers',
        type: 'education'
      }
    ]
  },
  {
    id: 'kyc-scam',
    title: 'KYC Scam Prevention',
    description: 'Identify fake KYC update requests and phishing attempts',
    icon: '📋',
    difficulty: 'Beginner',
    estimatedTime: '12 mins',
    color: 'bg-purple-500',
    scenarios: [
      {
        id: 'fake-kyc-sms',
        title: 'Fake KYC Update SMS',
        description: 'SMS claiming your KYC will expire with suspicious links',
        type: 'sms-interface'
      },
      {
        id: 'real-vs-fake-links',
        title: 'Real vs Fake Banking Links',
        description: 'How to verify legitimate banking website URLs',
        type: 'education'
      }
    ]
  },
  {
    id: 'aadhaar-pan-fraud',
    title: 'Aadhaar/PAN Fraud Alerts',
    description: 'Protect your identity documents from misuse',
    icon: '🆔',
    difficulty: 'Intermediate',
    estimatedTime: '18 mins',
    color: 'bg-red-500',
    scenarios: [
      {
        id: 'aadhaar-pan-fraud',
        title: 'Aadhaar/PAN Fraud Detection',
        description: 'Learn to protect your identity documents from misuse and fraud',
        type: 'education'
      }
    ]
  },
  {
    id: 'loan-credit-scam',
    title: 'Loan/Credit Card Scam Detection',
    description: 'Avoid instant loan and credit card frauds',
    icon: '💰',
    difficulty: 'Advanced',
    estimatedTime: '25 mins',
    color: 'bg-yellow-500',
    scenarios: [
      {
        id: 'loan-credit-scam',
        title: 'Loan/Credit Card Scam Detection',
        description: 'Learn to identify and avoid instant loan and credit card frauds',
        type: 'education'
      }
    ]
  },
  {
    id: 'digital-arrest',
    title: 'Digital Arrest Scam Protection',
    description: 'Recognize and respond to fake authority threats',
    icon: '👮',
    difficulty: 'Advanced',
    estimatedTime: '22 mins',
    color: 'bg-indigo-500',
    scenarios: [
      {
        id: 'digital-arrest-scam',
        title: 'Digital Arrest Scam Protection',
        description: 'Learn to recognize and respond to fake authority threats',
        type: 'education'
      }
    ]
  }
];

export const scenarioTemplates = {
  'phone-call': {
    type: 'phone-call',
    interface: 'call-screen',
    features: ['caller-id', 'call-timer', 'end-call', 'speaker']
  },
  'upi-interface': {
    type: 'upi-interface', 
    interface: 'payment-app',
    features: ['balance', 'contacts', 'scan-pay', 'request-money']
  },
  'sms-interface': {
    type: 'sms-interface',
    interface: 'message-screen',
    features: ['sender-info', 'message-content', 'links', 'reply-options']
  },
  'education': {
    type: 'education',
    interface: 'info-screen',
    features: ['diagrams', 'comparisons', 'tips', 'examples']
  }
}; 
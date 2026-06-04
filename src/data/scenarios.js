export const scenarioData = {
  'fake-cashback-call': {
    title: 'Fake Cashback Call Scenario',
    type: 'phone-call',
    description: 'You receive a call claiming to offer cashback. Learn to identify and respond to this common UPI fraud.',
    steps: [
      {
        id: 'incoming-call',
        title: 'Incoming Call',
        description: 'Your phone is ringing. The caller ID shows your bank\'s name.',
        situation: 'You receive a call from someone claiming to be from your bank offering a cashback of ₹500.',
        callerInfo: {
          name: 'SBI Customer Care',
          number: '+91-1800-123-456',
          isSpoof: true
        },
        dialogue: [
          {
            speaker: 'caller',
            text: 'Hello! This is Priya from SBI Customer Care. You have earned ₹500 cashback on your recent UPI transactions. To claim this amount, I need to verify your identity.'
          }
        ],
        choices: [
          {
            text: 'Ask for verification of their identity first',
            isCorrect: true,
            explanation: 'Good! Always verify the caller\'s identity before sharing any information.',
            nextStep: 1
          },
          {
            text: 'Provide your UPI PIN immediately',
            isCorrect: false,
            explanation: 'Never share your UPI PIN with anyone! Banks never ask for PINs over phone calls.',
            consequence: 'You just shared sensitive information with a fraudster!',
            nextStep: 4
          },
          {
            text: 'Ask them to send verification via official app',
            isCorrect: true,
            explanation: 'Excellent! Legitimate banks can send notifications through their official apps.',
            nextStep: 2
          },
          {
            text: 'Hang up immediately',
            isCorrect: true,
            explanation: 'Safe choice! When in doubt, it\'s better to end the call and verify independently.',
            nextStep: 3
          }
        ]
      },
      {
        id: 'verification-request',
        title: 'Requesting Verification',
        description: 'You ask the caller to verify their identity.',
        dialogue: [
          {
            speaker: 'user',
            text: 'Can you please verify your identity? What is my account balance?'
          },
          {
            speaker: 'caller',
            text: 'Sir, for security reasons, I cannot share account details over phone. I just need your UPI PIN to process the cashback. This is a time-limited offer!'
          }
        ],
        choices: [
          {
            text: 'End the call - real banks know your balance',
            isCorrect: true,
            explanation: 'Correct! Real bank representatives can verify your details without asking for sensitive information.',
            nextStep: 3
          },
          {
            text: 'Give them your UPI PIN',
            isCorrect: false,
            explanation: 'Wrong! Never share your UPI PIN. This is definitely a scam.',
            nextStep: 4
          },
          {
            text: 'Ask them to call back later',
            isCorrect: false,
            explanation: 'This gives them another opportunity to scam you. Better to end the call permanently.',
            nextStep: 4
          }
        ]
      },
      {
        id: 'app-verification',
        title: 'App Verification Request',
        description: 'You asked them to send verification through the official app.',
        dialogue: [
          {
            speaker: 'caller',
            text: 'Sir, our app is under maintenance. I can quickly process this over phone. Just share your UPI PIN and we\'ll credit ₹500 immediately!'
          }
        ],
        choices: [
          {
            text: 'Hang up - apps aren\'t down for cashback processing',
            isCorrect: true,
            explanation: 'Smart! App maintenance doesn\'t prevent legitimate cashback processing.',
            nextStep: 3
          },
          {
            text: 'Share your UPI PIN',
            isCorrect: false,
            explanation: 'Never share your PIN! This is clearly a fraud attempt.',
            nextStep: 4
          }
        ]
      },
      {
        id: 'safe-ending',
        title: 'Safe Resolution',
        description: 'You made the right choice by ending the call.',
        dialogue: [
          {
            speaker: 'narrator',
            text: 'You hung up and called your bank\'s official customer care number. They confirmed that no cashback program was running and no calls were made from their end. You successfully avoided a UPI fraud!'
          }
        ],
        choices: [
          {
            text: 'Scenario completed successfully',
            isCorrect: true,
            explanation: 'Excellent work! You protected yourself from a common UPI fraud.',
            nextStep: null
          }
        ]
      },
      {
        id: 'fraud-consequence',
        title: 'Fraud Victim',
        description: 'You fell victim to the fraud.',
        dialogue: [
          {
            speaker: 'narrator',
            text: 'Within minutes of sharing your UPI PIN, unauthorized transactions started appearing on your account. The fraudster has stolen your money using your PIN!'
          }
        ],
        choices: [
          {
            text: 'Lesson learned',
            isCorrect: false,
            explanation: 'Remember: Never share UPI PIN, even with people claiming to be from your bank.',
            nextStep: null
          }
        ]
      }
    ],
    keyTakeaways: [
      'Banks never ask for UPI PIN over phone calls',
      'Always verify caller identity by asking questions only your bank would know',
      'Legitimate offers can be verified through official apps or by calling back',
      'When in doubt, hang up and call the official customer care number',
      'Cashback offers that require PIN sharing are always fraudulent'
    ]
  },

  'payment-request-confusion': {
    title: 'Payment Request vs Payment Flow',
    type: 'upi-interface',
    description: 'Learn to distinguish between requesting money and sending money in UPI apps.',
    steps: [
      {
        id: 'upi-home',
        title: 'UPI App Home Screen',
        description: 'You want to send ₹500 to your friend Rahul for dinner.',
        interface: 'upi-home',
        balance: '₹2,847',
        choices: [
          {
            text: 'Tap on "Send Money"',
            isCorrect: true,
            explanation: 'Correct! To send money, use the Send Money option.',
            nextStep: 1
          },
          {
            text: 'Tap on "Request Money"',
            isCorrect: false,
            explanation: 'Wrong! Request Money asks others to send you money, not the opposite.',
            nextStep: 2
          }
        ]
      },
      {
        id: 'send-money-flow',
        title: 'Send Money Screen',
        description: 'You\'re now in the send money flow.',
        interface: 'send-money',
        choices: [
          {
            text: 'Enter ₹500 and Rahul\'s UPI ID',
            isCorrect: true,
            explanation: 'Perfect! This is how you send money to someone.',
            nextStep: 3
          },
          {
            text: 'Look for request option',
            isCorrect: false,
            explanation: 'You\'re already in the right flow to send money.',
            nextStep: 1
          }
        ]
      },
      {
        id: 'request-money-mistake',
        title: 'Request Money Screen',
        description: 'You accidentally opened the request money feature.',
        interface: 'request-money',
        choices: [
          {
            text: 'Go back and select "Send Money"',
            isCorrect: true,
            explanation: 'Good catch! Request Money would ask Rahul to send you money instead.',
            nextStep: 1
          },
          {
            text: 'Continue with request for ₹500',
            isCorrect: false,
            explanation: 'This would ask Rahul to pay you ₹500, not the other way around!',
            nextStep: 4
          }
        ]
      },
      {
        id: 'payment-confirmation',
        title: 'Payment Confirmation',
        description: 'You\'re about to send ₹500 to Rahul.',
        interface: 'payment-confirm',
        amount: '₹500',
        recipient: 'Rahul Kumar',
        choices: [
          {
            text: 'Enter UPI PIN and confirm',
            isCorrect: true,
            explanation: 'Excellent! You successfully sent money to your friend.',
            nextStep: null
          },
          {
            text: 'Cancel and double-check',
            isCorrect: true,
            explanation: 'Good practice! Always verify details before confirming payments.',
            nextStep: 1
          }
        ]
      },
      {
        id: 'wrong-request-sent',
        title: 'Wrong Request Sent',
        description: 'You sent a payment request instead of sending money.',
        interface: 'request-sent',
        choices: [
          {
            text: 'Cancel the request and send money properly',
            isCorrect: true,
            explanation: 'Good! You corrected your mistake before Rahul paid unnecessarily.',
            nextStep: 1
          }
        ]
      }
    ],
    keyTakeaways: [
      'Send Money = You pay someone',
      'Request Money = You ask someone to pay you',
      'Always double-check the flow before entering amount',
      'Verify recipient details before confirming',
      'Cancel and restart if you choose the wrong option'
    ]
  },

  'fake-bank-call': {
    title: 'Fake Bank Representative Call',
    type: 'phone-call',
    description: 'A caller claims to be from your bank asking for sensitive information.',
    steps: [
      {
        id: 'bank-call',
        title: 'Bank Representative Call',
        description: 'You receive a call from someone claiming to be from your bank.',
        callerInfo: {
          name: 'HDFC Customer Care',
          number: '+91-9876543210',
          isSpoof: true
        },
        dialogue: [
          {
            speaker: 'caller',
            text: 'Hello, this is Amit from HDFC Bank security department. We have detected suspicious activity on your account. I need to verify your details to secure your account.'
          }
        ],
        choices: [
          {
            text: 'Ask what specific suspicious activity was detected',
            isCorrect: true,
            explanation: 'Good! Legitimate banks can provide specific details about security concerns.',
            nextStep: 1
          },
          {
            text: 'Immediately provide your debit card details',
            isCorrect: false,
            explanation: 'Never share card details over phone! Banks already have this information.',
            nextStep: 3
          },
          {
            text: 'Hang up and call the official bank number',
            isCorrect: true,
            explanation: 'Excellent! This is the safest way to verify if the call is legitimate.',
            nextStep: 2
          }
        ]
      },
      {
        id: 'asking-details',
        title: 'Asking for Specifics',
        description: 'You ask for details about the suspicious activity.',
        dialogue: [
          {
            speaker: 'caller',
            text: 'Sir, I cannot share details over phone for security reasons. I just need your card number and CVV to block suspicious transactions immediately!'
          }
        ],
        choices: [
          {
            text: 'Realize this is a scam and hang up',
            isCorrect: true,
            explanation: 'Correct! Real banks never ask for CVV or full card numbers.',
            nextStep: 2
          },
          {
            text: 'Provide the requested details',
            isCorrect: false,
            explanation: 'Wrong! You just gave your card details to a fraudster.',
            nextStep: 3
          }
        ]
      },
      {
        id: 'safe-verification',
        title: 'Safe Verification',
        description: 'You called the official bank number to verify.',
        dialogue: [
          {
            speaker: 'narrator',
            text: 'You called the official HDFC customer care. They confirmed no suspicious activity was detected and no calls were made from their security department. You avoided a banking fraud!'
          }
        ],
        choices: [
          {
            text: 'Report the fraudulent call',
            isCorrect: true,
            explanation: 'Excellent! Reporting helps protect others from similar scams.',
            nextStep: null
          }
        ]
      },
      {
        id: 'fraud-victim',
        title: 'Card Details Compromised',
        description: 'You shared your card details with the fraudster.',
        dialogue: [
          {
            speaker: 'narrator',
            text: 'Your card details have been compromised! Unauthorized transactions may occur. You should immediately block your card and contact your bank.'
          }
        ],
        choices: [
          {
            text: 'Lesson learned',
            isCorrect: false,
            explanation: 'Remember: Banks never ask for complete card details or CVV over phone.',
            nextStep: null
          }
        ]
      }
    ],
    keyTakeaways: [
      'Banks never ask for complete card numbers or CVV over phone',
      'Always verify calls by hanging up and calling official numbers',
      'Legitimate security alerts can be verified through official channels',
      'If caller refuses to provide specific details, it\'s likely a scam',
      'Report fraudulent calls to help protect others'
    ]
  },

  'fake-kyc-sms': {
    title: 'Fake KYC Update SMS',
    type: 'sms-interface',
    description: 'You receive an SMS claiming your KYC will expire with a suspicious link.',
    steps: [
      {
        id: 'kyc-sms',
        title: 'KYC Expiry SMS',
        description: 'You receive an SMS about KYC expiry.',
        interface: 'sms-screen',
        smsData: {
          sender: 'SBIKYC',
          time: '2:47 PM',
          message: 'Dear Customer, Your KYC will expire in 24 hours. Update immediately to avoid account blocking. Click: bit.ly/sbi-kyc-urgent'
        },
        choices: [
          {
            text: 'Click the link immediately',
            isCorrect: false,
            explanation: 'Dangerous! Clicking suspicious links can lead to phishing websites.',
            nextStep: 3
          },
          {
            text: 'Check the sender and link carefully',
            isCorrect: true,
            explanation: 'Good! Always verify sender information and link authenticity.',
            nextStep: 1
          },
          {
            text: 'Visit bank branch or official website',
            isCorrect: true,
            explanation: 'Excellent! Official channels are the safest way to verify KYC status.',
            nextStep: 2
          },
          {
            text: 'Delete the SMS without action',
            isCorrect: true,
            explanation: 'Safe choice! When in doubt, ignore suspicious messages.',
            nextStep: 2
          }
        ]
      },
      {
        id: 'analyzing-sms',
        title: 'Analyzing the SMS',
        description: 'You examine the SMS more carefully.',
        interface: 'sms-analysis',
        redFlags: [
          'Shortened URL (bit.ly) - banks use official domains',
          'Urgent language creating pressure',
          'Generic greeting "Dear Customer"',
          'Threatening account blocking'
        ],
        choices: [
          {
            text: 'Recognize red flags and ignore SMS',
            isCorrect: true,
            explanation: 'Perfect! You identified multiple fraud indicators.',
            nextStep: 2
          },
          {
            text: 'Still click the link',
            isCorrect: false,
            explanation: 'Even after analysis, clicking the link is dangerous!',
            nextStep: 3
          }
        ]
      },
      {
        id: 'safe-verification',
        title: 'Official Verification',
        description: 'You check through official channels.',
        dialogue: [
          {
            speaker: 'narrator',
            text: 'You visited your bank branch and checked your KYC status. It was completely up to date! The SMS was indeed a phishing attempt to steal your banking credentials.'
          }
        ],
        choices: [
          {
            text: 'Report the fraud SMS',
            isCorrect: true,
            explanation: 'Excellent! Reporting helps authorities track and stop such scams.',
            nextStep: null
          }
        ]
      },
      {
        id: 'phishing-site',
        title: 'Phishing Website',
        description: 'You clicked the malicious link.',
        interface: 'fake-banking-site',
        dialogue: [
          {
            speaker: 'narrator',
            text: 'The link took you to a fake banking website asking for your login credentials, card details, and OTP. This is a phishing attempt!'
          }
        ],
        choices: [
          {
            text: 'Close the website immediately',
            isCorrect: true,
            explanation: 'Good recovery! Don\'t enter any information on suspicious websites.',
            nextStep: 2
          },
          {
            text: 'Enter your banking details',
            isCorrect: false,
            explanation: 'Critical mistake! You\'ve given fraudsters access to your account.',
            nextStep: 4
          }
        ]
      },
      {
        id: 'account-compromised',
        title: 'Account Compromised',
        description: 'Your banking details have been stolen.',
        dialogue: [
          {
            speaker: 'narrator',
            text: 'By entering your details on the fake website, fraudsters now have access to your banking credentials. Unauthorized transactions may follow!'
          }
        ],
        choices: [
          {
            text: 'Lesson learned',
            isCorrect: false,
            explanation: 'Remember: Never click suspicious links or enter details on unverified websites.',
            nextStep: null
          }
        ]
      }
    ],
    keyTakeaways: [
      'Banks never send KYC update links via SMS',
      'Always verify KYC status through official websites or branches',
      'Shortened URLs (bit.ly, tinyurl) are red flags in banking SMS',
      'Urgent language and threats are common fraud tactics',
      'Report suspicious SMS to help others avoid similar scams'
    ]
  },

  'caller-id-spoofing': {
    title: 'Caller ID Spoofing Demo',
    type: 'education',
    description: 'Learn how scammers can fake official phone numbers and how to protect yourself.',
    steps: [
      {
        id: 'spoofing-intro',
        title: 'What is Caller ID Spoofing?',
        description: 'Understanding how scammers fake phone numbers.',
        interface: 'education-screen',
        content: {
          title: 'Caller ID Spoofing Explained',
          sections: [
            {
              heading: 'What is Caller ID Spoofing?',
              text: 'Caller ID spoofing is when scammers use technology to make their phone number appear as a different number on your caller ID. They can make it look like they\'re calling from your bank, government agencies, or other trusted organizations.',
              image: '📞'
            },
            {
              heading: 'How It Works',
              text: 'Scammers use special software or services that allow them to change the number that appears on your phone. They can display any number they want, including official bank numbers.',
              image: '🔧'
            }
          ]
        },
        choices: [
          {
            text: 'Continue to see examples',
            isCorrect: true,
            explanation: 'Good! Let\'s see some real examples of how this works.',
            nextStep: 1
          }
        ]
      },
      {
        id: 'spoofing-examples',
        title: 'Real Examples',
        description: 'See how scammers can fake different types of numbers.',
        interface: 'comparison-screen',
        examples: [
          {
            original: '+91-1800-123-456',
            spoofed: '+91-1800-123-456',
            description: 'Bank customer care number - looks identical!',
            risk: 'High'
          },
          {
            original: '+91-9876543210',
            spoofed: '+91-9876543210',
            description: 'Personal number - can be spoofed to look like someone you know',
            risk: 'Medium'
          },
          {
            original: '100',
            spoofed: '100',
            description: 'Emergency numbers - scammers can fake police numbers',
            risk: 'Very High'
          }
        ],
        choices: [
          {
            text: 'Learn how to verify calls',
            isCorrect: true,
            explanation: 'Excellent! Now let\'s learn how to protect yourself.',
            nextStep: 2
          }
        ]
      },
      {
        id: 'verification-methods',
        title: 'How to Verify Calls',
        description: 'Learn safe methods to verify if a call is legitimate.',
        interface: 'tips-screen',
        verificationMethods: [
          {
            method: 'Hang Up and Call Back',
            description: 'End the call and dial the official number yourself. Never call back the number that called you.',
            icon: '📞'
          },
          {
            method: 'Ask Specific Questions',
            description: 'Ask questions only your bank would know, like your last transaction amount or account balance.',
            icon: '❓'
          },
          {
            method: 'Check Official Sources',
            description: 'Visit the official website or app to verify any claims made over the phone.',
            icon: '🌐'
          },
          {
            method: 'Never Share Sensitive Info',
            description: 'Banks never ask for PINs, passwords, or full card numbers over phone calls.',
            icon: '🔒'
          }
        ],
        choices: [
          {
            text: 'Practice with a scenario',
            isCorrect: true,
            explanation: 'Great! Let\'s practice what you\'ve learned.',
            nextStep: 3
          }
        ]
      },
      {
        id: 'practice-scenario',
        title: 'Practice Scenario',
        description: 'You receive a call from your bank\'s number.',
        callerInfo: {
          name: 'SBI Customer Care',
          number: '+91-1800-123-456',
          isSpoof: true
        },
        dialogue: [
          {
            speaker: 'caller',
            text: 'Hello! This is Priya from SBI. We need to verify your account details due to suspicious activity. Can you confirm your debit card number?'
          }
        ],
        choices: [
          {
            text: 'Provide your card number immediately',
            isCorrect: false,
            explanation: 'Wrong! Even if the number looks official, never share card details over phone.',
            nextStep: 4
          },
          {
            text: 'Ask for their employee ID and hang up',
            isCorrect: true,
            explanation: 'Good! Asking for verification and ending the call is safe.',
            nextStep: 5
          },
          {
            text: 'Call back the official number',
            isCorrect: true,
            explanation: 'Excellent! This is the safest way to verify.',
            nextStep: 5
          },
          {
            text: 'Ask what specific suspicious activity',
            isCorrect: true,
            explanation: 'Good approach! Legitimate banks can provide specific details.',
            nextStep: 6
          }
        ]
      },
      {
        id: 'wrong-choice',
        title: 'You Shared Your Details',
        description: 'You provided your card number to the caller.',
        dialogue: [
          {
            speaker: 'narrator',
            text: 'You just shared your card details with a fraudster! Even though the number looked official, it was spoofed. Your card may now be compromised.'
          }
        ],
        choices: [
          {
            text: 'Learn from this mistake',
            isCorrect: false,
            explanation: 'Remember: Never share card details over phone, regardless of the caller ID.',
            nextStep: 7
          }
        ]
      },
      {
        id: 'safe-resolution',
        title: 'Safe Resolution',
        description: 'You handled the call safely.',
        dialogue: [
          {
            speaker: 'narrator',
            text: 'You called the official SBI number and they confirmed no suspicious activity was detected. You successfully avoided a spoofing scam!'
          }
        ],
        choices: [
          {
            text: 'Report the spoofed call',
            isCorrect: true,
            explanation: 'Excellent! Reporting helps authorities track spoofing attempts.',
            nextStep: 7
          }
        ]
      },
      {
        id: 'asking-details',
        title: 'Asking for Specifics',
        description: 'You asked for details about the suspicious activity.',
        dialogue: [
          {
            speaker: 'caller',
            text: 'Sir, I cannot share details over phone for security reasons. I just need your card number and CVV to block suspicious transactions immediately!'
          }
        ],
        choices: [
          {
            text: 'Realize this is a scam and hang up',
            isCorrect: true,
            explanation: 'Perfect! Real banks never ask for CVV or full card numbers.',
            nextStep: 5
          },
          {
            text: 'Provide the requested details',
            isCorrect: false,
            explanation: 'Wrong! You just gave your card details to a fraudster.',
            nextStep: 4
          }
        ]
      },
      {
        id: 'final-lesson',
        title: 'Key Takeaways',
        description: 'Summary of what you learned about caller ID spoofing.',
        interface: 'summary-screen',
        keyPoints: [
          'Caller ID can be easily faked - never trust it completely',
          'Always hang up and call the official number yourself',
          'Banks never ask for PINs, CVV, or full card numbers over phone',
          'Ask specific questions only your bank would know',
          'Report spoofed calls to help protect others'
        ],
        choices: [
          {
            text: 'Scenario completed',
            isCorrect: true,
            explanation: 'Excellent! You now understand how caller ID spoofing works and how to protect yourself.',
            nextStep: null
          }
        ]
      }
    ],
    keyTakeaways: [
      'Caller ID can be easily spoofed - never trust it completely',
      'Always hang up and call the official number yourself',
      'Banks never ask for PINs, CVV, or full card numbers over phone',
      'Ask specific questions only your bank would know',
      'Report spoofed calls to help protect others'
    ]
  },

  'real-vs-fake-links': {
    title: 'Real vs Fake Banking Links',
    type: 'education',
    description: 'Learn how to identify legitimate banking websites from phishing sites.',
    steps: [
      {
        id: 'links-intro',
        title: 'Why Banking Links Matter',
        description: 'Understanding the importance of verifying banking URLs.',
        interface: 'education-screen',
        content: {
          title: 'Banking Link Security',
          sections: [
            {
              heading: 'The Threat',
              text: 'Phishing websites can look almost identical to real banking sites. Scammers create fake URLs that appear legitimate to steal your login credentials and banking information.',
              image: '🎣'
            },
            {
              heading: 'The Risk',
              text: 'Entering your details on a fake banking website gives fraudsters complete access to your account, leading to unauthorized transactions and financial loss.',
              image: '💰'
            }
          ]
        },
        choices: [
          {
            text: 'Learn URL analysis techniques',
            isCorrect: true,
            explanation: 'Great! Let\'s learn how to analyze URLs safely.',
            nextStep: 1
          }
        ]
      },
      {
        id: 'url-analysis',
        title: 'URL Analysis Techniques',
        description: 'Learn how to examine URLs for signs of fraud.',
        interface: 'tips-screen',
        verificationMethods: [
          {
            method: 'Check the Domain',
            description: 'Look for the official bank domain (e.g., sbi.co.in, hdfcbank.com). Be wary of slight variations.',
            icon: '🔍'
          },
          {
            method: 'Look for HTTPS',
            description: 'Legitimate banking sites always use HTTPS (secure connection). Never enter details on HTTP sites.',
            icon: '🔒'
          },
          {
            method: 'Examine the Path',
            description: 'Check the full URL path. Fake sites often have suspicious subdomains or paths.',
            icon: '📁'
          },
          {
            method: 'Avoid Shortened URLs',
            description: 'Never click on shortened links (bit.ly, tinyurl) in banking communications.',
            icon: '⚠️'
          }
        ],
        choices: [
          {
            text: 'Practice with real examples',
            isCorrect: true,
            explanation: 'Excellent! Let\'s practice with real examples.',
            nextStep: 2
          }
        ]
      },
      {
        id: 'real-examples',
        title: 'Real vs Fake Examples',
        description: 'Compare legitimate and fraudulent banking URLs.',
        interface: 'comparison-screen',
        examples: [
          {
            original: 'https://www.sbi.co.in',
            spoofed: 'https://sbi-kyc.verify-now.com',
            description: 'Official SBI domain vs fake subdomain',
            risk: 'High'
          },
          {
            original: 'https://www.hdfcbank.com',
            spoofed: 'https://hdfcbank-secure.com',
            description: 'Official HDFC vs fake domain',
            risk: 'Very High'
          },
          {
            original: 'https://www.icicibank.com',
            spoofed: 'http://icicibank-login.com',
            description: 'HTTPS vs HTTP (insecure)',
            risk: 'Very High'
          }
        ],
        choices: [
          {
            text: 'Learn security indicators',
            isCorrect: true,
            explanation: 'Good! Now let\'s learn about security indicators.',
            nextStep: 3
          }
        ]
      },
      {
        id: 'security-indicators',
        title: 'Security Indicators',
        description: 'Learn to identify legitimate banking websites.',
        interface: 'education-screen',
        content: {
          title: 'How to Spot Legitimate Banking Sites',
          sections: [
            {
              heading: 'SSL Certificate',
              text: 'Look for the padlock icon (🔒) in the address bar. This indicates a secure connection.',
              image: '🔒'
            },
            {
              heading: 'Official Domain',
              text: 'The URL should match the bank\'s official website exactly. Be careful of slight misspellings.',
              image: '🌐'
            },
            {
              heading: 'Professional Design',
              text: 'Legitimate banking sites have professional, polished designs. Poor design can indicate fraud.',
              image: '🎨'
            },
            {
              heading: 'Contact Information',
              text: 'Real banks provide clear contact information and customer support details.',
              image: '📞'
            }
          ]
        },
        choices: [
          {
            text: 'Practice identifying fake sites',
            isCorrect: true,
            explanation: 'Great! Let\'s practice identifying fake banking sites.',
            nextStep: 4
          }
        ]
      },
      {
        id: 'practice-identification',
        title: 'Practice: Identify the Fake',
        description: 'You receive an SMS with a banking link.',
        interface: 'sms-screen',
        smsData: {
          sender: 'SBIKYC',
          time: '3:15 PM',
          message: 'Your KYC needs immediate update. Click here: bit.ly/sbi-kyc-urgent'
        },
        choices: [
          {
            text: 'Click the link immediately',
            isCorrect: false,
            explanation: 'Wrong! Shortened URLs (bit.ly) are a major red flag in banking communications.',
            nextStep: 6
          },
          {
            text: 'Visit the official SBI website',
            isCorrect: true,
            explanation: 'Excellent! Always go to the official website directly.',
            nextStep: 5
          },
          {
            text: 'Check the sender number',
            isCorrect: true,
            explanation: 'Good! Verifying the sender is important, but the shortened URL is still suspicious.',
            nextStep: 5
          },
          {
            text: 'Delete the SMS',
            isCorrect: true,
            explanation: 'Safe choice! When in doubt, ignore suspicious messages.',
            nextStep: 5
          }
        ]
      },
      {
        id: 'safe-verification',
        title: 'Safe Verification',
        description: 'You chose to verify through official channels.',
        dialogue: [
          {
            speaker: 'narrator',
            text: 'You visited the official SBI website and checked your KYC status. It was completely up to date! The SMS was a phishing attempt with a malicious link.'
          }
        ],
        choices: [
          {
            text: 'Report the phishing attempt',
            isCorrect: true,
            explanation: 'Excellent! Reporting helps authorities track and stop these scams.',
            nextStep: 8
          }
        ]
      },
      {
        id: 'clicked-fake-link',
        title: 'You Clicked the Fake Link',
        description: 'You clicked on the suspicious link.',
        interface: 'fake-banking-site',
        dialogue: [
          {
            speaker: 'narrator',
            text: 'The link took you to a fake banking website that looks almost identical to the real SBI site. It\'s asking for your login credentials, card details, and OTP.'
          }
        ],
        choices: [
          {
            text: 'Close the website immediately',
            isCorrect: true,
            explanation: 'Good recovery! Don\'t enter any information on suspicious websites.',
            nextStep: 5
          },
          {
            text: 'Enter your banking details',
            isCorrect: false,
            explanation: 'Critical mistake! You\'ve given fraudsters access to your account.',
            nextStep: 7
          }
        ]
      },
      {
        id: 'account-compromised',
        title: 'Account Compromised',
        description: 'Your banking details have been stolen.',
        dialogue: [
          {
            speaker: 'narrator',
            text: 'By entering your details on the fake website, fraudsters now have access to your banking credentials. Unauthorized transactions may follow!'
          }
        ],
        choices: [
          {
            text: 'Lesson learned',
            isCorrect: false,
            explanation: 'Remember: Never click suspicious links or enter details on unverified websites.',
            nextStep: 8
          }
        ]
      },
      {
        id: 'final-lesson',
        title: 'Key Takeaways',
        description: 'Summary of what you learned about banking link security.',
        interface: 'summary-screen',
        keyPoints: [
          'Always check the domain name carefully for official bank URLs',
          'Look for HTTPS and the padlock icon in the address bar',
          'Never click on shortened URLs (bit.ly, tinyurl) in banking messages',
          'Visit official websites directly instead of clicking links',
          'Report suspicious banking links to help protect others'
        ],
        choices: [
          {
            text: 'Scenario completed',
            isCorrect: true,
            explanation: 'Excellent! You now understand how to identify legitimate banking websites and avoid phishing scams.',
            nextStep: null
          }
        ]
      }
    ],
    keyTakeaways: [
      'Always check the domain name carefully for official bank URLs',
      'Look for HTTPS and the padlock icon in the address bar',
      'Never click on shortened URLs (bit.ly, tinyurl) in banking messages',
      'Visit official websites directly instead of clicking links',
      'Report suspicious banking links to help protect others'
    ]
  },

  'aadhaar-pan-fraud': {
    title: 'Aadhaar/PAN Fraud Detection',
    type: 'education',
    description: 'Learn to protect your identity documents from misuse and fraud.',
    steps: [
      {
        id: 'identity-theft-intro',
        title: 'Identity Document Fraud',
        description: 'Understanding how your Aadhaar and PAN can be misused.',
        interface: 'education-screen',
        content: {
          title: 'Identity Document Security',
          sections: [
            {
              heading: 'The Threat',
              text: 'Fraudsters can use your Aadhaar and PAN details to open fake bank accounts, take loans, or commit financial fraud in your name.',
              image: '🆔'
            },
            {
              heading: 'Common Scams',
              text: 'Scammers often call claiming to be from government agencies, asking for your Aadhaar number, PAN, or OTP for "verification."',
              image: '📞'
            }
          ]
        },
        choices: [
          {
            text: 'Learn protection methods',
            isCorrect: true,
            explanation: 'Great! Let\'s learn how to protect your identity documents.',
            nextStep: 1
          }
        ]
      },
      {
        id: 'protection-methods',
        title: 'How to Protect Your Documents',
        description: 'Learn safe practices for handling identity documents.',
        interface: 'tips-screen',
        verificationMethods: [
          {
            method: 'Never Share OTP',
            description: 'Government agencies never ask for OTP over phone calls. Never share OTP with anyone.',
            icon: '🔐'
          },
          {
            method: 'Verify Caller Identity',
            description: 'Ask for official ID and call back the official number to verify.',
            icon: '📞'
          },
          {
            method: 'Use Masked Aadhaar',
            description: 'Use masked Aadhaar (showing only last 4 digits) when possible.',
            icon: '👁️'
          },
          {
            method: 'Report Suspicious Calls',
            description: 'Report any suspicious calls asking for identity details to authorities.',
            icon: '🚨'
          }
        ],
        choices: [
          {
            text: 'Practice with scenarios',
            isCorrect: true,
            explanation: 'Excellent! Let\'s practice with real scenarios.',
            nextStep: 2
          }
        ]
      },
      {
        id: 'govt-call-scenario',
        title: 'Government Agency Call',
        description: 'You receive a call from someone claiming to be from UIDAI.',
        callerInfo: {
          name: 'UIDAI Support',
          number: '+91-1947-123456',
          isSpoof: true
        },
        dialogue: [
          {
            speaker: 'caller',
            text: 'Hello! This is Rajesh from UIDAI. We need to verify your Aadhaar details. Can you share your Aadhaar number and the OTP we just sent?'
          }
        ],
        choices: [
          {
            text: 'Share your Aadhaar number and OTP',
            isCorrect: false,
            explanation: 'Wrong! Government agencies never ask for OTP over phone calls.',
            nextStep: 4
          },
          {
            text: 'Ask for their employee ID and hang up',
            isCorrect: true,
            explanation: 'Good! Always verify caller identity and never share sensitive details.',
            nextStep: 3
          },
          {
            text: 'Call UIDAI official number to verify',
            isCorrect: true,
            explanation: 'Excellent! This is the safest way to verify if the call is legitimate.',
            nextStep: 3
          }
        ]
      },
      {
        id: 'safe-resolution',
        title: 'Safe Resolution',
        description: 'You handled the call safely.',
        dialogue: [
          {
            speaker: 'narrator',
            text: 'You called the official UIDAI number and they confirmed no verification calls were made. You successfully avoided an identity theft attempt!'
          }
        ],
        choices: [
          {
            text: 'Report the fraudulent call',
            isCorrect: true,
            explanation: 'Excellent! Reporting helps authorities track identity theft attempts.',
            nextStep: 5
          }
        ]
      },
      {
        id: 'identity-compromised',
        title: 'Identity Compromised',
        description: 'You shared your Aadhaar details with the caller.',
        dialogue: [
          {
            speaker: 'narrator',
            text: 'You just shared your Aadhaar details with a fraudster! They can now use your identity for fraudulent activities. Contact UIDAI immediately to report this.'
          }
        ],
        choices: [
          {
            text: 'Contact UIDAI immediately',
            isCorrect: true,
            explanation: 'Good! Report identity theft to UIDAI as soon as possible.',
            nextStep: 5
          }
        ]
      },
      {
        id: 'final-lesson',
        title: 'Key Takeaways',
        description: 'Summary of identity document protection.',
        interface: 'summary-screen',
        keyPoints: [
          'Government agencies never ask for OTP over phone calls',
          'Always verify caller identity by calling official numbers',
          'Use masked Aadhaar when possible to limit exposure',
          'Never share Aadhaar number, PAN, or OTP with callers',
          'Report suspicious calls to help protect others'
        ],
        choices: [
          {
            text: 'Scenario completed',
            isCorrect: true,
            explanation: 'Excellent! You now understand how to protect your identity documents.',
            nextStep: null
          }
        ]
      }
    ],
    keyTakeaways: [
      'Government agencies never ask for OTP over phone calls',
      'Always verify caller identity by calling official numbers',
      'Use masked Aadhaar when possible to limit exposure',
      'Never share Aadhaar number, PAN, or OTP with callers',
      'Report suspicious calls to help protect others'
    ]
  },

  'loan-credit-scam': {
    title: 'Loan/Credit Card Scam Detection',
    type: 'education',
    description: 'Learn to identify and avoid instant loan and credit card frauds.',
    steps: [
      {
        id: 'loan-scam-intro',
        title: 'Loan and Credit Card Frauds',
        description: 'Understanding common loan and credit card scams.',
        interface: 'education-screen',
        content: {
          title: 'Loan & Credit Card Scams',
          sections: [
            {
              heading: 'Instant Loan Scams',
              text: 'Scammers offer "instant loans" with minimal documentation, but require upfront fees or personal details.',
              image: '💰'
            },
            {
              heading: 'Credit Card Frauds',
              text: 'Fraudsters offer "pre-approved" credit cards or ask for card details for "upgrades" or "renewals."',
              image: '💳'
            }
          ]
        },
        choices: [
          {
            text: 'Learn scam patterns',
            isCorrect: true,
            explanation: 'Great! Let\'s learn the common patterns of these scams.',
            nextStep: 1
          }
        ]
      },
      {
        id: 'scam-patterns',
        title: 'Common Scam Patterns',
        description: 'Learn to recognize loan and credit card scam patterns.',
        interface: 'tips-screen',
        verificationMethods: [
          {
            method: 'Upfront Fees',
            description: 'Legitimate banks never ask for processing fees before loan approval.',
            icon: '💸'
          },
          {
            method: 'Pre-approved Cards',
            description: 'Banks don\'t offer credit cards without proper verification and documentation.',
            icon: '🎫'
          },
          {
            method: 'Urgent Deadlines',
            description: 'Scammers create urgency. Real banks give you time to think.',
            icon: '⏰'
          },
          {
            method: 'Personal Details',
            description: 'Never share card details, PIN, or OTP for "upgrades" or "renewals."',
            icon: '🔒'
          }
        ],
        choices: [
          {
            text: 'Practice with scenarios',
            isCorrect: true,
            explanation: 'Excellent! Let\'s practice identifying these scams.',
            nextStep: 2
          }
        ]
      },
      {
        id: 'instant-loan-call',
        title: 'Instant Loan Offer',
        description: 'You receive a call offering instant loan approval.',
        callerInfo: {
          name: 'Quick Loans India',
          number: '+91-9876543210',
          isSpoof: false
        },
        dialogue: [
          {
            speaker: 'caller',
            text: 'Hello! You are pre-approved for ₹5 lakh loan. Just pay ₹2,000 processing fee and we will disburse the loan immediately!'
          }
        ],
        choices: [
          {
            text: 'Pay the processing fee immediately',
            isCorrect: false,
            explanation: 'Wrong! Legitimate banks never ask for upfront fees before loan approval.',
            nextStep: 5
          },
          {
            text: 'Ask for official documentation',
            isCorrect: true,
            explanation: 'Good! Always ask for official documentation and verify through official channels.',
            nextStep: 3
          },
          {
            text: 'Hang up and report',
            isCorrect: true,
            explanation: 'Excellent! This is clearly a scam - legitimate banks don\'t offer instant loans with upfront fees.',
            nextStep: 3
          }
        ]
      },
      {
        id: 'credit-card-upgrade',
        title: 'Credit Card Upgrade Call',
        description: 'Someone calls claiming to upgrade your credit card.',
        callerInfo: {
          name: 'HDFC Card Services',
          number: '+91-1800-123-456',
          isSpoof: true
        },
        dialogue: [
          {
            speaker: 'caller',
            text: 'Hello! This is Priya from HDFC. We are upgrading your credit card. Please share your card number and CVV for verification.'
          }
        ],
        choices: [
          {
            text: 'Share your card details',
            isCorrect: false,
            explanation: 'Wrong! Banks never ask for CVV or full card numbers over phone.',
            nextStep: 5
          },
          {
            text: 'Ask them to send official communication',
            isCorrect: true,
            explanation: 'Good! Legitimate banks send official communications for such requests.',
            nextStep: 4
          },
          {
            text: 'Call the official bank number',
            isCorrect: true,
            explanation: 'Excellent! Always verify through official channels.',
            nextStep: 4
          }
        ]
      },
      {
        id: 'safe-resolution',
        title: 'Safe Resolution',
        description: 'You handled the calls safely.',
        dialogue: [
          {
            speaker: 'narrator',
            text: 'You verified through official channels and confirmed these were scam attempts. You successfully avoided loan and credit card frauds!'
          }
        ],
        choices: [
          {
            text: 'Report the scam attempts',
            isCorrect: true,
            explanation: 'Excellent! Reporting helps authorities track and stop these scams.',
            nextStep: 6
          }
        ]
      },
      {
        id: 'scam-victim',
        title: 'You Fell for the Scam',
        description: 'You paid the processing fee or shared card details.',
        dialogue: [
          {
            speaker: 'narrator',
            text: 'You just lost money to scammers! They will disappear with your money and you won\'t receive any loan or card upgrade.'
          }
        ],
        choices: [
          {
            text: 'Report to police and your bank immediately',
            isCorrect: false,
            explanation: 'Remember: Legitimate banks never ask for upfront fees or card details over the phone. Always call the official bank number printed on your card to verify.',
            consequence: 'Money lost to loan/credit card scam',
            nextStep: null
          }
        ]
      },
      {
        id: 'final-lesson',
        title: 'Key Takeaways',
        description: 'Summary of loan and credit card scam protection.',
        interface: 'summary-screen',
        keyPoints: [
          'Legitimate banks never ask for upfront fees before loan approval',
          'Banks don\'t offer credit cards without proper verification',
          'Never share card details, PIN, or CVV over phone calls',
          'Always verify through official channels and documentation',
          'Report suspicious loan and credit card offers'
        ],
        choices: [
          {
            text: 'Scenario completed',
            isCorrect: true,
            explanation: 'Excellent! You now understand how to avoid loan and credit card scams.',
            nextStep: null
          }
        ]
      }
    ],
    keyTakeaways: [
      'Legitimate banks never ask for upfront fees before loan approval',
      'Banks don\'t offer credit cards without proper verification',
      'Never share card details, PIN, or CVV over phone calls',
      'Always verify through official channels and documentation',
      'Report suspicious loan and credit card offers'
    ]
  },

  'digital-arrest-scam': {
    title: 'Digital Arrest Scam Protection',
    type: 'education',
    description: 'Learn to recognize and respond to fake authority threats.',
    steps: [
      {
        id: 'digital-arrest-intro',
        title: 'Digital Arrest Scams',
        description: 'Understanding fake authority threats and digital arrest scams.',
        interface: 'education-screen',
        content: {
          title: 'Digital Arrest Scam Awareness',
          sections: [
            {
              heading: 'The Scam',
              text: 'Scammers pose as police, CBI, or other authorities and threaten "digital arrest" unless you pay money or share personal details.',
              image: '👮'
            },
            {
              heading: 'The Threat',
              text: 'They create fake arrest warrants, court orders, or legal documents to intimidate victims into compliance.',
              image: '📄'
            }
          ]
        },
        choices: [
          {
            text: 'Learn how to respond',
            isCorrect: true,
            explanation: 'Great! Let\'s learn how to respond to these threats safely.',
            nextStep: 1
          }
        ]
      },
      {
        id: 'response-strategies',
        title: 'How to Respond to Authority Threats',
        description: 'Learn safe strategies for dealing with fake authority calls.',
        interface: 'tips-screen',
        verificationMethods: [
          {
            method: 'Real Authorities Don\'t Call',
            description: 'Real police or government agencies don\'t call to threaten arrest or demand money.',
            icon: '🚫'
          },
          {
            method: 'Ask for Official Documentation',
            description: 'Request official documents and verify through official channels.',
            icon: '📋'
          },
          {
            method: 'Don\'t Share Personal Details',
            description: 'Never share Aadhaar, PAN, bank details, or OTP with callers.',
            icon: '🔒'
          },
          {
            method: 'Contact Real Authorities',
            description: 'If concerned, contact your local police station directly.',
            icon: '📞'
          }
        ],
        choices: [
          {
            text: 'Practice with scenarios',
            isCorrect: true,
            explanation: 'Excellent! Let\'s practice responding to these threats.',
            nextStep: 2
          }
        ]
      },
      {
        id: 'fake-police-call',
        title: 'Fake Police Call',
        description: 'You receive a call from someone claiming to be a police officer.',
        callerInfo: {
          name: 'CBI Officer',
          number: '+91-9876543210',
          isSpoof: true
        },
        dialogue: [
          {
            speaker: 'caller',
            text: 'Hello! This is Inspector Sharma from CBI. We have received a complaint against you for money laundering. You are under digital arrest!'
          }
        ],
        choices: [
          {
            text: 'Panic and follow their instructions',
            isCorrect: false,
            explanation: 'Wrong! Real authorities don\'t call to threaten arrest or demand money.',
            nextStep: 5
          },
          {
            text: 'Ask for official documentation',
            isCorrect: true,
            explanation: 'Good! Always ask for official documentation and verify through proper channels.',
            nextStep: 3
          },
          {
            text: 'Hang up and contact local police',
            isCorrect: true,
            explanation: 'Excellent! This is clearly a scam. Contact your local police station if concerned.',
            nextStep: 3
          }
        ]
      },
      {
        id: 'court-order-threat',
        title: 'Fake Court Order',
        description: 'The caller sends a fake court order document.',
        interface: 'fake-document',
        dialogue: [
          {
            speaker: 'caller',
            text: 'I am sending you the court order. You must pay ₹50,000 immediately or face immediate arrest!'
          }
        ],
        choices: [
          {
            text: 'Pay the demanded amount',
            isCorrect: false,
            explanation: 'Wrong! This is a scam. Real authorities don\'t demand money over phone calls.',
            nextStep: 5
          },
          {
            text: 'Ask to visit the police station',
            isCorrect: true,
            explanation: 'Good! Real authorities would allow you to visit in person.',
            nextStep: 4
          },
          {
            text: 'Contact a lawyer',
            isCorrect: true,
            explanation: 'Excellent! Consulting a lawyer is a good way to verify legal matters.',
            nextStep: 4
          }
        ]
      },
      {
        id: 'safe-resolution',
        title: 'Safe Resolution',
        description: 'You handled the threat safely.',
        dialogue: [
          {
            speaker: 'narrator',
            text: 'You contacted your local police station and they confirmed this was a scam. You successfully avoided a digital arrest fraud!'
          }
        ],
        choices: [
          {
            text: 'Report the scam attempt',
            isCorrect: true,
            explanation: 'Excellent! Reporting helps authorities track and stop these scams.',
            nextStep: 6
          }
        ]
      },
      {
        id: 'scam-victim',
        title: 'You Fell for the Scam',
        description: 'You paid money or shared personal details.',
        dialogue: [
          {
            speaker: 'narrator',
            text: 'You just lost money to scammers! Real authorities never demand money over phone calls or threaten immediate arrest.'
          }
        ],
        choices: [
          {
            text: 'Report to police and block your bank accounts immediately',
            isCorrect: false,
            explanation: 'Remember: Real authorities never demand money over phone calls or threaten arrest. Always verify by visiting your local police station in person.',
            consequence: 'Money lost to digital arrest scam',
            nextStep: null
          }
        ]
      },
      {
        id: 'final-lesson',
        title: 'Key Takeaways',
        description: 'Summary of digital arrest scam protection.',
        interface: 'summary-screen',
        keyPoints: [
          'Real authorities never call to threaten arrest or demand money',
          'Always ask for official documentation and verify through proper channels',
          'Never share personal details or pay money to callers',
          'Contact your local police station if you have concerns',
          'Report suspicious authority calls to help protect others'
        ],
        choices: [
          {
            text: 'Scenario completed',
            isCorrect: true,
            explanation: 'Excellent! You now understand how to respond to fake authority threats.',
            nextStep: null
          }
        ]
      }
    ],
    keyTakeaways: [
      'Real authorities never call to threaten arrest or demand money',
      'Always ask for official documentation and verify through proper channels',
      'Never share personal details or pay money to callers',
      'Contact your local police station if you have concerns',
      'Report suspicious authority calls to help protect others'
    ]
  },

  'qr-code-fraud': {
    title: 'QR Code Payment Fraud',
    type: 'education',
    description: 'Scammers send QR codes claiming you will receive money, but scanning them actually sends money from your account.',
    steps: [
      {
        id: 'setup',
        title: 'The OLX Buyer',
        description: 'You posted your old phone for sale on OLX.',
        situation: 'You listed your phone for ₹8,000 on OLX. A "buyer" messages: "I\'ll pay right now — scan this QR code to receive your ₹8,000." They send you a QR image.',
        content: {
          title: 'How UPI QR Codes Actually Work',
          sections: [
            {
              image: '💳',
              heading: 'Who scans the QR code?',
              text: 'The PAYER scans the QR code. QR codes are generated by the person who wants to RECEIVE money — like a shopkeeper showing you a QR to pay them.'
            },
            {
              image: '🚨',
              heading: 'The Scam',
              text: 'When you scan the QR, your UPI app shows a payment screen — asking YOU to pay. The scammer sets any amount they want. You send money instead of receiving it.'
            }
          ]
        },
        warningSigns: [
          'The buyer sends a QR code instead of asking for your UPI ID',
          'Legitimate buyers send money TO your UPI ID — they never send a QR',
          'You cannot "receive" money by scanning a QR — that is not how UPI works'
        ],
        choices: [
          {
            text: 'Refuse to scan — share my UPI ID and ask the buyer to transfer directly',
            isCorrect: true,
            explanation: 'Correct! A real buyer only needs your UPI ID (like yourname@upi) to send you money. Anyone who sends a QR to "pay you" is a scammer.',
            nextStep: 1
          },
          {
            text: 'Scan the QR code since I need to receive the ₹8,000',
            isCorrect: false,
            explanation: 'Scanning this QR would open a payment screen asking YOU to pay the scammer. Many victims lose money this way on OLX and Facebook Marketplace.',
            nextStep: 2
          }
        ]
      },
      {
        id: 'safe-ending',
        title: 'Scam Avoided',
        description: 'You made the right call.',
        dialogue: [
          {
            speaker: 'narrator',
            text: 'You gave the buyer your UPI ID and asked them to transfer directly. The "buyer" stopped responding immediately — confirming it was a scam. Real buyers have no problem sending money to a UPI ID.'
          }
        ],
        choices: [
          {
            text: 'Scenario completed successfully',
            isCorrect: true,
            explanation: 'Well done! You understood that QR codes are for paying, not receiving. Share this with friends who sell items online.',
            nextStep: null
          }
        ]
      },
      {
        id: 'fraud-consequence',
        title: 'You Were Scammed',
        description: 'Scanning the QR sent money from your account.',
        dialogue: [
          {
            speaker: 'narrator',
            text: '₹8,000 was DEBITED from your account the moment you entered your UPI PIN. The "buyer" vanished. You were a victim of QR code fraud — a scam that targets thousands of sellers on OLX and Instagram every month.'
          }
        ],
        choices: [
          {
            text: 'Understood — report to 1930 and file a police complaint',
            isCorrect: false,
            explanation: 'Remember: To sell anything online, just share your UPI ID. Never scan a QR code to receive money — it will always debit your account.',
            consequence: 'Lost ₹8,000 to QR code fraud',
            nextStep: null
          }
        ]
      }
    ],
    keyTakeaways: [
      'Scanning a QR code always SENDS money — you cannot receive money by scanning',
      'To receive payment, share your UPI ID (e.g. yourname@upi or your phone number)',
      'Any buyer who insists on sending you a QR code is attempting fraud',
      'This scam is rampant on OLX, Facebook Marketplace, and Instagram — warn your family',
      'Report QR code fraud attempts to cybercrime.gov.in or call 1930'
    ]
  },

  'fake-aadhaar-call': {
    title: 'Fake UIDAI Aadhaar Call',
    type: 'phone-call',
    description: 'A caller claims your Aadhaar is linked to criminal activity and demands an OTP to "deactivate" it.',
    steps: [
      {
        id: 'incoming-call',
        title: 'Threatening Call',
        description: 'Your phone rings. Caller ID shows "UIDAI Helpdesk".',
        callerInfo: {
          name: 'UIDAI Helpdesk',
          number: '+91-1947-00000',
          isSpoof: true
        },
        dialogue: [
          {
            speaker: 'caller',
            text: 'I am Senior Officer Suresh from UIDAI Cyber Security Division. Your Aadhaar number is linked to 4 bank accounts used in money laundering. You are legally obligated to share the OTP you receive now to deactivate your Aadhaar — or you will be arrested within 2 hours.'
          }
        ],
        choices: [
          {
            text: 'Hang up and call the official UIDAI helpline 1947 to verify',
            isCorrect: true,
            explanation: 'Perfect. UIDAI\'s real helpline is 1947. Call them directly to confirm — they will tell you no such action was initiated.',
            nextStep: 2
          },
          {
            text: 'Share the OTP to deactivate my Aadhaar and avoid arrest',
            isCorrect: false,
            explanation: 'UIDAI never asks for OTPs over phone calls to deactivate Aadhaar. Sharing an OTP with this caller would give them access to your accounts.',
            nextStep: 3
          },
          {
            text: 'Ask for their employee ID and official documentation',
            isCorrect: true,
            explanation: 'Good instinct. Asking for verifiable credentials stalls the scammer. Real officials welcome verification.',
            nextStep: 1
          }
        ]
      },
      {
        id: 'verification-attempt',
        title: 'Caller Gets Aggressive',
        description: 'You asked for their credentials.',
        dialogue: [
          {
            speaker: 'caller',
            text: 'My badge number is GVT-29841. There is no time for paperwork — this is a cyber emergency! If you do not share the OTP in the next 5 minutes, police will come to your home. Your family will be embarrassed!'
          }
        ],
        choices: [
          {
            text: 'Hang up immediately — real officials do not threaten or rush you',
            isCorrect: true,
            explanation: 'Correct. Threats and artificial urgency are the two biggest signs of a scam. Real government officials send written notices and follow proper legal procedures.',
            nextStep: 2
          },
          {
            text: 'Share the OTP to stop the harassment',
            isCorrect: false,
            explanation: 'The threats are designed to make you panic and act without thinking. Sharing the OTP will not stop anything — it will give them access to your accounts.',
            nextStep: 3
          }
        ]
      },
      {
        id: 'safe-ending',
        title: 'Threat Identified',
        description: 'You protected yourself.',
        dialogue: [
          {
            speaker: 'narrator',
            text: 'You hung up and called UIDAI\'s official helpline (1947). They confirmed that no action was being taken against your Aadhaar and that UIDAI never calls citizens asking for OTPs. You reported the scam call to cybercrime.gov.in.'
          }
        ],
        choices: [
          {
            text: 'Scenario completed successfully',
            isCorrect: true,
            explanation: 'Excellent! You stayed calm under pressure and verified through official channels. That is the correct response every time.',
            nextStep: null
          }
        ]
      },
      {
        id: 'fraud-consequence',
        title: 'Aadhaar Compromised',
        description: 'You shared the OTP.',
        dialogue: [
          {
            speaker: 'narrator',
            text: 'The OTP you shared was a bank transaction OTP — the scammer immediately used it to transfer money from your account. Your Aadhaar was never at risk; this was purely a fraud call designed to panic you into sharing financial access.'
          }
        ],
        choices: [
          {
            text: 'Report to 1930 and block your bank accounts immediately',
            isCorrect: false,
            explanation: 'Key lesson: UIDAI never deactivates Aadhaar via OTP on a phone call. Any OTP you receive belongs to a financial or account transaction, not an Aadhaar process.',
            consequence: 'Bank account accessed via shared OTP',
            nextStep: null
          }
        ]
      }
    ],
    keyTakeaways: [
      'UIDAI never calls citizens to deactivate Aadhaar or ask for OTPs',
      'No government official will threaten phone arrest — this is not a real legal concept',
      'The official UIDAI helpline is 1947 — always verify by calling that number back',
      'Any OTP on your phone is for a financial transaction — never share it with anyone',
      'Time pressure and threats are deliberate tactics to stop you from thinking clearly'
    ]
  },

  'fake-loan-sms': {
    title: 'Fake Pre-Approved Loan SMS',
    type: 'sms-interface',
    description: 'An SMS claims you have a pre-approved personal loan at 0% interest with no documents needed.',
    steps: [
      {
        id: 'loan-sms',
        title: 'Suspicious Loan SMS',
        description: 'You receive an unsolicited SMS about a loan offer.',
        interface: 'sms-screen',
        smsData: {
          sender: 'LN-FASTCSH',
          time: '11:47 AM',
          message: 'Congratulations! You have a Pre-Approved Personal Loan of ₹5,00,000 at 0% interest! No documents, no CIBIL check needed. Offer expires in 24 hrs. Claim now: bit.ly/fast-loan-now | Helpline: 9876543210'
        },
        choices: [
          {
            text: 'Click the link to apply — 0% interest sounds great',
            isCorrect: false,
            explanation: 'No legitimate bank or NBFC offers ₹5 lakh loans at 0% interest via an unsolicited SMS. Clicking this link would take you to a phishing site to steal your Aadhaar, PAN, and bank details.',
            nextStep: 3
          },
          {
            text: 'Call the helpline number to confirm',
            isCorrect: false,
            explanation: 'The helpline is run by the scammers. Calling it lets them further manipulate you and collect your personal details over phone.',
            nextStep: 3
          },
          {
            text: 'Analyse the SMS for red flags before doing anything',
            isCorrect: true,
            explanation: 'Good instinct. Always analyse before acting — especially on financial messages.',
            nextStep: 1
          }
        ]
      },
      {
        id: 'red-flag-analysis',
        title: 'Red Flag Analysis',
        description: 'Looking closer at the SMS.',
        interface: 'sms-analysis',
        smsData: {
          message: 'Congratulations! You have a Pre-Approved Personal Loan of ₹5,00,000 at 0% interest! No documents, no CIBIL check needed. Offer expires in 24 hrs. Claim now: bit.ly/fast-loan-now | Helpline: 9876543210'
        },
        redFlags: [
          'Unsolicited SMS — you never applied for a loan',
          '0% interest on a ₹5 lakh loan is financially impossible for any legitimate lender',
          '"No documents, no CIBIL check" — real loans require KYC verification by RBI regulations',
          'Shortened URL (bit.ly) instead of the lender\'s official domain',
          'No bank or NBFC name mentioned — who is actually offering this loan?',
          'Artificial urgency: "expires in 24 hrs" pressures you to act without thinking',
          'Unknown mobile number as helpline instead of a registered customer care number'
        ],
        choices: [
          {
            text: 'Block the number, delete the SMS, and report it as spam',
            isCorrect: true,
            explanation: 'Exactly right. Seven red flags in one SMS. Real loan offers come from banks you have a relationship with, through their official app or branch.',
            nextStep: 2
          },
          {
            text: 'The offer sounds too good to miss — click the link',
            isCorrect: false,
            explanation: 'If an offer sounds too good to be true, it is a scam. No legitimate lender offers ₹5 lakh at 0% with no documentation.',
            nextStep: 3
          }
        ]
      },
      {
        id: 'safe-ending',
        title: 'Scam Identified',
        description: 'You protected your financial information.',
        dialogue: [
          {
            speaker: 'narrator',
            text: 'You blocked the number and reported the SMS. If you ever need a personal loan, visit your bank\'s official branch or type their verified website URL directly — never click links in unsolicited messages.'
          }
        ],
        choices: [
          {
            text: 'Scenario completed successfully',
            isCorrect: true,
            explanation: 'Well done. Loan SMS scams are one of the most common frauds in India. Your ability to spot the red flags protects your identity and finances.',
            nextStep: null
          }
        ]
      },
      {
        id: 'fraud-consequence',
        title: 'Personal Data Stolen',
        description: 'Clicking the link led to a phishing site.',
        dialogue: [
          {
            speaker: 'narrator',
            text: 'The link took you to a fake website that looked like a real bank. You entered your Aadhaar, PAN, and bank account details to "verify" your loan. Scammers used this data to take fraudulent loans in your name and drain your savings account.'
          }
        ],
        choices: [
          {
            text: 'Report to 1930 and freeze your accounts at the bank immediately',
            isCorrect: false,
            explanation: 'Important: If you ever enter details on a suspicious site, immediately call your bank, freeze accounts, and report to cybercrime.gov.in (1930).',
            consequence: 'Identity used for fraudulent loans',
            nextStep: null
          }
        ]
      }
    ],
    keyTakeaways: [
      'No legitimate bank or NBFC offers large loans at 0% interest via unsolicited SMS',
      'Real loans require KYC, CIBIL checks, and documentation — "no documents needed" is always a scam',
      'Never click shortened URLs (bit.ly, tinyurl) in financial SMS messages',
      'If you need a loan, visit your bank branch or type the verified URL yourself',
      'Report loan SMS scams to cybercrime.gov.in or call the national helpline 1930'
    ]
  },

  'digital-arrest-call': {
    title: 'Digital Arrest Phone Scam',
    type: 'phone-call',
    description: 'A caller claiming to be from CBI says you are under "digital arrest" for money laundering and demands an immediate payment.',
    steps: [
      {
        id: 'threatening-call',
        title: 'The "CBI" Call',
        description: 'An official-sounding caller threatens immediate arrest.',
        callerInfo: {
          name: 'CBI Cyber Crime Division',
          number: '+91-11-2436-0000',
          isSpoof: true
        },
        dialogue: [
          {
            speaker: 'caller',
            text: 'I am Deputy Superintendent Rajeev Kapoor from CBI Cyber Crime Division. Your mobile number is linked to a ₹47 crore money laundering network. You are now under Digital Arrest. Do NOT disconnect this call, do NOT contact anyone, or you will be physically arrested within 45 minutes.'
          }
        ],
        choices: [
          {
            text: 'Stay calm and disconnect — "digital arrest" is not a real legal concept',
            isCorrect: true,
            explanation: 'Correct. "Digital arrest" does not exist in Indian law. No government agency can arrest you over a phone call or order you to stay on the line.',
            nextStep: 3
          },
          {
            text: 'Stay on the call — disconnecting might make things worse',
            isCorrect: false,
            explanation: 'This is exactly what the scammer wants. The longer you stay on the call, the more pressure they apply to extract money or personal information.',
            nextStep: 1
          },
          {
            text: 'Ask for their badge number to verify and call CBI back',
            isCorrect: true,
            explanation: 'Good instinct. Real CBI officers will not object to independent verification. Scammers will panic and escalate threats when you try to verify.',
            nextStep: 2
          }
        ]
      },
      {
        id: 'escalation',
        title: 'Demanding Money',
        description: 'The caller demands a "security deposit".',
        dialogue: [
          {
            speaker: 'caller',
            text: 'To prove your innocence during the investigation, you must transfer ₹75,000 as a security deposit to our designated government escrow account. This amount will be returned in 48 hours. This is your only chance to avoid physical arrest and media exposure.'
          }
        ],
        choices: [
          {
            text: 'Hang up immediately — no government body ever demands money over a phone call',
            isCorrect: true,
            explanation: 'Correct. CBI, ED, Income Tax — no Indian government agency ever demands money over phone. This is the clearest sign this is a scam.',
            nextStep: 3
          },
          {
            text: 'Transfer the money to avoid arrest and get it back later',
            isCorrect: false,
            explanation: 'There is no escrow. There is no refund. There is no investigation. Once you transfer, the scammer will demand more, claiming "further compliance" is needed.',
            nextStep: 4
          }
        ]
      },
      {
        id: 'verification-blocked',
        title: 'Verification Blocked',
        description: 'You tried to verify their identity.',
        dialogue: [
          {
            speaker: 'narrator',
            text: 'When you asked to call CBI back on their official number, the caller said "That is not possible during an active digital arrest — any outside communication will be treated as tampering with evidence." This itself proves it is a scam. Real officers always allow legal verification.'
          }
        ],
        choices: [
          {
            text: 'Disconnect now and report at cybercrime.gov.in',
            isCorrect: true,
            explanation: 'Any "official" who blocks you from independent verification is a fraudster. Hang up, report to 1930, and tell your family about this call.',
            nextStep: 3
          }
        ]
      },
      {
        id: 'safe-ending',
        title: 'Digital Arrest Scam Foiled',
        description: 'You protected yourself from extortion.',
        dialogue: [
          {
            speaker: 'narrator',
            text: 'You disconnected and filed a complaint at cybercrime.gov.in (helpline 1930). CBI confirmed they conduct no "digital arrests" and never demand money over phone. The number was identified as a spoofed line used in 40+ fraud cases across three states.'
          }
        ],
        choices: [
          {
            text: 'Scenario completed successfully',
            isCorrect: true,
            explanation: 'Excellent. Digital arrest scams are one of the fastest-growing frauds in India, often targeting educated professionals. Staying calm and hanging up is always the right move.',
            nextStep: null
          }
        ]
      },
      {
        id: 'fraud-consequence',
        title: 'Extortion Escalates',
        description: 'You transferred money and it got worse.',
        dialogue: [
          {
            speaker: 'narrator',
            text: 'After transferring ₹75,000, the "officer" demanded another ₹1.5 lakh for "court fee clearance". Victims of this scam have lost up to ₹50 lakh before realising the truth. Digital arrest is not a real legal concept in India.'
          }
        ],
        choices: [
          {
            text: 'Disconnect, report to 1930, and alert your bank to reverse the transfer',
            isCorrect: false,
            explanation: 'Act immediately: call your bank to flag the transfer, file an FIR at the police station, and report online at cybercrime.gov.in. Speed matters for fund recovery.',
            consequence: 'Lost money to extortion scam',
            nextStep: null
          }
        ]
      }
    ],
    keyTakeaways: [
      '"Digital arrest" is not a legal concept — no government agency can arrest you over phone',
      'CBI, ED, Income Tax, and police never demand money transfers as "security deposits"',
      'Real government notices come in writing to your registered address, not via phone calls',
      'If a caller blocks you from independently verifying their identity, it is a scam',
      'Hang up, call 1930, and report at cybercrime.gov.in — speed matters for fund recovery'
    ]
  }
}; 
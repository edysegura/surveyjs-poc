// References:
// https://surveyjs.io/form-library/documentation/design-survey/create-a-multi-page-survey

const surveyJson = {
  completedHtml: '<h5>Thank you! Together we are better!!</h5>',
  showNavigationButtons: false,
  showQuestionNumbers: false,
  pages: [
    {
      name: 'page1',
      elements: [
        {
          name: 'fitness-goal',
          title: 'What is your primary fitness goal?',
          description: 'Select the best match',
          type: 'radiogroup',
          choices: [
            {
              value: 1,
              text: 'Weight Loss',
              description: 'Your journey should be more about getting to your ideal weight',
              icon: '🏋️',
            },
            {
              value: 'muscule-building',
              text: 'Muscle Building',
              description: 'Your journey should be more about gaining muscle',
              icon: '💪',
            },
            {
              value: 'flexibility',
              text: 'Flexibility',
              description: 'Your journey should be more about flexibility',
              icon: '🧘‍♂️',
            },
            {
              value: 'endurance-training',
              text: 'Endurance Training',
              description: 'Your journey should be more about endurance',
              icon: '🏃‍♂️',
            },
            {
              value: 'being-healthier',
              text: 'Being Healthier',
              description: 'Your journey should be more about being healthier',
              icon: '🍏',
            },
          ],
        },
      ],
    },
    {
      name: 'page2',
      elements: [
        {
          name: 'workouts-preference',
          title: 'How do you prefer your workouts?',
          description: 'Select the best match',
          type: 'radiogroup',
          choices: [
            { value: 1, text: 'Hardcore', description: 'You like to push yourself to the limit' },
            { value: 2, text: 'Intense', description: 'You like to feel the burn' },
            { value: 3, text: 'Moderate', description: 'You like to feel the burn' },
            { value: 4, text: 'Mild and relaxing', description: 'You like to feel the burn' },
          ],
          isRequired: true,
        },
      ],
    },
    {
      name: 'page3',
      elements: [
        {
          name: 'how-can-we-improve',
          title: 'In your opinion, what we could do to make even better your experience?',
          type: 'comment',
        },
      ],
    },
    {
      name: 'page4',
      elements: [
        {
          name: 'referral',
          title: 'How did you find us?',
          type: 'comment',
        },
      ],
    },
  ],
}

export default surveyJson

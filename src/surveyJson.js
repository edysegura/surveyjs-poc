// References:
// https://surveyjs.io/form-library/documentation/design-survey/create-a-multi-page-survey

const surveyJson = {
  completedHtml: '<h5>Thank you! Together we are better!!</h5>',
  showNavigationButtons: false,
  showQuestionNumbers: false,
  pages: [
    {
      name: 'fitness-goal-page',
      elements: [
        {
          name: 'fitness-goal',
          title: 'What is your primary fitness goal?',
          description: 'Select the best match',
          type: 'radiogroup',
          choices: [
            {
              value: 'weight-loss',
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
      name: 'workouts-preference-page',
      elements: [
        {
          name: 'workouts-preference',
          title: 'How do you prefer your workouts?',
          description: 'Please select at least one option',
          type: 'radiogroup',
          choices: ['Hardcore', 'Intense', 'Moderate', 'Mild and relaxing'],
          isRequired: true,
        },
      ],
    },
    {
      name: 'exercises-page',
      elements: [
        {
          name: 'exercises',
          title: 'Which exercises do you prefer?',
          description: 'Please select up to 3 options',
          minSelectedChoices: 3,
          // maxSelectedChoices: 3,
          type: 'checkbox',
          choices: [
            { value: 'Cardio', description: 'You like to push yourself to the limit' },
            { value: 'Strength', description: 'You like to become stronger' },
            { value: 'Flexibility', description: 'You like to have flexibility' },
            { value: 'Yoga', description: 'You like to know better yourself' },
            { value: 'Pilates', description: 'You like to live well' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          name: 'how-can-we-improve',
          title: 'In your opinion, what we could do to make even better your experience?',
          type: 'comment',
          allowResize: false,
        },
      ],
    },
  ],
}

export default surveyJson

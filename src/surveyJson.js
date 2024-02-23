const surveyJson = {
  showProgressBar: 'top',
  pages: [
    {
      elements: [
        {
          type: 'html',
          html: '<h2>In this survey, we will ask you a couple questions about your preferences.</h2>',
        },
      ],
    },
    {
      visible: true,
      elements: [
        {
          name: 'fitness-goal',
          title: 'What is your primary fitness goal?',
          type: 'radiogroup',
          choices: [
            { value: 1, text: 'Weight Loss' },
            { value: 2, text: 'Muscle Building' },
            { value: 3, text: 'Flexibility' },
            { value: 4, text: 'Endurance Training' },
            { value: 5, text: 'Being Healthier' },
          ],
          isRequired: true,
        },
      ],
    },
    {
      elements: [
        {
          name: 'workouts-preference',
          title: 'How do you prefer your workouts?',
          type: 'radiogroup',
          choices: [
            { value: 1, text: 'Hardcore' },
            { value: 2, text: 'Intense' },
            { value: 3, text: 'Moderate' },
            { value: 4, text: 'Mild and relaxing' },
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
        },
      ],
    },
    {
      elements: [
        {
          name: 'disappointing-experience',
          title: 'Please let us know why you had such a disappointing experience with our product',
          type: 'comment',
        },
      ],
    },
  ],
}

export default surveyJson

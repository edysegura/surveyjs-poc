// References:
// https://surveyjs.io/form-library/documentation/design-survey/create-a-multi-page-survey

const surveyJson = {
  completedHtml: '<h5>Thank you! Together we are better!!</h5>',
  showQuestionNumbers: false,
  pages: [
    // {
    //   elements: [
    //     {
    //       type: 'html',
    //       html: '<h2>We will ask you a couple to know you more!</h2>',
    //     },
    //   ],
    // },
    {
      elements: [
        {
          visible: true,
          name: 'fitness-goal',
          title: 'What is your primary fitness goal?',
          description: 'Select the best match',
          type: 'radiogroup',
          choices: [
            {
              value: 1,
              text: 'Weight Loss',
              description: 'Your journey should be more about getting to your ideal weight',
            },
            { value: 2, text: 'Muscle Building', description: 'Your journey should be more about gaining muscle' },
            { value: 3, text: 'Flexibility', description: 'Your journey should be more about flexibility' },
            { value: 4, text: 'Endurance Training', description: 'Your journey should be more about endurance' },
            { value: 5, text: 'Being Healthier', description: 'Your journey should be more about being healthier' },
          ],
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
            { value: 1, text: 'Hardcore', description: 'This is a test' },
            { value: 2, text: 'Intense' },
            { value: 3, text: 'Moderate' },
            { value: 4, text: 'Mild and relaxing' },
          ],
          isRequired: true,
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

import Nullstack, { NullstackClientContext } from 'nullstack'

import { AfterRenderQuestionEvent } from 'survey-jquery'

import jsonSurvey from './surveyJson.js'

import './style.scss'

interface HomeProps {
  greeting: string
}

class Home extends Nullstack<HomeProps> {

  _surveyJs: any
  surveyResponses: any

  prepare({ project, page, greeting }: NullstackClientContext<HomeProps>) {
    page.title = `${project.name} - ${greeting}`
    page.description = `${project.name} was made with Nullstack`
  }

  async hydrate() {
    await this.initiateSurveyJs()
  }

  async initiateSurveyJs(): Promise<void> {
    const { default: jQuery } = await import('jquery')
    const { Model } = await import('survey-jquery')
    const survey = new Model(jsonSurvey)
    this._surveyJs = survey
    survey.onComplete.add((sender) => {
      this.surveyResponses = sender.data
    })
    survey.onAfterRenderQuestion.add((_, options) => {
      this._addButtonToSurvey(options)
      this._addAnswerDescription(options)
    })
    jQuery('#surveyElement').Survey({ model: survey })
  }

  _addButtonToSurvey(options: AfterRenderQuestionEvent) {
    const container = options.htmlElement.querySelector('.sd-question__header')
    const nextButton = document.querySelector('.sd-question__next-btn')
    const button = document.createElement('button')
    button.classList.add(
      'bg-blue-500',
      'text-white',
      'p-2',
      'rounded-md',
      'hover:bg-blue-600',
      'transition-colors',
      'duration-300',
    )
    button.textContent = 'Continue'
    button.onclick = () => {
      if (this._surveyJs.currentPage.validate()) {
        nextButton?.dispatchEvent(new Event('click'))
      }
    }
    container?.appendChild(button)
  }

  _addAnswerDescription(options: AfterRenderQuestionEvent) {
    options.htmlElement.querySelectorAll('.sd-item__control-label .sv-string-viewer').forEach((element, index) => {
      const description = options.question.choices[index].jsonObj?.description || ''
      const icon = ['⭐️', '🔥', '🌕', '🌎'].at(Math.floor(index % 4))
      if (description)
        element.innerHTML = `
          <div class="flex flex-col">
            <span class="flex">${element.textContent}<span class="ml-auto">${icon}</span></span>
            <span class="text-gray-400 text-xs">${description}</span>
          </div>
        `
    })
  }

  render() {
    return (
      <section class="w-full max-w-[1440px] min-h-screen my-0 mx-auto flex flex-wrap md:flex-nowrap flex-col gap-4">
        <div id="surveyElement" class="w-full min-h-screen bg-white" />
      </section>
    )
  }

}

export default Home

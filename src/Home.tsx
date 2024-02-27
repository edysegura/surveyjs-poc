import Nullstack, { NullstackClientContext } from 'nullstack'

import { AfterRenderQuestionEvent } from 'survey-jquery'

import jsonSurvey from './surveyJson.js'

import './style.scss'

interface HomeProps {
  greeting: string
}

class Home extends Nullstack<HomeProps> {

  _survey: any
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
    this._survey = survey
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
    const survey = this._survey
    const continueBtn = document.createElement('button')
    continueBtn.classList.add(
      'bg-blue-500',
      'text-white',
      'p-2',
      'rounded-md',
      'hover:bg-blue-600',
      'transition-colors',
      'duration-300',
    )
    continueBtn.textContent = survey.isLastPage ? 'Complete' : 'Continue'
    continueBtn.onclick = (event) => {
      event.stopPropagation()
      if (this._survey.currentPage.validate()) {
        if (survey.isLastPage) {
          survey.completeLastPage()
          return
        }
        survey.nextPage()
      }
    }
    container?.appendChild(continueBtn)
  }

  _addAnswerDescription(options: AfterRenderQuestionEvent) {
    options.htmlElement.querySelectorAll('.sd-item__control-label .sv-string-viewer').forEach((element, index) => {
      const { description = '', icon = '' } = options.question.choices[index].jsonObj
      element.innerHTML = `
        <div class="flex flex-col gap-2">
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

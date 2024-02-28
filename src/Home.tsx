import Nullstack, { NullstackClientContext, NullstackNode } from 'nullstack'

import { AfterRenderQuestionEvent, SurveyModel } from 'survey-jquery'

import jsonSurvey from './surveyJson.js'

import './style.scss'

interface HomeProps {
  greeting: string
}

declare function Dialog(): NullstackNode

class Home extends Nullstack<HomeProps> {

  _survey: SurveyModel | undefined
  surveyResponses: Record<string, unknown> = {}
  dialog: HTMLDivElement | undefined

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
      this.showDialog()
    })
    survey.onAfterRenderQuestion.add((_, options) => {
      this._addCustomButtons(options)
      this._addCustomAnswerDescription(options)
    })
    jQuery('#surveyElement').Survey({ model: survey })
  }

  _addCustomButtons(options: AfterRenderQuestionEvent) {
    const container = options.htmlElement.querySelector('.sd-question__header')
    const continueBtn = this._createContinueButton()
    const skipQuestionBtn = this._createSkipQuestionButton()
    container?.appendChild(continueBtn)
    container?.appendChild(skipQuestionBtn)
    this._customContinueButtonValidation()
    this._customSkipQuestionButtonValidation()
  }

  _createContinueButton(): HTMLButtonElement {
    const survey = this._survey
    const continueBtn = document.createElement('button')
    continueBtn.textContent = survey?.isLastPage ? 'Complete' : 'Continue'
    continueBtn.classList.add('sd-btn__instill')
    continueBtn.disabled = true
    continueBtn.onclick = (event) => {
      event.stopPropagation()
      const performAction = survey?.isLastPage ? 'completeLastPage' : 'nextPage'
      if (survey?.currentPage.validate()) {
        survey[performAction]()
      }
    }
    return continueBtn
  }

  _createSkipQuestionButton(): HTMLButtonElement {
    const survey = this._survey
    const skipQuestionBtn = document.createElement('button')
    skipQuestionBtn.textContent = 'Skip Question'
    skipQuestionBtn.classList.add('sd-btn__skip')
    skipQuestionBtn.onclick = (event) => {
      event.stopPropagation()
      const performAction = survey?.isLastPage ? 'completeLastPage' : 'nextPage'
      if (survey?.currentPage.validate()) {
        survey[performAction]()
      }
    }
    return skipQuestionBtn
  }

  _customContinueButtonValidation() {
    const survey = this._survey
    if (!survey) return
    survey.onValueChanged.add(() => {
      const continueBtn = document.querySelector<HTMLButtonElement>('.sd-btn__instill')
      if (continueBtn) {
        continueBtn.disabled = !survey.currentPage.validate()
      }
    })
  }

  _customSkipQuestionButtonValidation() {
    const survey = this._survey
    if (!survey) return
    survey.onCurrentPageChanged.add((_, options) => {
      setTimeout(() => {
        const skipQuestionBtn = document.querySelector<HTMLButtonElement>('.sd-btn__skip')
        if (skipQuestionBtn && !survey.currentPage.validate()) {
          skipQuestionBtn.classList.add('hidden')
        }
      }, 1)
    })
  }

  _addCustomAnswerDescription(options: AfterRenderQuestionEvent) {
    options.htmlElement.querySelectorAll('.sd-item__control-label .sv-string-viewer').forEach((element, index) => {
      const { description = '', icon = '' } = options.question.choices[index].jsonObj
      const descriptionHtml = description ? `<span class="text-gray-400 text-xs">${description}</span>` : ''
      element.innerHTML = `
        <div class="flex flex-col gap-2 justify-center">
          <span class="flex">${element.textContent}<span class="ml-auto">${icon}</span></span>
          ${descriptionHtml}
        </div>
      `
    })
  }

  showDialog() {
    this.dialog?.classList.remove('hidden')
    this.dialog?.classList.add('flex')
  }

  renderDialog() {
    return (
      <div
        ref={this.dialog}
        class="fixed text-black hidden inset-0 z-50 items-center justify-center bg-black bg-opacity-50"
      >
        <main class="bg-white p-8 rounded-md flex flex-col gap-4">
          <h1 class="text-2xl font-bold">Survey Responses</h1>
          <pre>{JSON.stringify(this.surveyResponses, null, 2)}</pre>
          <button type="button" class="sd-btn__instill !w-full" onclick={() => document.location.reload()}>
            Restart
          </button>
        </main>
      </div>
    )
  }

  render() {
    return (
      <section class="w-full max-w-[1440px] min-h-screen my-0 mx-auto flex flex-wrap md:flex-nowrap flex-col gap-4">
        <div id="surveyElement" class="w-full min-h-screen bg-white" />
        <Dialog />
      </section>
    )
  }

}

export default Home

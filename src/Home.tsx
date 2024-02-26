import Nullstack, { NullstackClientContext } from 'nullstack'

import jsonSurvey from './surveyJson.js'

import 'survey-jquery/defaultV2.min.css'
import './style.scss'

interface HomeProps {
  greeting: string
}

class Home extends Nullstack<HomeProps> {

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
    survey.onComplete.add((sender) => {
      this.surveyResponses = sender.data
    })
    survey.onAfterRenderQuestion.add((_, options) => {
      options.htmlElement.querySelectorAll('.sd-item__control-label .sv-string-viewer').forEach((element, index) => {
        // console.log(options.question.choices[index].jsonObj)
        // console.log(index, element.textContent)
        const description = options.question.choices[index].jsonObj?.description || ''
        element.innerHTML = `${element.textContent}<br /><span class="text-gray-400 text-xs">${description}</span>`
      })
    })
    jQuery('#surveyElement').Survey({ model: survey })
  }

  render() {
    return (
      <section class="w-full max-w-[1440px] min-h-screen my-0 mx-auto flex flex-wrap md:flex-nowrap flex-col gap-4">
        <div id="surveyElement" class="w-full h-[600px]" />
        <pre class="text-white">{JSON.stringify(this.surveyResponses, null, 2)}</pre>
      </section>
    )
  }

}

export default Home

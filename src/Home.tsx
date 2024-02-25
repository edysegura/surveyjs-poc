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
      console.log('item', options.question)
    })
    jQuery('#surveyElement').Survey({ model: survey })
  }

  render() {
    return (
      <section class="w-full max-w-3xl min-h-screen my-0 mx-auto flex items-center p-6 flex-wrap md:flex-nowrap flex-col gap-4">
        <div id="surveyElement" class="w-full" />
        <pre class="text-white">{JSON.stringify(this.surveyResponses, null, 2)}</pre>
      </section>
    )
  }

}

export default Home

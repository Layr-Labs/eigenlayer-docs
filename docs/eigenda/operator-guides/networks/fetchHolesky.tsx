import { useState, useEffect } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function RenderHolesky() {
  const [markdown, setMarkdown] = useState('')
  useEffect(() => {
    fetchMarkdown()
  }, [])
  async function fetchMarkdown() {
    try {
      let response = await fetch('https://raw.githubusercontent.com/layr-labs/eigenda-operator-setup/master/holesky/README.md')
      .then((response) => response.text())
      console.log('response: ', response)
      response = response.replace('<!-- :::info -->', '')
      response = response.replace('<!-- ::: -->', '')
      response = response.replace('# Holesky', '')
      setMarkdown(response)
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <Markdown remarkPlugins={[remarkGfm]}>
      {markdown}
    </Markdown>
  )
}
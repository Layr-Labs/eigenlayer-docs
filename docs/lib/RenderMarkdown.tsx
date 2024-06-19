import { useState, useEffect } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function RenderMarkdown({ src }) {
  const [markdown, setMarkdown] = useState('')
  useEffect(() => {
    fetchMarkdown()
  }, [])
  async function fetchMarkdown() {
    try {
      let response = await fetch(src).then((response) => response.text())
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
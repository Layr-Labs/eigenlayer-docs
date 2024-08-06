import React from 'react';
import SearchBar from '@theme-original/SearchBar';
import AskCookbook from '@cookbookdev/docsbot/react'

/** It's a public API key, so it's safe to expose it here */
const COOKBOOK_PUBLIC_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmIxN2M3ZWE0NWZlNWQ2ZDY4YzViZWUiLCJpYXQiOjE3MjI5MDc3NzQsImV4cCI6MjAzODQ4Mzc3NH0.Eo1I-gWX3SRktODd79AXue7qIcNNMdCk8F1C6zds6d8"

export default function SearchBarWrapper(props) {
  return (
    <>
      <SearchBar {...props} />
      <AskCookbook apiKey={COOKBOOK_PUBLIC_API_KEY} />
    </>
  );
}

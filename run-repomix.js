import { runCli } from 'repomix';
import path from "node:path";

async function processRemoteRepo(repoUrl, fileName) {
  const options = {
    remote: repoUrl,
    output: path.join(process.cwd(), 'build', fileName),
    compress: true,
    style: 'markdown'
  }
  return await runCli(['.'], process.cwd(), options);
}

const repos = [
  {
    url: 'https://github.com/Layr-Labs/eigenlayer-contracts',
    fileName: "eigenlayer-contracts.md",
  },
  {
    url: 'https://github.com/Layr-Labs/eigensdk-go',
    fileName: 'eigenlayer-go-sdk.md'
  },
  {
    url: 'https://github.com/Layr-Labs/hello-world-avs',
    fileName: 'hello-world-avs.md'
  }
] 

for (const repo of repos) {
  await processRemoteRepo(repo.url, repo.fileName);
}
  
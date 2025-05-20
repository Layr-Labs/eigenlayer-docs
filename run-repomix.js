import { runCli } from 'repomix';
import path from "node:path";

async function processRemoteRepo(repoUrl, fileName) {
  const options = {
    remote: repoUrl,
    output: path.join(process.cwd(), 'static', fileName),
    compress: true,
    style: 'markdown'
  }
  return await runCli(['.'], process.cwd(), options);
}

processRemoteRepo("https://github.com/Layr-Labs/eigenlayer-contracts", "eigenlayer-contracts.md")
processRemoteRepo("https://github.com/Layr-Labs/hello-world-avs", "hello-world-avs.md")

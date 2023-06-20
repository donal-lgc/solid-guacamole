import jiraApi from 'jira-client'
import {IIssue} from './model/jira'

async function fetchIssueData(
  issueKey: string,
  user: string,
  token: string,
  url: string
): Promise<IIssue> {
  const jira = new jiraApi({
    protocol: 'https',
    host: url,
    username: user,
    password: token,
    apiVersion: '2',
    strictSSL: true
  })

  const jsonResponse = await jira.findIssue(issueKey)
  const result = jsonResponse as IIssue
  return result
}

export default fetchIssueData

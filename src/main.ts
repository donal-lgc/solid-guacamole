import * as core from '@actions/core'
import parseIssues from './title_parser'
import fetchIssueData from './jira_client'

async function run(): Promise<void> {
  try {
    const prTitle = core.getInput('pr_title')
    core.info(`PR title: '${prTitle}'`)
    const issueNumbers = parseIssues(prTitle)
    core.info(`Parsed issue numbers: ${issueNumbers.join(', ')}`)

    if (issueNumbers.length === 0) {
      core.setFailed('PR title does not contain any issue numbers')
      return
    }

    const jiraUser = core.getInput('jira_user')
    const jiraToken = core.getInput('jira_token')
    const jiraUrl = core.getInput('jiraUrl')
    core.info(
      `Verifying issues with user '${jiraUser}', token '${jiraToken}', url '${jiraUrl}'`
    )

    const issuesMissingFix: string[] = []

    for (const issueNumber of issueNumbers) {
      const issueData = await fetchIssueData(
        issueNumber,
        jiraUser,
        jiraToken,
        jiraUrl
      )
      if (issueData.fields.fixVersions.length === 0) {
        core.error(`Issue ${issueNumber} does not have any fix versions`)
        issuesMissingFix.push(issueNumber)
      }
    }

    if (issuesMissingFix.length > 0) {
      const issues = issuesMissingFix.join(', ')
      core.setFailed(
        `The following issues are missing a fix version: ${issues}`
      )
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

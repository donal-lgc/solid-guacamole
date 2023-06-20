// Takes the title of the PR and parses out any JIRA issue numbers and returns them in an array
// Issue numbers can take the format '[ABC-123]' or '(ABC-123)'
function parseIssues(prTitle: string): string[] {
  const issuesMatch = prTitle.match(/^[[(]([A-Z]+-[0-9]+)[\])].*$/g)
  if (issuesMatch == null) {
    return []
  }
  const result = issuesMatch[1]
    .replace(/[\])][[(]/g, '')
    .replace(/[[\]()]/g, '')
    .split(',')
  return result
}

export default parseIssues

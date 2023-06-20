import * as t from 'io-ts'

const Version = t.exact(
  t.type({
    id: t.string,
    description: t.union([t.string, t.undefined, t.null]),
    name: t.string
  })
)

const IssueStatus = t.exact(
  t.type({
    name: t.string,
    untranslatedName: t.string
  })
)

const IssueResolution = t.exact(
  t.type({
    name: t.string
  })
)

export const Issue = t.exact(
  t.type({
    id: t.string,
    key: t.string,
    fields: t.exact(
      t.type({
        fixVersions: t.array(Version),
        resolution: t.union([IssueResolution, t.undefined, t.null]),
        status: IssueStatus,
        summary: t.string,
        description: t.union([t.string, t.undefined, t.null])
      })
    )
  })
)

export type IIssue = t.TypeOf<typeof Issue>

// ---

const HookFilter = t.exact(
  t.type({
    'issue-related-events-section': t.union([t.string, t.undefined])
  })
)

const HookProps = t.type({
  name: t.string,
  url: t.string,
  enabled: t.boolean,
  events: t.array(t.string),
  filters: t.union([HookFilter, t.undefined, t.null])
})

export const HookSettings = t.exact(HookProps)

export type IHookSettings = t.TypeOf<typeof HookSettings>

export const Hook = t.exact(
  t.intersection([
    HookProps,
    t.type({
      self: t.string
    })
  ])
)

export type IHook = t.TypeOf<typeof Hook>

// ---

// tslint:disable: no-reserved-keywords
/**
 * https://developer.github.com/v3/users/#get-a-single-user
 *
 * https://api.apis.guru/v2/specs/github.com/v3/swagger.json
 *
 */
// tslint:disable: interface-name

export interface IGithubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  // tslint:disable-next-line: no-reserved-keywords
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email?: string;
  hireable?: boolean;
  bio?: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface IOwner {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface ILicense {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
  node_id: string;
}

export interface IRepository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: IOwner;
  html_url: string;
  description?: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage?: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  forks_count: number;
  mirror_url?: string;
  archived: boolean;
  open_issues_count: number;
  license: ILicense;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
  network_count: number;
  subscribers_count: number;
}

// Interfaces
// export interface ActivityApi {
//   checkStarringRepo(owner?: string, repo?: string): Promise<void>;
//   deleteRepoSubscription(owner?: string, repo?: string): Promise<void>;
//   deleteThreadSubscription(thread_id?: number): Promise<void>;
//   getRepoSubscription(owner?: string, repo?: string): Promise<void>;
//   getThread(thread_id?: number): Promise<void>;
//   getThreadSubscription(thread_id?: number): Promise<void>;
//   listEventsForOrg(username?: string, org?: string): Promise<void>;
//   listEventsForUser(username?: string): Promise<void>;
//   listFeeds(): Promise<void>;
//   listNotifications(): Promise<void>;
//   listNotificationsForRepo(owner?: string, repo?: string): Promise<void>;
//   listPublicEvents(): Promise<void>;
//   listPublicEventsForOrg(org?: string): Promise<void>;
//   listPublicEventsForRepoNetwork(owner?: string, repo?: string): Promise<void>;
//   listPublicEventsForUser(username?: string): Promise<void>;
//   listReceivedEventsForUser(username?: string): Promise<void>;
//   listReceivedPublicEventsForUser(username?: string): Promise<void>;
//   listRepoEvents(owner?: string, repo?: string): Promise<void>;
//   listReposStarredByAuthenticatedUser(): Promise<void>;
//   listReposStarredByUser(username?: string): Promise<void>;
//   listReposWatchedByUser(username?: string): Promise<void>;
//   listStargazersForRepo(owner?: string, repo?: string): Promise<void>;
//   listWatchedReposForAuthenticatedUser(): Promise<void>;
//   listWatchersForRepo(owner?: string, repo?: string): Promise<void>;
//   markAsRead(): Promise<void>;
//   markNotificationsAsReadForRepo(owner?: string, repo?: string): Promise<void>;
//   markThreadAsRead(thread_id?: number): Promise<void>;
//   setRepoSubscription(owner?: string, repo?: string): Promise<void>;
//   setThreadSubscription(thread_id?: number): Promise<void>;
//   starRepo(owner?: string, repo?: string): Promise<void>;
//   unstarRepo(owner?: string, repo?: string): Promise<void>;
// }
// export interface AppsApi {
//   addRepoToInstallation(installation_id?: number, repository_id?: number): Promise<void>;
//   checkAccountIsAssociatedWithAny(account_id?: number): Promise<void>;
//   checkAccountIsAssociatedWithAnyStubbed(account_id?: number): Promise<void>;
//   createContentAttachment(content_reference_id?: number): Promise<void>;
//   createFromManifest(code?: string): Promise<void>;
//   createInstallationToken(installation_id?: number): Promise<void>;
//   findOrgInstallation(org?: string): Promise<void>;
//   findRepoInstallation(owner?: string, repo?: string): Promise<void>;
//   findUserInstallation(username?: string): Promise<void>;
//   getAuthenticated(): Promise<void>;
//   getBySlug(app_slug?: string): Promise<void>;
//   getInstallation(installation_id?: number): Promise<void>;
//   listAccountsUserOrOrgOnPlan(plan_id?: number): Promise<void>;
//   listAccountsUserOrOrgOnPlanStubbed(plan_id?: number): Promise<void>;
//   listInstallationReposForAuthenticatedUser(installation_id?: number): Promise<void>;
//   listInstallations(): Promise<void>;
//   listInstallationsForAuthenticatedUser(): Promise<void>;
//   listMarketplacePurchasesForAuthenticatedUser(): Promise<void>;
//   listMarketplacePurchasesForAuthenticatedUserStubbed(): Promise<void>;
//   listPlans(): Promise<void>;
//   listPlansStubbed(): Promise<void>;
//   listRepos(): Promise<void>;
//   removeRepoFromInstallation(installation_id?: number, repository_id?: number): Promise<void>;
// }
// export interface ChecksApi {
//   create(owner?: string, repo?: string): Promise<void>;
//   createSuite(owner?: string, repo?: string): Promise<void>;
//   get(owner?: string, repo?: string, check_run_id?: number): Promise<void>;
//   getSuite(owner?: string, repo?: string, check_suite_id?: number): Promise<void>;
//   listAnnotations(owner?: string, repo?: string, check_run_id?: number): Promise<void>;
//   listForRef(owner?: string, repo?: string, ref?: string): Promise<void>;
//   listForSuite(owner?: string, repo?: string, check_suite_id?: number): Promise<void>;
//   listSuitesForRef(owner?: string, repo?: string, ref?: string): Promise<void>;
//   rerequestSuite(owner?: string, repo?: string, check_suite_id?: number): Promise<void>;
//   setSuitesPreferences(owner?: string, repo?: string): Promise<void>;
//   update(owner?: string, repo?: string, check_run_id?: number): Promise<void>;
// }
// export interface CodesOfConductApi {
//   getConductCode(key?: string): Promise<void>;
//   getForRepo(owner?: string, repo?: string): Promise<void>;
//   listConductCodes(): Promise<void>;
// }
// export interface EmojisApi {
//   get(): Promise<void>;
// }
// export interface GistsApi {
//   checkIsStarred(gist_id?: string): Promise<void>;
//   create(): Promise<void>;
//   createComment(gist_id?: string): Promise<void>;
//   delete(gist_id?: string): Promise<void>;
//   deleteComment(gist_id?: string, comment_id?: number): Promise<void>;
//   fork(gist_id?: string): Promise<void>;
//   get(gist_id?: string): Promise<void>;
//   getComment(gist_id?: string, comment_id?: number): Promise<void>;
//   getRevision(gist_id?: string, sha?: string): Promise<void>;
//   list(): Promise<void>;
//   listComments(gist_id?: string): Promise<void>;
//   listCommits(gist_id?: string): Promise<void>;
//   listForks(gist_id?: string): Promise<void>;
//   listPublic(): Promise<void>;
//   listPublicForUser(username?: string): Promise<void>;
//   listStarred(): Promise<void>;
//   star(gist_id?: string): Promise<void>;
//   unstar(gist_id?: string): Promise<void>;
//   update(gist_id?: string): Promise<void>;
//   updateComment(gist_id?: string, comment_id?: number): Promise<void>;
// }
// export interface GitApi {
//   createBlob(owner?: string, repo?: string): Promise<void>;
//   createCommit(owner?: string, repo?: string): Promise<void>;
//   createRef(owner?: string, repo?: string): Promise<void>;
//   createTag(owner?: string, repo?: string): Promise<void>;
//   createTree(owner?: string, repo?: string): Promise<void>;
//   deleteRef(owner?: string, repo?: string, ref?: string): Promise<void>;
//   getBlob(owner?: string, repo?: string, file_sha?: string): Promise<void>;
//   getCommit(owner?: string, repo?: string, commit_sha?: string): Promise<void>;
//   getRef(owner?: string, repo?: string, ref?: string): Promise<void>;
//   getTag(owner?: string, repo?: string, tag_sha?: string): Promise<void>;
//   getTree(owner?: string, repo?: string, tree_sha?: string): Promise<void>;
//   listRefs(owner?: string, repo?: string, namespace?: string): Promise<void>;
//   updateRef(owner?: string, repo?: string, ref?: string): Promise<void>;
// }
// export interface GitignoreApi {
//   getTemplate(name?: string): Promise<void>;
//   listTemplates(): Promise<void>;
// }
// export interface InteractionsApi {
//   addOrUpdateRestrictionsForOrg(org?: string): Promise<void>;
//   addOrUpdateRestrictionsForRepo(owner?: string, repo?: string): Promise<void>;
//   getRestrictionsForOrg(org?: string): Promise<void>;
//   getRestrictionsForRepo(owner?: string, repo?: string): Promise<void>;
//   removeRestrictionsForOrg(org?: string): Promise<void>;
//   removeRestrictionsForRepo(owner?: string, repo?: string): Promise<void>;
// }
// export interface IssuesApi {
//   addAssignees(owner?: string, repo?: string, number?: number): Promise<void>;
//   addLabels(owner?: string, repo?: string, number?: number): Promise<void>;
//   checkAssignee(owner?: string, repo?: string, assignee?: string): Promise<void>;
//   create(owner?: string, repo?: string): Promise<void>;
//   createComment(owner?: string, repo?: string, number?: number): Promise<void>;
//   createLabel(owner?: string, repo?: string): Promise<void>;
//   createMilestone(owner?: string, repo?: string): Promise<void>;
//   deleteComment(owner?: string, repo?: string, comment_id?: number): Promise<void>;
//   deleteLabel(owner?: string, repo?: string, name?: string): Promise<void>;
//   deleteMilestone(owner?: string, repo?: string, number?: number): Promise<void>;
//   get(owner?: string, repo?: string, number?: number): Promise<void>;
//   getComment(owner?: string, repo?: string, comment_id?: number): Promise<void>;
//   getEvent(owner?: string, repo?: string, event_id?: number): Promise<void>;
//   getLabel(owner?: string, repo?: string, name?: string): Promise<void>;
//   getMilestone(owner?: string, repo?: string, number?: number): Promise<void>;
//   list(): Promise<void>;
//   listAssignees(owner?: string, repo?: string): Promise<void>;
//   listComments(owner?: string, repo?: string, number?: number): Promise<void>;
//   listCommentsForRepo(owner?: string, repo?: string): Promise<void>;
//   listEvents(owner?: string, repo?: string, number?: number): Promise<void>;
//   listEventsForRepo(owner?: string, repo?: string): Promise<void>;
//   listEventsForTimeline(owner?: string, repo?: string, number?: number): Promise<void>;
//   listForAuthenticatedUser(): Promise<void>;
//   listForOrg(org?: string): Promise<void>;
//   listForRepo(owner?: string, repo?: string): Promise<void>;
//   listLabelsForMilestone(owner?: string, repo?: string, number?: number): Promise<void>;
//   listLabelsForRepo(owner?: string, repo?: string): Promise<void>;
//   listLabelsOnIssue(owner?: string, repo?: string, number?: number): Promise<void>;
//   listMilestonesForRepo(owner?: string, repo?: string): Promise<void>;
//   lock(owner?: string, repo?: string, number?: number): Promise<void>;
//   removeAssignees(owner?: string, repo?: string, number?: number): Promise<void>;
//   removeLabel(owner?: string, repo?: string, number?: number, name?: string): Promise<void>;
//   removeLabels(owner?: string, repo?: string, number?: number): Promise<void>;
//   replaceLabels(owner?: string, repo?: string, number?: number): Promise<void>;
//   unlock(owner?: string, repo?: string, number?: number): Promise<void>;
//   update(owner?: string, repo?: string, number?: number): Promise<void>;
//   updateComment(owner?: string, repo?: string, comment_id?: number): Promise<void>;
//   updateLabel(owner?: string, repo?: string, current_name?: string): Promise<void>;
//   updateMilestone(owner?: string, repo?: string, number?: number): Promise<void>;
// }
// export interface LicensesApi {
//   get(license?: string): Promise<void>;
//   getForRepo(owner?: string, repo?: string): Promise<void>;
//   list(): Promise<void>;
//   listCommonlyUsed(): Promise<void>;
// }
// export interface MarkdownApi {
//   render(): Promise<void>;
//   renderRaw(): Promise<void>;
// }
// export interface MetaApi {
//   get(): Promise<void>;
// }
// export interface MigrationsApi {
//   cancelImport(owner?: string, repo?: string): Promise<void>;
//   deleteArchiveForAuthenticatedUser(migration_id?: number): Promise<void>;
//   deleteArchiveForOrg(org?: string, migration_id?: number): Promise<void>;
//   getArchiveForAuthenticatedUser(migration_id?: number): Promise<void>;
//   getArchiveForOrg(org?: string, migration_id?: number): Promise<void>;
//   getCommitAuthors(owner?: string, repo?: string): Promise<void>;
//   getImportProgress(owner?: string, repo?: string): Promise<void>;
//   getLargeFiles(owner?: string, repo?: string): Promise<void>;
//   getStatusForAuthenticatedUser(migration_id?: number): Promise<void>;
//   getStatusForOrg(org?: string, migration_id?: number): Promise<void>;
//   listForAuthenticatedUser(): Promise<void>;
//   listForOrg(org?: string): Promise<void>;
//   mapCommitAuthor(owner?: string, repo?: string, author_id?: number): Promise<void>;
//   setLfsPreference(owner?: string, repo?: string): Promise<void>;
//   startForAuthenticatedUser(): Promise<void>;
//   startForOrg(org?: string): Promise<void>;
//   startImport(owner?: string, repo?: string): Promise<void>;
//   unlockRepoForAuthenticatedUser(migration_id?: number, repo_name?: string): Promise<void>;
//   unlockRepoForOrg(org?: string, migration_id?: number, repo_name?: string): Promise<void>;
//   updateImport(owner?: string, repo?: string): Promise<void>;
// }
// export interface OauthAuthorizationsApi {
//   checkAuthorization(client_id?: string, access_token?: string): Promise<void>;
//   createAuthorization(): Promise<void>;
//   deleteAuthorization(authorization_id?: number): Promise<void>;
//   deleteGrant(grant_id?: number): Promise<void>;
//   getAuthorization(authorization_id?: number): Promise<void>;
//   getGrant(grant_id?: number): Promise<void>;
//   getOrCreateAuthorizationForApp(client_id?: string): Promise<void>;
//   getOrCreateAuthorizationForAppAndFingerprint(client_id?: string, fingerprint?: string): Promise<void>;
//   getOrCreateAuthorizationForAppFingerprint(client_id?: string, fingerprint?: string): Promise<void>;
//   listAuthorizations(): Promise<void>;
//   listGrants(): Promise<void>;
//   resetAuthorization(client_id?: string, access_token?: string): Promise<void>;
//   revokeAuthorizationForApplication(client_id?: string, access_token?: string): Promise<void>;
//   revokeGrantForApplication(client_id?: string, access_token?: string): Promise<void>;
//   updateAuthorization(authorization_id?: number): Promise<void>;
// }
// export interface OrgsApi {
//   addOrUpdateMembership(org?: string, username?: string): Promise<void>;
//   blockUser(org?: string, username?: string): Promise<void>;
//   checkBlockedUser(org?: string, username?: string): Promise<void>;
//   checkMembership(org?: string, username?: string): Promise<void>;
//   checkPublicMembership(org?: string, username?: string): Promise<void>;
//   concealMembership(org?: string, username?: string): Promise<void>;
//   convertMemberToOutsideCollaborator(org?: string, username?: string): Promise<void>;
//   createHook(org?: string): Promise<void>;
//   createInvitation(org?: string): Promise<void>;
//   deleteHook(org?: string, hook_id?: number): Promise<void>;
//   get(org?: string): Promise<void>;
//   getHook(org?: string, hook_id?: number): Promise<void>;
//   getMembership(org?: string, username?: string): Promise<void>;
//   getMembershipForAuthenticatedUser(org?: string): Promise<void>;
//   list(): Promise<void>;
//   listBlockedUsers(org?: string): Promise<void>;
//   listForAuthenticatedUser(): Promise<void>;
//   listForUser(username?: string): Promise<void>;
//   listHooks(org?: string): Promise<void>;
//   listInvitationTeams(org?: string, invitation_id?: number): Promise<void>;
//   listMembers(org?: string): Promise<void>;
//   listMemberships(): Promise<void>;
//   listOutsideCollaborators(org?: string): Promise<void>;
//   listPendingInvitations(org?: string): Promise<void>;
//   listPublicMembers(org?: string): Promise<void>;
//   pingHook(org?: string, hook_id?: number): Promise<void>;
//   publicizeMembership(org?: string, username?: string): Promise<void>;
//   removeMember(org?: string, username?: string): Promise<void>;
//   removeMembership(org?: string, username?: string): Promise<void>;
//   removeOutsideCollaborator(org?: string, username?: string): Promise<void>;
//   unblockUser(org?: string, username?: string): Promise<void>;
//   update(org?: string): Promise<void>;
//   updateHook(org?: string, hook_id?: number): Promise<void>;
//   updateMembership(org?: string): Promise<void>;
// }
// export interface ProjectsApi {
//   addCollaborator(project_id?: number, username?: string): Promise<void>;
//   createCard(column_id?: number): Promise<void>;
//   createColumn(project_id?: number): Promise<void>;
//   createForAuthenticatedUser(): Promise<void>;
//   createForOrg(org?: string): Promise<void>;
//   createForRepo(owner?: string, repo?: string): Promise<void>;
//   delete(project_id?: number): Promise<void>;
//   deleteCard(card_id?: number): Promise<void>;
//   deleteColumn(column_id?: number): Promise<void>;
//   get(project_id?: number): Promise<void>;
//   getCard(card_id?: number): Promise<void>;
//   getColumn(column_id?: number): Promise<void>;
//   listCards(column_id?: number): Promise<void>;
//   listCollaborators(project_id?: number): Promise<void>;
//   listColumns(project_id?: number): Promise<void>;
//   listForOrg(org?: string): Promise<void>;
//   listForRepo(owner?: string, repo?: string): Promise<void>;
//   listForUser(username?: string): Promise<void>;
//   moveCard(card_id?: number): Promise<void>;
//   moveColumn(column_id?: number): Promise<void>;
//   removeCollaborator(project_id?: number, username?: string): Promise<void>;
//   reviewUserPermissionLevel(project_id?: number, username?: string): Promise<void>;
//   update(project_id?: number): Promise<void>;
//   updateCard(card_id?: number): Promise<void>;
//   updateColumn(column_id?: number): Promise<void>;
// }
// export interface PullsApi {
//   checkIfMerged(owner?: string, repo?: string, number?: number): Promise<void>;
//   create(owner?: string, repo?: string): Promise<void>;
//   createComment(owner?: string, repo?: string, number?: number): Promise<void>;
//   createCommentReply(owner?: string, repo?: string, number?: number): Promise<void>;
//   createFromIssue(owner?: string, repo?: string): Promise<void>;
//   createReview(owner?: string, repo?: string, number?: number): Promise<void>;
//   createReviewRequest(owner?: string, repo?: string, number?: number): Promise<void>;
//   deleteComment(owner?: string, repo?: string, comment_id?: number): Promise<void>;
//   deletePendingReview(owner?: string, repo?: string, number?: number, review_id?: number): Promise<void>;
//   deleteReviewRequest(owner?: string, repo?: string, number?: number): Promise<void>;
//   dismissReview(owner?: string, repo?: string, number?: number, review_id?: number): Promise<void>;
//   get(owner?: string, repo?: string, number?: number): Promise<void>;
//   getComment(owner?: string, repo?: string, comment_id?: number): Promise<void>;
//   getCommentsForReview(owner?: string, repo?: string, number?: number, review_id?: number): Promise<void>;
//   getReview(owner?: string, repo?: string, number?: number, review_id?: number): Promise<void>;
//   list(owner?: string, repo?: string): Promise<void>;
//   listComments(owner?: string, repo?: string, number?: number): Promise<void>;
//   listCommentsForRepo(owner?: string, repo?: string): Promise<void>;
//   listCommits(owner?: string, repo?: string, number?: number): Promise<void>;
//   listFiles(owner?: string, repo?: string, number?: number): Promise<void>;
//   listReviewRequests(owner?: string, repo?: string, number?: number): Promise<void>;
//   listReviews(owner?: string, repo?: string, number?: number): Promise<void>;
//   merge(owner?: string, repo?: string, number?: number): Promise<void>;
//   submitReview(owner?: string, repo?: string, number?: number, review_id?: number): Promise<void>;
//   update(owner?: string, repo?: string, number?: number): Promise<void>;
//   updateComment(owner?: string, repo?: string, comment_id?: number): Promise<void>;
//   updateReview(owner?: string, repo?: string, number?: number, review_id?: number): Promise<void>;
// }
// export interface RateLimitApi {
//   get(): Promise<void>;
// }
// export interface ReactionsApi {
//   createForCommitComment(owner?: string, repo?: string, comment_id?: number): Promise<void>;
//   createForIssue(owner?: string, repo?: string, number?: number): Promise<void>;
//   createForIssueComment(owner?: string, repo?: string, comment_id?: number): Promise<void>;
//   createForPullRequestReviewComment(owner?: string, repo?: string, comment_id?: number): Promise<void>;
//   createForTeamDiscussion(team_id?: number, discussion_number?: number): Promise<void>;
//   createForTeamDiscussionComment(team_id?: number, discussion_number?: number, comment_number?: number): Promise<void>;
//   delete(reaction_id?: number): Promise<void>;
//   listForCommitComment(owner?: string, repo?: string, comment_id?: number): Promise<void>;
//   listForIssue(owner?: string, repo?: string, number?: number): Promise<void>;
//   listForIssueComment(owner?: string, repo?: string, comment_id?: number): Promise<void>;
//   listForPullRequestReviewComment(owner?: string, repo?: string, comment_id?: number): Promise<void>;
//   listForTeamDiscussion(team_id?: number, discussion_number?: number): Promise<void>;
//   listForTeamDiscussionComment(team_id?: number, discussion_number?: number, comment_number?: number): Promise<void>;
// }
// export interface ReposApi {
//   acceptInvitation(invitation_id?: number): Promise<void>;
//   addCollaborator(owner?: string, repo?: string, username?: string): Promise<void>;
//   addDeployKey(owner?: string, repo?: string): Promise<void>;
//   addProtectedBranchAdminEnforcement(owner?: string, repo?: string, branch?: string): Promise<void>;
//   addProtectedBranchRequiredSignatures(owner?: string, repo?: string, branch?: string): Promise<void>;
//   addProtectedBranchRequiredStatusChecksContexts(owner?: string, repo?: string, branch?: string): Promise<void>;
//   addProtectedBranchTeamRestrictions(owner?: string, repo?: string, branch?: string): Promise<void>;
//   addProtectedBranchUserRestrictions(owner?: string, repo?: string, branch?: string): Promise<void>;
//   checkCollaborator(owner?: string, repo?: string, username?: string): Promise<void>;
//   compareCommits(owner?: string, repo?: string, base__head?: unknown): Promise<void>;
//   createCommitComment(owner?: string, repo?: string, sha?: string): Promise<void>;
//   createDeployment(owner?: string, repo?: string): Promise<void>;
//   createDeploymentStatus(owner?: string, repo?: string, deployment_id?: number): Promise<void>;
//   createFile(owner?: string, repo?: string, path?: string): Promise<void>;
//   createForAuthenticatedUser(): Promise<void>;
//   createFork(owner?: string, repo?: string): Promise<void>;
//   createHook(owner?: string, repo?: string): Promise<void>;
//   createInOrg(org?: string): Promise<void>;
//   createRelease(owner?: string, repo?: string): Promise<void>;
//   createStatus(owner?: string, repo?: string, sha?: string): Promise<void>;
//   declineInvitation(invitation_id?: number): Promise<void>;
//   delete(owner?: string, repo?: string): Promise<void>;
//   deleteCommitComment(owner?: string, repo?: string, comment_id?: number): Promise<void>;
//   deleteDownload(owner?: string, repo?: string, download_id?: number): Promise<void>;
//   deleteFile(owner?: string, repo?: string, path?: string): Promise<void>;
//   deleteHook(owner?: string, repo?: string, hook_id?: number): Promise<void>;
//   deleteInvitation(owner?: string, repo?: string, invitation_id?: number): Promise<void>;
//   deleteRelease(owner?: string, repo?: string, release_id?: number): Promise<void>;
//   deleteReleaseAsset(owner?: string, repo?: string, asset_id?: number): Promise<void>;
//   get(owner?: string, repo?: string): Promise<void>;
//   getArchiveLink(owner?: string, repo?: string, archive_format?: string, ref?: string): Promise<void>;
//   getBranch(owner?: string, repo?: string, branch?: string): Promise<void>;
//   getBranchProtection(owner?: string, repo?: string, branch?: string): Promise<void>;
//   getClones(owner?: string, repo?: string): Promise<void>;
//   getCodeFrequencyStats(owner?: string, repo?: string): Promise<void>;
//   getCollaboratorPermissionLevel(owner?: string, repo?: string, username?: string): Promise<void>;
//   getCombinedStatusForRef(owner?: string, repo?: string, ref?: string): Promise<void>;
//   getCommit(owner?: string, repo?: string, sha?: string): Promise<void>;
//   getCommitActivityStats(owner?: string, repo?: string): Promise<void>;
//   getCommitComment(owner?: string, repo?: string, comment_id?: number): Promise<void>;
//   getCommitRefSha(owner?: string, repo?: string, ref?: string): Promise<void>;
//   getContents(owner?: string, repo?: string, path?: string): Promise<void>;
//   getContributorsStats(owner?: string, repo?: string): Promise<void>;
//   getDeployKey(owner?: string, repo?: string, key_id?: number): Promise<void>;
//   getDeployment(owner?: string, repo?: string, deployment_id?: number): Promise<void>;
//   getDeploymentStatus(owner?: string, repo?: string, deployment_id?: number, status_id?: number): Promise<void>;
//   getDownload(owner?: string, repo?: string, download_id?: number): Promise<void>;
//   getHook(owner?: string, repo?: string, hook_id?: number): Promise<void>;
//   getLatestPagesBuild(owner?: string, repo?: string): Promise<void>;
//   getLatestRelease(owner?: string, repo?: string): Promise<void>;
//   getPages(owner?: string, repo?: string): Promise<void>;
//   getPagesBuild(owner?: string, repo?: string, build_id?: number): Promise<void>;
//   getParticipationStats(owner?: string, repo?: string): Promise<void>;
//   getProtectedBranchAdminEnforcement(owner?: string, repo?: string, branch?: string): Promise<void>;
//   getProtectedBranchPullRequestReviewEnforcement(owner?: string, repo?: string, branch?: string): Promise<void>;
//   getProtectedBranchRequiredSignatures(owner?: string, repo?: string, branch?: string): Promise<void>;
//   getProtectedBranchRequiredStatusChecks(owner?: string, repo?: string, branch?: string): Promise<void>;
//   getProtectedBranchRestrictions(owner?: string, repo?: string, branch?: string): Promise<void>;
//   getPunchCardStats(owner?: string, repo?: string): Promise<void>;
//   getReadme(owner?: string, repo?: string): Promise<void>;
//   getRelease(owner?: string, repo?: string, release_id?: number): Promise<void>;
//   getReleaseAsset(owner?: string, repo?: string, asset_id?: number): Promise<void>;
//   getReleaseByTag(owner?: string, repo?: string, tag?: string): Promise<void>;
//   getTopPaths(owner?: string, repo?: string): Promise<void>;
//   getTopReferrers(owner?: string, repo?: string): Promise<void>;
//   getViews(owner?: string, repo?: string): Promise<void>;
//   list(): Promise<void>;
//   listAssetsForRelease(owner?: string, repo?: string, release_id?: number): Promise<void>;
//   listBranches(owner?: string, repo?: string): Promise<void>;
//   listCollaborators(owner?: string, repo?: string): Promise<void>;
//   listCommentsForCommit(owner?: string, repo?: string, ref?: string): Promise<void>;
//   listCommitComments(owner?: string, repo?: string): Promise<void>;
//   listCommits(owner?: string, repo?: string): Promise<void>;
//   listContributors(owner?: string, repo?: string): Promise<void>;
//   listDeployKeys(owner?: string, repo?: string): Promise<void>;
//   listDeploymentStatuses(owner?: string, repo?: string, deployment_id?: number): Promise<void>;
//   listDeployments(owner?: string, repo?: string): Promise<void>;
//   listDownloads(owner?: string, repo?: string): Promise<void>;
//   listForOrg(org?: string): Promise<void>;
//   listForUser(username?: string): Promise<void>;
//   listForks(owner?: string, repo?: string): Promise<void>;
//   listHooks(owner?: string, repo?: string): Promise<void>;
//   listInvitations(owner?: string, repo?: string): Promise<void>;
//   listInvitationsForAuthenticatedUser(): Promise<void>;
//   listLanguages(owner?: string, repo?: string): Promise<void>;
//   listPagesBuilds(owner?: string, repo?: string): Promise<void>;
//   listProtectedBranchRequiredStatusChecksContexts(owner?: string, repo?: string, branch?: string): Promise<void>;
//   listProtectedBranchTeamRestrictions(owner?: string, repo?: string, branch?: string): Promise<void>;
//   listProtectedBranchUserRestrictions(owner?: string, repo?: string, branch?: string): Promise<void>;
//   listPublic(): Promise<void>;
//   listReleases(owner?: string, repo?: string): Promise<void>;
//   listStatusesForRef(owner?: string, repo?: string, ref?: string): Promise<void>;
//   listTags(owner?: string, repo?: string): Promise<void>;
//   listTeams(owner?: string, repo?: string): Promise<void>;
//   listTopics(owner?: string, repo?: string): Promise<void>;
//   merge(owner?: string, repo?: string): Promise<void>;
//   pingHook(owner?: string, repo?: string, hook_id?: number): Promise<void>;
//   removeBranchProtection(owner?: string, repo?: string, branch?: string): Promise<void>;
//   removeCollaborator(owner?: string, repo?: string, username?: string): Promise<void>;
//   removeDeployKey(owner?: string, repo?: string, key_id?: number): Promise<void>;
//   removeProtectedBranchAdminEnforcement(owner?: string, repo?: string, branch?: string): Promise<void>;
//   removeProtectedBranchPullRequestReviewEnforcement(owner?: string, repo?: string, branch?: string): Promise<void>;
//   removeProtectedBranchRequiredSignatures(owner?: string, repo?: string, branch?: string): Promise<void>;
//   removeProtectedBranchRequiredStatusChecks(owner?: string, repo?: string, branch?: string): Promise<void>;
//   removeProtectedBranchRequiredStatusChecksContexts(owner?: string, repo?: string, branch?: string): Promise<void>;
//   removeProtectedBranchRestrictions(owner?: string, repo?: string, branch?: string): Promise<void>;
//   removeProtectedBranchTeamRestrictions(owner?: string, repo?: string, branch?: string): Promise<void>;
//   removeProtectedBranchUserRestrictions(owner?: string, repo?: string, branch?: string): Promise<void>;
//   replaceProtectedBranchRequiredStatusChecksContexts(owner?: string, repo?: string, branch?: string): Promise<void>;
//   replaceProtectedBranchTeamRestrictions(owner?: string, repo?: string, branch?: string): Promise<void>;
//   replaceProtectedBranchUserRestrictions(owner?: string, repo?: string, branch?: string): Promise<void>;
//   replaceTopics(owner?: string, repo?: string): Promise<void>;
//   requestPageBuild(owner?: string, repo?: string): Promise<void>;
//   retrieveCommunityProfileMetrics(owner?: string, repo?: string): Promise<void>;
//   testPushHook(owner?: string, repo?: string, hook_id?: number): Promise<void>;
//   transfer(owner?: string, repo?: string): Promise<void>;
//   update(owner?: string, repo?: string): Promise<void>;
//   updateBranchProtection(owner?: string, repo?: string, branch?: string): Promise<void>;
//   updateCommitComment(owner?: string, repo?: string, comment_id?: number): Promise<void>;
//   updateFile(owner?: string, repo?: string, path?: string): Promise<void>;
//   updateHook(owner?: string, repo?: string, hook_id?: number): Promise<void>;
//   updateInformationAboutPagesSite(owner?: string, repo?: string): Promise<void>;
//   updateInvitation(owner?: string, repo?: string, invitation_id?: number): Promise<void>;
//   updateProtectedBranchPullRequestReviewEnforcement(owner?: string, repo?: string, branch?: string): Promise<void>;
//   updateProtectedBranchRequiredStatusChecks(owner?: string, repo?: string, branch?: string): Promise<void>;
//   updateRelease(owner?: string, repo?: string, release_id?: number): Promise<void>;
//   updateReleaseAsset(owner?: string, repo?: string, asset_id?: number): Promise<void>;
//   uploadReleaseAsset(url?: string): Promise<void>;
// }
// export interface SearchApi {
//   code(): Promise<void>;
//   commits(): Promise<void>;
//   issues(): Promise<void>;
//   issuesAndPullRequests(): Promise<void>;
//   labels(): Promise<void>;
//   repos(): Promise<void>;
//   topics(): Promise<void>;
//   users(): Promise<void>;
// }
// export interface TeamsApi {
//   addMember(team_id?: number, username?: string): Promise<void>;
//   addOrUpdateMembership(team_id?: number, username?: string): Promise<void>;
//   addOrUpdateProject(team_id?: number, project_id?: number): Promise<void>;
//   addOrUpdateRepo(team_id?: number, owner?: string, repo?: string): Promise<void>;
//   checkManagesRepo(team_id?: number, owner?: string, repo?: string): Promise<void>;
//   create(org?: string): Promise<void>;
//   createDiscussion(team_id?: number): Promise<void>;
//   createDiscussionComment(team_id?: number, discussion_number?: number): Promise<void>;
//   delete(team_id?: number): Promise<void>;
//   deleteDiscussion(team_id?: number, discussion_number?: number): Promise<void>;
//   deleteDiscussionComment(team_id?: number, discussion_number?: number, comment_number?: number): Promise<void>;
//   get(team_id?: number): Promise<void>;
//   getDiscussion(team_id?: number, discussion_number?: number): Promise<void>;
//   getDiscussionComment(team_id?: number, discussion_number?: number, comment_number?: number): Promise<void>;
//   getMember(team_id?: number, username?: string): Promise<void>;
//   getMembership(team_id?: number, username?: string): Promise<void>;
//   list(org?: string): Promise<void>;
//   listChild(team_id?: number): Promise<void>;
//   listDiscussionComments(team_id?: number, discussion_number?: number): Promise<void>;
//   listDiscussions(team_id?: number): Promise<void>;
//   listForAuthenticatedUser(): Promise<void>;
//   listMembers(team_id?: number): Promise<void>;
//   listPendingInvitations(team_id?: number): Promise<void>;
//   listProjects(team_id?: number): Promise<void>;
//   listRepos(team_id?: number): Promise<void>;
//   removeMember(team_id?: number, username?: string): Promise<void>;
//   removeMembership(team_id?: number, username?: string): Promise<void>;
//   removeProject(team_id?: number, project_id?: number): Promise<void>;
//   removeRepo(team_id?: number, owner?: string, repo?: string): Promise<void>;
//   reviewProject(team_id?: number, project_id?: number): Promise<void>;
//   update(team_id?: number): Promise<void>;
//   updateDiscussion(team_id?: number, discussion_number?: number): Promise<void>;
//   updateDiscussionComment(team_id?: number, discussion_number?: number, comment_number?: number): Promise<void>;
// }
// export interface UsersApi {
//   addEmails(): Promise<void>;
//   block(username?: string): Promise<void>;
//   checkBlocked(username?: string): Promise<void>;
//   checkFollowing(username?: string): Promise<void>;
//   checkFollowingForUser(username?: string, target_user?: string): Promise<void>;
//   createGpgKey(): Promise<void>;
//   createPublicKey(): Promise<void>;
//   deleteEmails(): Promise<void>;
//   deleteGpgKey(gpg_key_id?: number): Promise<void>;
//   deletePublicKey(key_id?: number): Promise<void>;
//   follow(username?: string): Promise<void>;
//   getAuthenticated(): Promise<void>;
//   getByUsername(username?: string): Promise<void>;
//   getContextForUser(username?: string): Promise<void>;
//   getGpgKey(gpg_key_id?: number): Promise<void>;
//   getPublicKey(key_id?: number): Promise<void>;
//   list(): Promise<void>;
//   listBlocked(): Promise<void>;
//   listEmails(): Promise<void>;
//   listFollowersForAuthenticatedUser(): Promise<void>;
//   listFollowersForUser(username?: string): Promise<void>;
//   listFollowingForAuthenticatedUser(): Promise<void>;
//   listFollowingForUser(username?: string): Promise<void>;
//   listGpgKeys(): Promise<void>;
//   listGpgKeysForUser(username?: string): Promise<void>;
//   listPublicEmails(): Promise<void>;
//   listPublicKeys(): Promise<void>;
//   listPublicKeysForUser(username?: string): Promise<void>;
//   togglePrimaryEmailVisibility(): Promise<void>;
//   unblock(username?: string): Promise<void>;
//   unfollow(username?: string): Promise<void>;
//   updateAuthenticated(): Promise<void>;
// }

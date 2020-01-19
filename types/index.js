import render from '@depack/render' // eslint-disable-line

export {}
/**
 * @typedef {{ admin: boolean, github_token: string, linkedin_token: string } & Auth} Session
 * @typedef {Context & { render: typeof render, session: Session }} _Context
 * @typedef {(ctx: _Context, next: Middleware) => Promise} Middleware
 */

/* typal types/context.xml namespace */
/**
 * @typedef {import('mongodb').Db} mongodb.Db
 * @typedef {import('@idio/idio').Context} _idio.Context
 * @typedef {import('@elastic/elasticsearch').Client} elastic.Client
 * @typedef {$Context & _idio.Context} Context `＠record`
 * @typedef {Object} $Context `＠record`
 * @prop {boolean} prod Whether the server is running on production. This will be the case when `NODE_ENV=production`.
 * @prop {string} HOST The address of the backend host. On dev, set to `http://localhost:5000`.
 * @prop {string} STATIC The name of the static host. On dev, set to `http://localhost:5000`.
 * @prop {boolean} CLOSURE Whether serving the _Closure-compiled_ front-end build from `docs`, instead of using `frontend` middleware for development. This will be true on prod, and when running the server via `closure` _package.json_ script.
 * @prop {string} [appName="{{ name }}"] The name of the app. Default `{{ name }}`.
 * @prop {!mongodb.Db} mongo An instance of the database, from `Mongo.db()`.
 * @prop {!elastic.Client} client An instance of the _ElasticSearch_ client.
 */

/* typal types/index.xml namespace */
/**
 * @typedef {import('@idio/github').GithubUser} _idio.GithubUser
 * @typedef {import('@typedefs/goa').Middleware} _goa.Middleware
 * @typedef {Object} LinkedInUser `＠record`
 * @prop {string} id The user ID.
 * @prop {string} firstName The user's first name.
 * @prop {string} lastName The user's last name.
 * @prop {string} profilePicture The URL to the profile picture.
 * @typedef {Object} Auth `＠record`
 * @prop {LinkedInUser} [linkedin_user] User Info.
 * @prop {_idio.GithubUser} [github_user] GitHub User.
 * @prop {string} [csrf] The CSRF token.
 * @typedef {Object} WebsiteComment
 * @prop {string} [_id] id.
 * @prop {boolean} [isAuthor] Whether the current session user wrote this comment.
 * @prop {string} [country] The country name.
 * @prop {string} [ip] The IP address.
 * @prop {string} [name] The display name.
 * @prop {string} [photo] The photo to show.
 * @prop {boolean} [path] The path where the comment was left on.
 * @prop {boolean} [hideGithub] Whether to hide GitHub profile.
 * @prop {string} comment The text of the comment.
 * @prop {string} [subId] The web push subscription ID.
 * @prop {string} [replyTo] The ID of the comment which was replied to.
 * @prop {number} [replies] The number of replies.
 * @prop {Date} date When the comment was added.
 * @prop {_idio.GithubUser} github_user GitHub user, if logged in.
 * @prop {LinkedInUser} linkedin_user LinkedIn user, if logged in.
 * @typedef {Object} PushNotification
 * @prop {string} [title] Title of the notification.
 * @prop {boolean} [body] Body of the notification.
 * @prop {string} [icon] The icon to show.
 * @prop {string} [url] The URL to open on click.
 * @typedef {Object} Subscription
 * @prop {boolean} comments Whether subscribed to comments.
 * @prop {boolean} updates Whether subscribed to updates.
 * @typedef {Object} AuthAppProps
 * @prop {string} host The host.
 * @prop {string} [route="api"] API route. Default `api`.
 * @prop {string} api_key API key.
 */

import { render } from '@idio/idio' // eslint-disable-line

export {}
/**
 * @typedef {{ admin: boolean, github_token: string, linkedin_token: string } & Auth} Session
 * @typedef {Context & { render: typeof render, session: Session }} _Context
 * @typedef {(ctx: _Context, next: Middleware) => Promise} Middleware
 */

/**
 * @typedef {{ params: { api_key: string }, referer: string, refererHost: string, refererPath: string } & _Context} ApiContext
 * @typedef {(ctx: ApiContext, next: Middleware) => Promise} ApiMiddleware
 */

/* typal types/context.xml namespace */
/**
 * @typedef {import('mongodb').Db} mongodb.Db
 * @typedef {import('@idio/idio').Context} _idio.Context
 * @typedef {import('@elastic/elasticsearch').Client} elastic.Client
 * @typedef {IDIO_NAMESPACE.Context} Context `＠record`
 * @typedef {IDIO_NAMESPACE.$Context & _idio.Context} IDIO_NAMESPACE.Context `＠record`
 * @typedef {Object} IDIO_NAMESPACE.$Context `＠record`
 * @prop {IDIO_NAMESPACE.Database} db Database models handle.
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
 * @typedef {import('@idio/idio/types/options').GithubUser} _idio.GithubUser
 * @typedef {import('@typedefs/goa').Middleware} _goa.Middleware
 * @typedef {IDIO_NAMESPACE.LinkedInUser} LinkedInUser `＠record`
 * @typedef {Object} IDIO_NAMESPACE.LinkedInUser `＠record`
 * @prop {string} id The user ID.
 * @prop {string} firstName The user's first name.
 * @prop {string} lastName The user's last name.
 * @prop {string} profilePicture The URL to the profile picture.
 * @typedef {IDIO_NAMESPACE.Auth} Auth `＠record`
 * @typedef {Object} IDIO_NAMESPACE.Auth `＠record`
 * @prop {LinkedInUser} [linkedin_user] User Info.
 * @prop {_idio.GithubUser} [github_user] GitHub User.
 * @prop {string} [csrf] The CSRF token.
 * @typedef {IDIO_NAMESPACE.WebsiteComment} WebsiteComment
 * @typedef {Object} IDIO_NAMESPACE.WebsiteComment
 * @prop {string} [_id] id.
 * @prop {string} [api_key] User ID.
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
 * @typedef {IDIO_NAMESPACE.PushNotification} PushNotification
 * @typedef {Object} IDIO_NAMESPACE.PushNotification
 * @prop {string} [title] Title of the notification.
 * @prop {boolean} [body] Body of the notification.
 * @prop {string} [icon] The icon to show.
 * @prop {string} [url] The URL to open on click.
 * @typedef {IDIO_NAMESPACE.AuthAppProps} AuthAppProps
 * @typedef {Object} IDIO_NAMESPACE.AuthAppProps
 * @prop {string} host The host.
 * @prop {string} [route="api"] API route. Default `api`.
 * @prop {string} api_key API key.
 */

/* typal types/database.xml namespace */
/**
 * @typedef {import('mongodb').Collection} mongodb.Collection
 * @typedef {IDIO_NAMESPACE.Database} Database `＠record`
 * @typedef {Object} IDIO_NAMESPACE.Database `＠record`
 * @prop {!mongodb.Collection} Subscriptions `Subscriptions` collection.
 * @prop {!mongodb.Collection} Comments `Comments` collection.
 * @prop {!mongodb.Collection} Emails `Emails` collection.
 * @prop {!mongodb.Collection} Vapid `Vapid` collection.
 */

/* typal types/collections/Subscription.xml namespace */
/**
 * @typedef {_akashic.Subscription} Subscription `＠record` A record indicating a user subscription.
 * @typedef {Object} _akashic.Subscription `＠record` A record indicating a user subscription.
 * @prop {string} api_key Client ID for which the subscription was created.
 * @prop {boolean} comments Whether subscribed to comments.
 * @prop {boolean} updates Whether subscribed to updates.
 * @prop {string} origin The origin for the subscription (e.g., `akashic.page`).
 * @prop {string} [scope="/"] The scope, e.g., `/scope`. Default `/`.
 * @prop {string} p256dh A [push subscription](https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription/getKey) public encryption key.
 * @prop {string} auth A [push subscription](https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription/getKey) authentication key.
 * @prop {string} endpoint The address of where to send notifications, e.g., `https://fcm.googleapis.com/fcm/send/dDGVev8Tq0c:APA91...`.
 * @prop {!Date} date When the subscription was added or updated.
 */

/* typal types/collections/Email.xml namespace */
/**
 * @typedef {_akashic.Email} Email `＠record` An email left for subscription.
 * @typedef {Object} _akashic.Email `＠record` An email left for subscription.
 * @prop {string} origin The origin where the email was collected from.
 * @prop {string} api_key The client ID for which the email was left.
 * @prop {string} project The project name. If not set, it will be equal to the referer, i.e., different pages might have different subscriptions.
 * @prop {string} referer The page from which the email was collected.
 * @prop {string} email The email address.
 * @prop {!Date} date The date when email was submitted.
 * @prop {string} [github_login] If user logged in on _GitHub_, this is her login.
 * @prop {string} [linkedin_id] If user logged in on _LinkedIn_, this is her app-specific ID.
 */

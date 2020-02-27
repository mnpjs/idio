/**
 * @fileoverview
 * @externs
 */
/* typal types/index.xml externs */
/** @const */
var IDIO_NAMESPACE = {}
/**
 * @record
 */
IDIO_NAMESPACE.LinkedInUser
/**
 * The user ID.
 * @type {string}
 */
IDIO_NAMESPACE.LinkedInUser.prototype.id
/**
 * The user's first name.
 * @type {string}
 */
IDIO_NAMESPACE.LinkedInUser.prototype.firstName
/**
 * The user's last name.
 * @type {string}
 */
IDIO_NAMESPACE.LinkedInUser.prototype.lastName
/**
 * The URL to the profile picture.
 * @type {string}
 */
IDIO_NAMESPACE.LinkedInUser.prototype.profilePicture
/**
 * @record
 */
IDIO_NAMESPACE.Auth
/**
 * User Info.
 * @type {LinkedInUser|undefined}
 */
IDIO_NAMESPACE.Auth.prototype.linkedin_user
/**
 * GitHub User.
 * @type {_idio.GithubUser|undefined}
 */
IDIO_NAMESPACE.Auth.prototype.github_user
/**
 * The CSRF token.
 * @type {string|undefined}
 */
IDIO_NAMESPACE.Auth.prototype.csrf
/**
 * @typedef {{ _id: (string|undefined), api_key: (string|undefined), isAuthor: (boolean|undefined), country: (string|undefined), ip: (string|undefined), name: (string|undefined), photo: (string|undefined), path: (boolean|undefined), hideGithub: (boolean|undefined), comment: string, subId: (string|undefined), replyTo: (string|undefined), replies: (number|undefined), date: Date, github_user: _idio.GithubUser, linkedin_user: LinkedInUser }}
 */
IDIO_NAMESPACE.WebsiteComment
/**
 * @typedef {{ title: (string|undefined), body: (boolean|undefined), icon: (string|undefined), url: (string|undefined) }}
 */
IDIO_NAMESPACE.PushNotification
/**
 * @typedef {{ host: string, route: (string|undefined), api_key: string }}
 */
IDIO_NAMESPACE.AuthAppProps

/**
 * User email.
 * @type {string}
 */
LinkedInUser.prototype.email

/* typal types/collections/Subscription.xml externs */
/** @const */
var _akashic = {}
/**
 * A record indicating a user subscription.
 * @record
 */
_akashic.Subscription
/**
 * Client ID for which the subscription was created.
 * @type {string}
 */
_akashic.Subscription.prototype.api_key
/**
 * Whether subscribed to comments.
 * @type {boolean}
 */
_akashic.Subscription.prototype.comments
/**
 * Whether subscribed to updates.
 * @type {boolean}
 */
_akashic.Subscription.prototype.updates
/**
 * The origin for the subscription (e.g., `akashic.page`).
 * @type {string}
 */
_akashic.Subscription.prototype.origin
/**
 * The scope, e.g., `/scope`. Default `/`.
 * @type {string|undefined}
 */
_akashic.Subscription.prototype.scope
/**
 * A [push subscription](https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription/getKey) public encryption key.
 * @type {string}
 */
_akashic.Subscription.prototype.p256dh
/**
 * A [push subscription](https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription/getKey) authentication key.
 * @type {string}
 */
_akashic.Subscription.prototype.auth
/**
 * The address of where to send notifications, e.g., `https://fcm.googleapis.com/fcm/send/dDGVev8Tq0c:APA91...`.
 * @type {string}
 */
_akashic.Subscription.prototype.endpoint
/**
 * When the subscription was added or updated.
 * @type {!Date}
 */
_akashic.Subscription.prototype.date

/* typal types/collections/Email.xml externs */
/**
 * An email left for subscription.
 * @record
 */
_akashic.Email
/**
 * The origin where the email was collected from.
 * @type {string}
 */
_akashic.Email.prototype.origin
/**
 * The client ID for which the email was left.
 * @type {string}
 */
_akashic.Email.prototype.api_key
/**
 * The project name. If not set, it will be equal to the referer, i.e., different pages might have different subscriptions.
 * @type {string}
 */
_akashic.Email.prototype.project
/**
 * The page from which the email was collected.
 * @type {string}
 */
_akashic.Email.prototype.referer
/**
 * The email address.
 * @type {string}
 */
_akashic.Email.prototype.email
/**
 * The date when email was submitted.
 * @type {!Date}
 */
_akashic.Email.prototype.date
/**
 * If user logged in on _GitHub_, this is her login.
 * @type {string|undefined}
 */
_akashic.Email.prototype.github_login
/**
 * If user logged in on _LinkedIn_, this is her app-specific ID.
 * @type {string|undefined}
 */
_akashic.Email.prototype.linkedin_id

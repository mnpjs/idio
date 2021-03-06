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
/**
 * A record indicating a user subscription.
 * @record
 */
IDIO_NAMESPACE.Subscription
/**
 * Client ID for which the subscription was created.
 * @type {string}
 */
IDIO_NAMESPACE.Subscription.prototype.api_key
/**
 * Whether subscribed to comments.
 * @type {boolean}
 */
IDIO_NAMESPACE.Subscription.prototype.comments
/**
 * Whether subscribed to updates.
 * @type {boolean}
 */
IDIO_NAMESPACE.Subscription.prototype.updates
/**
 * The origin for the subscription (e.g., `akashic.page`).
 * @type {string}
 */
IDIO_NAMESPACE.Subscription.prototype.origin
/**
 * The scope, e.g., `/scope`. Default `/`.
 * @type {string|undefined}
 */
IDIO_NAMESPACE.Subscription.prototype.scope
/**
 * A [push subscription](https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription/getKey) public encryption key.
 * @type {string}
 */
IDIO_NAMESPACE.Subscription.prototype.p256dh
/**
 * A [push subscription](https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription/getKey) authentication key.
 * @type {string}
 */
IDIO_NAMESPACE.Subscription.prototype.auth
/**
 * The address of where to send notifications, e.g., `https://fcm.googleapis.com/fcm/send/dDGVev8Tq0c:APA91...`.
 * @type {string}
 */
IDIO_NAMESPACE.Subscription.prototype.endpoint
/**
 * When the subscription was added or updated.
 * @type {!Date}
 */
IDIO_NAMESPACE.Subscription.prototype.date

/* typal types/collections/Email.xml externs */
/**
 * An email left for subscription.
 * @record
 */
IDIO_NAMESPACE.Email
/**
 * The origin where the email was collected from.
 * @type {string}
 */
IDIO_NAMESPACE.Email.prototype.origin
/**
 * The client ID for which the email was left.
 * @type {string}
 */
IDIO_NAMESPACE.Email.prototype.api_key
/**
 * The project name. If not set, it will be equal to the referer, i.e., different pages might have different subscriptions.
 * @type {string}
 */
IDIO_NAMESPACE.Email.prototype.project
/**
 * The page from which the email was collected.
 * @type {string}
 */
IDIO_NAMESPACE.Email.prototype.referer
/**
 * The email address.
 * @type {string}
 */
IDIO_NAMESPACE.Email.prototype.email
/**
 * The date when email was submitted.
 * @type {!Date}
 */
IDIO_NAMESPACE.Email.prototype.date
/**
 * If user logged in on _GitHub_, this is her login.
 * @type {string|undefined}
 */
IDIO_NAMESPACE.Email.prototype.github_login
/**
 * If user logged in on _LinkedIn_, this is her app-specific ID.
 * @type {string|undefined}
 */
IDIO_NAMESPACE.Email.prototype.linkedin_id

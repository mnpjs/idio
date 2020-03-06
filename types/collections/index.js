export {}

/* typal types/collections/Subscription.xml namespace */
/**
 * @typedef {IDIO_NAMESPACE.Subscription} Subscription `＠record` A record indicating a user subscription.
 * @typedef {Object} IDIO_NAMESPACE.Subscription `＠record` A record indicating a user subscription.
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
 * @typedef {IDIO_NAMESPACE.Email} Email `＠record` An email left for subscription.
 * @typedef {Object} IDIO_NAMESPACE.Email `＠record` An email left for subscription.
 * @prop {string} origin The origin where the email was collected from.
 * @prop {string} api_key The client ID for which the email was left.
 * @prop {string} project The project name. If not set, it will be equal to the referer, i.e., different pages might have different subscriptions.
 * @prop {string} referer The page from which the email was collected.
 * @prop {string} email The email address.
 * @prop {!Date} date The date when email was submitted.
 * @prop {string} [github_login] If user logged in on _GitHub_, this is her login.
 * @prop {string} [linkedin_id] If user logged in on _LinkedIn_, this is her app-specific ID.
 */

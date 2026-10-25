/**
 * Demo-stand access gate.
 *
 * The password step and the registration form are off temporarily: the stand is
 * handed out as a plain link. This is a switch, not a removal — `LoginPage` stays
 * in place so the gate comes back by flipping this one constant to `true`.
 * Nothing else needs changing: `ProtectedRoute` resumes checking `brainform_auth`
 * and the `/` route shows `LoginPage` again.
 *
 * While the gate is off, no lead is captured: `analytics.trackLogin` is only
 * called from the form, so it never fires. A visitor who passed the form BEFORE
 * the gate was switched off still has `brainform_user` in localStorage, and that
 * record is why `analytics.getUserInfo` consults this constant too — without it,
 * their name, email and company would keep riding on every event while they are
 * shown no form at all.
 */
export const REQUIRE_LOGIN = false;

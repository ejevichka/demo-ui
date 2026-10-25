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
 * called from the form, and `brainform_user` never reaches localStorage, so
 * analytics events carry no name, email or company.
 */
export const REQUIRE_LOGIN = false;

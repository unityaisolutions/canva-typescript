// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

/**
 * Metadata for the user, consisting of the User ID, Team ID, and display name.
 */
export interface TeamUser {
  /**
   * The name of the user as shown in the Canva UI.
   */
  display_name?: string;

  /**
   * The ID of the user's Canva Team.
   */
  team_id?: string;

  /**
   * The ID of the user.
   */
  user_id?: string;
}

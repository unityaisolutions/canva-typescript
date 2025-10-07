// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, Endpoint, HandlerFunction } from './types';

export { Metadata, Endpoint, HandlerFunction };

import retrieve_jwks_apps from './apps/retrieve-jwks-apps';
import retrieve_assets from './assets/retrieve-assets';
import update_assets from './assets/update-assets';
import delete_assets from './assets/delete-assets';
import create_asset_uploads from './asset-uploads/create-asset-uploads';
import retrieve_asset_uploads from './asset-uploads/retrieve-asset-uploads';
import create_url_asset_uploads from './url-asset-uploads/create-url-asset-uploads';
import retrieve_url_asset_uploads from './url-asset-uploads/retrieve-url-asset-uploads';
import create_autofills from './autofills/create-autofills';
import retrieve_autofills from './autofills/retrieve-autofills';
import retrieve_brand_templates from './brand-templates/retrieve-brand-templates';
import list_brand_templates from './brand-templates/list-brand-templates';
import retrieve_dataset_brand_templates from './brand-templates/retrieve-dataset-brand-templates';
import create_reply_comments from './comments/create-reply-comments';
import create_thread_comments from './comments/create-thread-comments';
import create_designs from './designs/create-designs';
import retrieve_designs from './designs/retrieve-designs';
import list_designs from './designs/list-designs';
import create_designs_comments from './designs/comments/create-designs-comments';
import retrieve_designs_comments from './designs/comments/retrieve-designs-comments';
import create_comments_designs_replies from './designs/comments/replies/create-comments-designs-replies';
import retrieve_comments_designs_replies from './designs/comments/replies/retrieve-comments-designs-replies';
import list_comments_designs_replies from './designs/comments/replies/list-comments-designs-replies';
import retrieve_designs_pages from './designs/pages/retrieve-designs-pages';
import retrieve_designs_export_formats from './designs/export-formats/retrieve-designs-export-formats';
import retrieve_keys_connect from './connect/retrieve-keys-connect';
import create_imports from './imports/create-imports';
import retrieve_imports from './imports/retrieve-imports';
import create_url_imports from './url-imports/create-url-imports';
import retrieve_url_imports from './url-imports/retrieve-url-imports';
import create_exports from './exports/create-exports';
import retrieve_exports from './exports/retrieve-exports';
import create_folders from './folders/create-folders';
import retrieve_folders from './folders/retrieve-folders';
import update_folders from './folders/update-folders';
import delete_folders from './folders/delete-folders';
import list_items_folders from './folders/list-items-folders';
import move_item_folders from './folders/move-item-folders';
import create_token_oauth from './oauth/create-token-oauth';
import introspect_token_oauth from './oauth/introspect-token-oauth';
import revoke_token_oauth from './oauth/revoke-token-oauth';
import create_resizes from './resizes/create-resizes';
import retrieve_resizes from './resizes/retrieve-resizes';
import retrieve_users_me from './users/me/retrieve-users-me';
import list_capabilities_users_me from './users/me/list-capabilities-users-me';
import retrieve_profile_users_me from './users/me/retrieve-profile-users-me';

export const endpoints: Endpoint[] = [];

function addEndpoint(endpoint: Endpoint) {
  endpoints.push(endpoint);
}

addEndpoint(retrieve_jwks_apps);
addEndpoint(retrieve_assets);
addEndpoint(update_assets);
addEndpoint(delete_assets);
addEndpoint(create_asset_uploads);
addEndpoint(retrieve_asset_uploads);
addEndpoint(create_url_asset_uploads);
addEndpoint(retrieve_url_asset_uploads);
addEndpoint(create_autofills);
addEndpoint(retrieve_autofills);
addEndpoint(retrieve_brand_templates);
addEndpoint(list_brand_templates);
addEndpoint(retrieve_dataset_brand_templates);
addEndpoint(create_reply_comments);
addEndpoint(create_thread_comments);
addEndpoint(create_designs);
addEndpoint(retrieve_designs);
addEndpoint(list_designs);
addEndpoint(create_designs_comments);
addEndpoint(retrieve_designs_comments);
addEndpoint(create_comments_designs_replies);
addEndpoint(retrieve_comments_designs_replies);
addEndpoint(list_comments_designs_replies);
addEndpoint(retrieve_designs_pages);
addEndpoint(retrieve_designs_export_formats);
addEndpoint(retrieve_keys_connect);
addEndpoint(create_imports);
addEndpoint(retrieve_imports);
addEndpoint(create_url_imports);
addEndpoint(retrieve_url_imports);
addEndpoint(create_exports);
addEndpoint(retrieve_exports);
addEndpoint(create_folders);
addEndpoint(retrieve_folders);
addEndpoint(update_folders);
addEndpoint(delete_folders);
addEndpoint(list_items_folders);
addEndpoint(move_item_folders);
addEndpoint(create_token_oauth);
addEndpoint(introspect_token_oauth);
addEndpoint(revoke_token_oauth);
addEndpoint(create_resizes);
addEndpoint(retrieve_resizes);
addEndpoint(retrieve_users_me);
addEndpoint(list_capabilities_users_me);
addEndpoint(retrieve_profile_users_me);

export type Filter = {
  type: 'resource' | 'operation' | 'tag' | 'tool';
  op: 'include' | 'exclude';
  value: string;
};

export function query(filters: Filter[], endpoints: Endpoint[]): Endpoint[] {
  const allExcludes = filters.length > 0 && filters.every((filter) => filter.op === 'exclude');
  const unmatchedFilters = new Set(filters);

  const filtered = endpoints.filter((endpoint: Endpoint) => {
    let included = false || allExcludes;

    for (const filter of filters) {
      if (match(filter, endpoint)) {
        unmatchedFilters.delete(filter);
        included = filter.op === 'include';
      }
    }

    return included;
  });

  // Check if any filters didn't match
  const unmatched = Array.from(unmatchedFilters).filter((f) => f.type === 'tool' || f.type === 'resource');
  if (unmatched.length > 0) {
    throw new Error(
      `The following filters did not match any endpoints: ${unmatched
        .map((f) => `${f.type}=${f.value}`)
        .join(', ')}`,
    );
  }

  return filtered;
}

function match({ type, value }: Filter, endpoint: Endpoint): boolean {
  switch (type) {
    case 'resource': {
      const regexStr = '^' + normalizeResource(value).replace(/\*/g, '.*') + '$';
      const regex = new RegExp(regexStr);
      return regex.test(normalizeResource(endpoint.metadata.resource));
    }
    case 'operation':
      return endpoint.metadata.operation === value;
    case 'tag':
      return endpoint.metadata.tags.includes(value);
    case 'tool':
      return endpoint.tool.name === value;
  }
}

function normalizeResource(resource: string): string {
  return resource.toLowerCase().replace(/[^a-z.*\-_]*/g, '');
}

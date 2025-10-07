# Shared

Types:

- <code><a href="./src/resources/shared.ts">TeamUser</a></code>

# Apps

Types:

- <code><a href="./src/resources/apps.ts">AppRetrieveJwksResponse</a></code>

Methods:

- <code title="get /v1/apps/{appId}/jwks">client.apps.<a href="./src/resources/apps.ts">retrieveJwks</a>(appID) -> AppRetrieveJwksResponse</code>

# Assets

Types:

- <code><a href="./src/resources/assets.ts">Asset</a></code>
- <code><a href="./src/resources/assets.ts">AssetType</a></code>
- <code><a href="./src/resources/assets.ts">Thumbnail</a></code>
- <code><a href="./src/resources/assets.ts">AssetRetrieveResponse</a></code>
- <code><a href="./src/resources/assets.ts">AssetUpdateResponse</a></code>

Methods:

- <code title="get /v1/assets/{assetId}">client.assets.<a href="./src/resources/assets.ts">retrieve</a>(assetID) -> AssetRetrieveResponse</code>
- <code title="patch /v1/assets/{assetId}">client.assets.<a href="./src/resources/assets.ts">update</a>(assetID, { ...params }) -> AssetUpdateResponse</code>
- <code title="delete /v1/assets/{assetId}">client.assets.<a href="./src/resources/assets.ts">delete</a>(assetID) -> void</code>

# AssetUploads

Types:

- <code><a href="./src/resources/asset-uploads.ts">AssetUploadJob</a></code>
- <code><a href="./src/resources/asset-uploads.ts">AssetUploadCreateResponse</a></code>
- <code><a href="./src/resources/asset-uploads.ts">AssetUploadRetrieveResponse</a></code>

Methods:

- <code title="post /v1/asset-uploads">client.assetUploads.<a href="./src/resources/asset-uploads.ts">create</a>(body, { ...params }) -> AssetUploadCreateResponse</code>
- <code title="get /v1/asset-uploads/{jobId}">client.assetUploads.<a href="./src/resources/asset-uploads.ts">retrieve</a>(jobID) -> AssetUploadRetrieveResponse</code>

# URLAssetUploads

Types:

- <code><a href="./src/resources/url-asset-uploads.ts">URLAssetUploadCreateResponse</a></code>
- <code><a href="./src/resources/url-asset-uploads.ts">URLAssetUploadRetrieveResponse</a></code>

Methods:

- <code title="post /v1/url-asset-uploads">client.urlAssetUploads.<a href="./src/resources/url-asset-uploads.ts">create</a>({ ...params }) -> URLAssetUploadCreateResponse</code>
- <code title="get /v1/url-asset-uploads/{jobId}">client.urlAssetUploads.<a href="./src/resources/url-asset-uploads.ts">retrieve</a>(jobID) -> URLAssetUploadRetrieveResponse</code>

# Autofills

Types:

- <code><a href="./src/resources/autofills.ts">DesignAutofillJob</a></code>
- <code><a href="./src/resources/autofills.ts">AutofillCreateResponse</a></code>
- <code><a href="./src/resources/autofills.ts">AutofillRetrieveResponse</a></code>

Methods:

- <code title="post /v1/autofills">client.autofills.<a href="./src/resources/autofills.ts">create</a>({ ...params }) -> AutofillCreateResponse</code>
- <code title="get /v1/autofills/{jobId}">client.autofills.<a href="./src/resources/autofills.ts">retrieve</a>(jobID) -> AutofillRetrieveResponse</code>

# BrandTemplates

Types:

- <code><a href="./src/resources/brand-templates.ts">BrandTemplate</a></code>
- <code><a href="./src/resources/brand-templates.ts">OwnershipType</a></code>
- <code><a href="./src/resources/brand-templates.ts">SortByType</a></code>
- <code><a href="./src/resources/brand-templates.ts">BrandTemplateRetrieveResponse</a></code>
- <code><a href="./src/resources/brand-templates.ts">BrandTemplateListResponse</a></code>
- <code><a href="./src/resources/brand-templates.ts">BrandTemplateRetrieveDatasetResponse</a></code>

Methods:

- <code title="get /v1/brand-templates/{brandTemplateId}">client.brandTemplates.<a href="./src/resources/brand-templates.ts">retrieve</a>(brandTemplateID) -> BrandTemplateRetrieveResponse</code>
- <code title="get /v1/brand-templates">client.brandTemplates.<a href="./src/resources/brand-templates.ts">list</a>({ ...params }) -> BrandTemplateListResponse</code>
- <code title="get /v1/brand-templates/{brandTemplateId}/dataset">client.brandTemplates.<a href="./src/resources/brand-templates.ts">retrieveDataset</a>(brandTemplateID) -> BrandTemplateRetrieveDatasetResponse</code>

# Comments

Types:

- <code><a href="./src/resources/comments.ts">CommentObject</a></code>
- <code><a href="./src/resources/comments.ts">CommentObjectInput</a></code>
- <code><a href="./src/resources/comments.ts">ParentComment</a></code>
- <code><a href="./src/resources/comments.ts">ReplyComment</a></code>
- <code><a href="./src/resources/comments.ts">User</a></code>
- <code><a href="./src/resources/comments.ts">CommentCreateReplyResponse</a></code>
- <code><a href="./src/resources/comments.ts">CommentCreateThreadResponse</a></code>

Methods:

- <code title="post /v1/comments/{commentId}/replies">client.comments.<a href="./src/resources/comments.ts">createReply</a>(commentID, { ...params }) -> CommentCreateReplyResponse</code>
- <code title="post /v1/comments">client.comments.<a href="./src/resources/comments.ts">createThread</a>({ ...params }) -> CommentCreateThreadResponse</code>

# Designs

Types:

- <code><a href="./src/resources/designs/designs.ts">CustomDesignTypeInput</a></code>
- <code><a href="./src/resources/designs/designs.ts">Design</a></code>
- <code><a href="./src/resources/designs/designs.ts">DesignLinks</a></code>
- <code><a href="./src/resources/designs/designs.ts">DesignTypeInput</a></code>
- <code><a href="./src/resources/designs/designs.ts">PresetDesignTypeInput</a></code>
- <code><a href="./src/resources/designs/designs.ts">DesignCreateResponse</a></code>
- <code><a href="./src/resources/designs/designs.ts">DesignRetrieveResponse</a></code>
- <code><a href="./src/resources/designs/designs.ts">DesignListResponse</a></code>

Methods:

- <code title="post /v1/designs">client.designs.<a href="./src/resources/designs/designs.ts">create</a>({ ...params }) -> DesignCreateResponse</code>
- <code title="get /v1/designs/{designId}">client.designs.<a href="./src/resources/designs/designs.ts">retrieve</a>(designID) -> DesignRetrieveResponse</code>
- <code title="get /v1/designs">client.designs.<a href="./src/resources/designs/designs.ts">list</a>({ ...params }) -> DesignListResponse</code>

## Comments

Types:

- <code><a href="./src/resources/designs/comments/comments.ts">Thread</a></code>
- <code><a href="./src/resources/designs/comments/comments.ts">CommentCreateResponse</a></code>
- <code><a href="./src/resources/designs/comments/comments.ts">CommentRetrieveResponse</a></code>

Methods:

- <code title="post /v1/designs/{designId}/comments">client.designs.comments.<a href="./src/resources/designs/comments/comments.ts">create</a>(designID, { ...params }) -> CommentCreateResponse</code>
- <code title="get /v1/designs/{designId}/comments/{threadId}">client.designs.comments.<a href="./src/resources/designs/comments/comments.ts">retrieve</a>(threadID, { ...params }) -> CommentRetrieveResponse</code>

### Replies

Types:

- <code><a href="./src/resources/designs/comments/replies.ts">CommentContent</a></code>
- <code><a href="./src/resources/designs/comments/replies.ts">Reply</a></code>
- <code><a href="./src/resources/designs/comments/replies.ts">ReplyCreateResponse</a></code>
- <code><a href="./src/resources/designs/comments/replies.ts">ReplyRetrieveResponse</a></code>
- <code><a href="./src/resources/designs/comments/replies.ts">ReplyListResponse</a></code>

Methods:

- <code title="post /v1/designs/{designId}/comments/{threadId}/replies">client.designs.comments.replies.<a href="./src/resources/designs/comments/replies.ts">create</a>(threadID, { ...params }) -> ReplyCreateResponse</code>
- <code title="get /v1/designs/{designId}/comments/{threadId}/replies/{replyId}">client.designs.comments.replies.<a href="./src/resources/designs/comments/replies.ts">retrieve</a>(replyID, { ...params }) -> ReplyRetrieveResponse</code>
- <code title="get /v1/designs/{designId}/comments/{threadId}/replies">client.designs.comments.replies.<a href="./src/resources/designs/comments/replies.ts">list</a>(threadID, { ...params }) -> ReplyListResponse</code>

## Pages

Types:

- <code><a href="./src/resources/designs/pages.ts">PageRetrieveResponse</a></code>

Methods:

- <code title="get /v1/designs/{designId}/pages">client.designs.pages.<a href="./src/resources/designs/pages.ts">retrieve</a>(designID, { ...params }) -> PageRetrieveResponse</code>

## ExportFormats

Types:

- <code><a href="./src/resources/designs/export-formats.ts">ExportFormatRetrieveResponse</a></code>

Methods:

- <code title="get /v1/designs/{designId}/export-formats">client.designs.exportFormats.<a href="./src/resources/designs/export-formats.ts">retrieve</a>(designID) -> ExportFormatRetrieveResponse</code>

# Connect

Types:

- <code><a href="./src/resources/connect.ts">ConnectRetrieveKeysResponse</a></code>

Methods:

- <code title="get /v1/connect/keys">client.connect.<a href="./src/resources/connect.ts">retrieveKeys</a>() -> ConnectRetrieveKeysResponse</code>

# Imports

Types:

- <code><a href="./src/resources/imports.ts">DesignImportJob</a></code>
- <code><a href="./src/resources/imports.ts">ImportCreateResponse</a></code>
- <code><a href="./src/resources/imports.ts">ImportRetrieveResponse</a></code>

Methods:

- <code title="post /v1/imports">client.imports.<a href="./src/resources/imports.ts">create</a>(body, { ...params }) -> ImportCreateResponse</code>
- <code title="get /v1/imports/{jobId}">client.imports.<a href="./src/resources/imports.ts">retrieve</a>(jobID) -> ImportRetrieveResponse</code>

# URLImports

Types:

- <code><a href="./src/resources/url-imports.ts">URLImportCreateResponse</a></code>
- <code><a href="./src/resources/url-imports.ts">URLImportRetrieveResponse</a></code>

Methods:

- <code title="post /v1/url-imports">client.urlImports.<a href="./src/resources/url-imports.ts">create</a>({ ...params }) -> URLImportCreateResponse</code>
- <code title="get /v1/url-imports/{jobId}">client.urlImports.<a href="./src/resources/url-imports.ts">retrieve</a>(jobID) -> URLImportRetrieveResponse</code>

# Exports

Types:

- <code><a href="./src/resources/exports.ts">ExportJob</a></code>
- <code><a href="./src/resources/exports.ts">ExportQuality</a></code>
- <code><a href="./src/resources/exports.ts">ExportCreateResponse</a></code>
- <code><a href="./src/resources/exports.ts">ExportRetrieveResponse</a></code>

Methods:

- <code title="post /v1/exports">client.exports.<a href="./src/resources/exports.ts">create</a>({ ...params }) -> ExportCreateResponse</code>
- <code title="get /v1/exports/{exportId}">client.exports.<a href="./src/resources/exports.ts">retrieve</a>(exportID) -> ExportRetrieveResponse</code>

# Folders

Types:

- <code><a href="./src/resources/folders.ts">Folder</a></code>
- <code><a href="./src/resources/folders.ts">FolderCreateResponse</a></code>
- <code><a href="./src/resources/folders.ts">FolderRetrieveResponse</a></code>
- <code><a href="./src/resources/folders.ts">FolderUpdateResponse</a></code>
- <code><a href="./src/resources/folders.ts">FolderListItemsResponse</a></code>

Methods:

- <code title="post /v1/folders">client.folders.<a href="./src/resources/folders.ts">create</a>({ ...params }) -> FolderCreateResponse</code>
- <code title="get /v1/folders/{folderId}">client.folders.<a href="./src/resources/folders.ts">retrieve</a>(folderID) -> FolderRetrieveResponse</code>
- <code title="patch /v1/folders/{folderId}">client.folders.<a href="./src/resources/folders.ts">update</a>(folderID, { ...params }) -> FolderUpdateResponse</code>
- <code title="delete /v1/folders/{folderId}">client.folders.<a href="./src/resources/folders.ts">delete</a>(folderID) -> void</code>
- <code title="get /v1/folders/{folderId}/items">client.folders.<a href="./src/resources/folders.ts">listItems</a>(folderID, { ...params }) -> FolderListItemsResponse</code>
- <code title="post /v1/folders/move">client.folders.<a href="./src/resources/folders.ts">moveItem</a>({ ...params }) -> void</code>

# OAuth

Types:

- <code><a href="./src/resources/oauth.ts">OAuthCreateTokenResponse</a></code>
- <code><a href="./src/resources/oauth.ts">OAuthIntrospectTokenResponse</a></code>
- <code><a href="./src/resources/oauth.ts">OAuthRevokeTokenResponse</a></code>

Methods:

- <code title="post /v1/oauth/token">client.oauth.<a href="./src/resources/oauth.ts">createToken</a>({ ...params }) -> OAuthCreateTokenResponse</code>
- <code title="post /v1/oauth/introspect">client.oauth.<a href="./src/resources/oauth.ts">introspectToken</a>({ ...params }) -> OAuthIntrospectTokenResponse</code>
- <code title="post /v1/oauth/revoke">client.oauth.<a href="./src/resources/oauth.ts">revokeToken</a>({ ...params }) -> unknown</code>

# Resizes

Types:

- <code><a href="./src/resources/resizes.ts">DesignResizeJob</a></code>
- <code><a href="./src/resources/resizes.ts">DesignSummary</a></code>
- <code><a href="./src/resources/resizes.ts">ResizeCreateResponse</a></code>
- <code><a href="./src/resources/resizes.ts">ResizeRetrieveResponse</a></code>

Methods:

- <code title="post /v1/resizes">client.resizes.<a href="./src/resources/resizes.ts">create</a>({ ...params }) -> ResizeCreateResponse</code>
- <code title="get /v1/resizes/{jobId}">client.resizes.<a href="./src/resources/resizes.ts">retrieve</a>(jobID) -> ResizeRetrieveResponse</code>

# Users

## Me

Types:

- <code><a href="./src/resources/users/me.ts">TeamUserSummary</a></code>
- <code><a href="./src/resources/users/me.ts">MeRetrieveResponse</a></code>
- <code><a href="./src/resources/users/me.ts">MeListCapabilitiesResponse</a></code>
- <code><a href="./src/resources/users/me.ts">MeRetrieveProfileResponse</a></code>

Methods:

- <code title="get /v1/users/me">client.users.me.<a href="./src/resources/users/me.ts">retrieve</a>() -> MeRetrieveResponse</code>
- <code title="get /v1/users/me/capabilities">client.users.me.<a href="./src/resources/users/me.ts">listCapabilities</a>() -> MeListCapabilitiesResponse</code>
- <code title="get /v1/users/me/profile">client.users.me.<a href="./src/resources/users/me.ts">retrieveProfile</a>() -> MeRetrieveProfileResponse</code>

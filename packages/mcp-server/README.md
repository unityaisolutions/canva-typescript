# Canva TypeScript MCP Server

It is generated with [Stainless](https://www.stainless.com/).

## Installation

### Building

Because it's not published yet, clone the repo and build it:

```sh
git clone git@github.com:stainless-sdks/canva-typescript.git
cd canva-typescript
./scripts/bootstrap
./scripts/build
```

### Running

```sh
# set env vars as needed
export CANVA_USERNAME="My Username"
export CANVA_PASSWORD="My Password"
node ./packages/mcp-server/dist/index.js
```

> [!NOTE]
> Once this package is [published to npm](https://www.stainless.com/docs/guides/publish), this will become: `npx -y canva-mcp`

### Via MCP Client

[Build the project](#building) as mentioned above.

There is a partial list of existing clients at [modelcontextprotocol.io](https://modelcontextprotocol.io/clients). If you already
have a client, consult their documentation to install the MCP server.

For clients with a configuration JSON, it might look something like this:

```json
{
  "mcpServers": {
    "canva_api": {
      "command": "node",
      "args": ["/path/to/local/canva-typescript/packages/mcp-server", "--client=claude", "--tools=dynamic"],
      "env": {
        "CANVA_USERNAME": "My Username",
        "CANVA_PASSWORD": "My Password"
      }
    }
  }
}
```

## Exposing endpoints to your MCP Client

There are two ways to expose endpoints as tools in the MCP server:

1. Exposing one tool per endpoint, and filtering as necessary
2. Exposing a set of tools to dynamically discover and invoke endpoints from the API

### Filtering endpoints and tools

You can run the package on the command line to discover and filter the set of tools that are exposed by the
MCP Server. This can be helpful for large APIs where including all endpoints at once is too much for your AI's
context window.

You can filter by multiple aspects:

- `--tool` includes a specific tool by name
- `--resource` includes all tools under a specific resource, and can have wildcards, e.g. `my.resource*`
- `--operation` includes just read (get/list) or just write operations

### Dynamic tools

If you specify `--tools=dynamic` to the MCP server, instead of exposing one tool per endpoint in the API, it will
expose the following tools:

1. `list_api_endpoints` - Discovers available endpoints, with optional filtering by search query
2. `get_api_endpoint_schema` - Gets detailed schema information for a specific endpoint
3. `invoke_api_endpoint` - Executes any endpoint with the appropriate parameters

This allows you to have the full set of API endpoints available to your MCP Client, while not requiring that all
of their schemas be loaded into context at once. Instead, the LLM will automatically use these tools together to
search for, look up, and invoke endpoints dynamically. However, due to the indirect nature of the schemas, it
can struggle to provide the correct properties a bit more than when tools are imported explicitly. Therefore,
you can opt-in to explicit tools, the dynamic tools, or both.

See more information with `--help`.

All of these command-line options can be repeated, combined together, and have corresponding exclusion versions (e.g. `--no-tool`).

Use `--list` to see the list of available tools, or see below.

### Specifying the MCP Client

Different clients have varying abilities to handle arbitrary tools and schemas.

You can specify the client you are using with the `--client` argument, and the MCP server will automatically
serve tools and schemas that are more compatible with that client.

- `--client=<type>`: Set all capabilities based on a known MCP client

  - Valid values: `openai-agents`, `claude`, `claude-code`, `cursor`
  - Example: `--client=cursor`

Additionally, if you have a client not on the above list, or the client has gotten better
over time, you can manually enable or disable certain capabilities:

- `--capability=<name>`: Specify individual client capabilities
  - Available capabilities:
    - `top-level-unions`: Enable support for top-level unions in tool schemas
    - `valid-json`: Enable JSON string parsing for arguments
    - `refs`: Enable support for $ref pointers in schemas
    - `unions`: Enable support for union types (anyOf) in schemas
    - `formats`: Enable support for format validations in schemas (e.g. date-time, email)
    - `tool-name-length=N`: Set maximum tool name length to N characters
  - Example: `--capability=top-level-unions --capability=tool-name-length=40`
  - Example: `--capability=top-level-unions,tool-name-length=40`

### Examples

1. Filter for read operations on cards:

```bash
--resource=cards --operation=read
```

2. Exclude specific tools while including others:

```bash
--resource=cards --no-tool=create_cards
```

3. Configure for Cursor client with custom max tool name length:

```bash
--client=cursor --capability=tool-name-length=40
```

4. Complex filtering with multiple criteria:

```bash
--resource=cards,accounts --operation=read --tag=kyc --no-tool=create_cards
```

## Running remotely

Launching the client with `--transport=http` launches the server as a remote server using Streamable HTTP transport. The `--port` setting can choose the port it will run on, and the `--socket` setting allows it to run on a Unix socket.

Authorization can be provided via the `Authorization` header using the Basic scheme.

Additionally, authorization can be provided via the following headers:
| Header | Equivalent client option | Security scheme |
| ------------------ | ------------------------ | --------------- |
| `x-canva-username` | `username` | basicAuth |
| `x-canva-password` | `password` | basicAuth |

A configuration JSON for this server might look like this, assuming the server is hosted at `http://localhost:3000`:

```json
{
  "mcpServers": {
    "canva_api": {
      "url": "http://localhost:3000",
      "headers": {
        "Authorization": "Basic <auth value>"
      }
    }
  }
}
```

The command-line arguments for filtering tools and specifying clients can also be used as query parameters in the URL.
For example, to exclude specific tools while including others, use the URL:

```
http://localhost:3000?resource=cards&resource=accounts&no_tool=create_cards
```

Or, to configure for the Cursor client, with a custom max tool name length, use the URL:

```
http://localhost:3000?client=cursor&capability=tool-name-length%3D40
```

## Importing the tools and server individually

```js
// Import the server, generated endpoints, or the init function
import { server, endpoints, init } from "canva-mcp/server";

// import a specific tool
import retrieveJwksApps from "canva-mcp/tools/apps/retrieve-jwks-apps";

// initialize the server and all endpoints
init({ server, endpoints });

// manually start server
const transport = new StdioServerTransport();
await server.connect(transport);

// or initialize your own server with specific tools
const myServer = new McpServer(...);

// define your own endpoint
const myCustomEndpoint = {
  tool: {
    name: 'my_custom_tool',
    description: 'My custom tool',
    inputSchema: zodToJsonSchema(z.object({ a_property: z.string() })),
  },
  handler: async (client: client, args: any) => {
    return { myResponse: 'Hello world!' };
  })
};

// initialize the server with your custom endpoints
init({ server: myServer, endpoints: [retrieveJwksApps, myCustomEndpoint] });
```

## Available Tools

The following tools are available in this MCP server.

### Resource `apps`:

- `retrieve_jwks_apps` (`read`): Returns the Json Web Key Set (public keys) of an app. These keys are used to
  verify JWTs sent to app backends.

### Resource `assets`:

- `retrieve_assets` (`read`): You can retrieve the metadata of an asset by specifying its `assetId`.
- `update_assets` (`write`): You can update the name and tags of an asset by specifying its `assetId`. Updating the tags
  replaces all existing tags of the asset.
- `delete_assets` (`write`): You can delete an asset by specifying its `assetId`. This operation mirrors the behavior
  in the Canva UI. Deleting an item moves it to the trash.
  Deleting an asset doesn't remove it from designs that already use it.

### Resource `asset_uploads`:

- `create_asset_uploads` (`write`): Starts a new [asynchronous job](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints) to upload an asset to the user's content library. Supported file types for assets are listed in the [Assets API overview](https://www.canva.dev/docs/connect/api-reference/assets/).

  The request format for this endpoint is an `application/octet-stream` body of bytes. Attach
  information about the upload using an `Asset-Upload-Metadata` header.

  <Note>

  For more information on the workflow for using asynchronous jobs, see [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints). You can check the status and get the results of asset upload jobs created with this API using the [Get asset upload job API](https://www.canva.dev/docs/connect/api-reference/assets/get-asset-upload-job/).

  </Note>

- `retrieve_asset_uploads` (`read`): Get the result of an asset upload job that was created using the [Create asset upload job API](https://www.canva.dev/docs/connect/api-reference/assets/create-asset-upload-job/).

  You might need to make multiple requests to this endpoint until you get a `success` or `failed` status. For more information on the workflow for using asynchronous jobs, see [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints).

### Resource `url_asset_uploads`:

- `create_url_asset_uploads` (`write`): <Warning>

  This API is currently provided as a preview. Be aware of the following:

  - There might be unannounced breaking changes.
  - Any breaking changes to preview APIs won't produce a new [API version](https://www.canva.dev/docs/connect/versions/).
  - Public integrations that use preview APIs will not pass the review process, and can't be made available to all Canva users.

  </Warning>

  Starts a new [asynchronous job](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints) to upload an asset from a URL to the user's content library. Supported file types for assets are listed in the [Assets API overview](https://www.canva.dev/docs/connect/api-reference/assets/).

  <Note>
   Uploading a video asset from a URL is limited to a maximum 100MB file size. For importing larger video files, use the [Create asset upload job API](https://www.canva.dev/docs/connect/api-reference/assets/create-asset-upload-job/).
  </Note>

  <Note>
  For more information on the workflow for using asynchronous jobs, see [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints). You can check the status and get the results of asset upload jobs created with this API using the [Get asset upload job via URL API](https://www.canva.dev/docs/connect/api-reference/assets/get-url-asset-upload-job/).
  </Note>

- `retrieve_url_asset_uploads` (`read`): <Warning>

  This API is currently provided as a preview. Be aware of the following:

  - There might be unannounced breaking changes.
  - Any breaking changes to preview APIs won't produce a new [API version](https://www.canva.dev/docs/connect/versions/).
  - Public integrations that use preview APIs will not pass the review process, and can't be made available to all Canva users.

  </Warning>

  Get the result of an asset upload job that was created using the [Create asset upload job via URL API](https://www.canva.dev/docs/connect/api-reference/assets/create-url-asset-upload-job/).

  You might need to make multiple requests to this endpoint until you get a `success` or `failed` status. For more information on the workflow for using asynchronous jobs, see [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints).

### Resource `autofills`:

- `create_autofills` (`write`): <Warning>

  Soon, all brand template IDs will be updated to a new format. If your integration stores brand template IDs, you'll need to migrate to use the new IDs. After we implement this change, you'll have 6 months to migrate before the old IDs are removed.

  </Warning>

  <Note>

  To use this API, your integration must act on behalf of a user that's a member of a [Canva Enterprise](https://www.canva.com/enterprise/) organization.

  </Note>

  Starts a new [asynchronous job](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints) to autofill a Canva design using a brand template and input data.

  To get a list of input data fields, use the [Get brand template dataset
  API](https://www.canva.dev/docs/connect/api-reference/brand-templates/get-brand-template-dataset/).

  Available data field types to autofill include:

  - Images
  - Text
  - Charts

    WARNING: Chart data fields are a [preview feature](https://www.canva.dev/docs/connect/#preview-apis). There might be unannounced breaking changes to this feature which won't produce a new API version.

  <Note>

  For more information on the workflow for using asynchronous jobs, see [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints). You can check the status and get the results of autofill jobs created with this API using the [Get design autofill job API](https://www.canva.dev/docs/connect/api-reference/autofills/get-design-autofill-job/).

  </Note>

- `retrieve_autofills` (`read`): <Note>

  To use this API, your integration must act on behalf of a user that's a member of a [Canva Enterprise](https://www.canva.com/enterprise/) organization.

  </Note>

  Get the result of a design autofill job that was created using the [Create design autofill job
  API](https://www.canva.dev/docs/connect/api-reference/autofills/create-design-autofill-job/).

  You might need to make multiple requests to this endpoint until you get a `success` or `failed` status. For more information on the workflow for using asynchronous jobs, see [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints).

### Resource `brand_templates`:

- `retrieve_brand_templates` (`read`): <Warning>

  Soon, all brand template IDs will be updated to a new format. If your integration stores brand template IDs, you'll need to migrate to use the new IDs. After we implement this change, you'll have 6 months to migrate before the old IDs are removed.

  </Warning>

  <Note>

  To use this API, your integration must act on behalf of a user that's a member of a [Canva Enterprise](https://www.canva.com/enterprise/) organization.

  </Note>

  Retrieves the metadata for a brand template.

- `list_brand_templates` (`read`): <Warning>

  Soon, all brand template IDs will be updated to a new format. If your integration stores brand template IDs, you'll need to migrate to use the new IDs. After we implement this change, you'll have 6 months to migrate before the old IDs are removed.

  </Warning>

  <Note>

  To use this API, your integration must act on behalf of a user that's a member of a [Canva Enterprise](https://www.canva.com/enterprise/) organization.

  </Note>

  Get a list of the [brand templates](https://www.canva.com/help/publish-team-template/) the user has access to.

- `retrieve_dataset_brand_templates` (`read`): <Warning>

  Soon, all brand template IDs will be updated to a new format. If your integration stores brand template IDs, you'll need to migrate to use the new IDs. After we implement this change, you'll have 6 months to migrate before the old IDs are removed.

  </Warning>

  <Note>

  To use this API, your integration must act on behalf of a user that's a member of a [Canva Enterprise](https://www.canva.com/enterprise/) organization.

  </Note>

  Gets the dataset definition of a brand template. If the brand
  template contains autofill data fields, this API returns an object with the data field
  names and the type of data they accept.

  Available data field types include:

  - Images
  - Text
  - Charts

  You can autofill a brand template using the [Create a design autofill job
  API](https://www.canva.dev/docs/connect/api-reference/autofills/create-design-autofill-job/).

  WARNING: Chart data fields are a [preview feature](https://www.canva.dev/docs/connect/#preview-apis). There might be unannounced breaking changes to this feature which won't produce a new API version.

### Resource `comments`:

- `create_reply_comments` (`write`): <Warning>

  This API is deprecated, so you should use the [Create reply](https://www.canva.dev/docs/connect/api-reference/comments/create-reply/) API instead.

  </Warning>

  <Warning>

  This API is currently provided as a preview. Be aware of the following:

  - There might be unannounced breaking changes.
  - Any breaking changes to preview APIs won't produce a new [API version](https://www.canva.dev/docs/connect/versions/).
  - Public integrations that use preview APIs will not pass the review process, and can't be made available to all Canva users.

  </Warning>

  Creates a reply to a comment in a design.
  To reply to an existing thread of comments, you can use either the `id` of the parent
  (original) comment, or the `thread_id` of a comment in the thread. Each comment can
  have a maximum of 100 replies created for it.

  For information on comments and how they're used in the Canva UI, see the
  [Canva Help Center](https://www.canva.com/help/comments/).

- `create_thread_comments` (`write`): <Warning>

  This API is deprecated, so you should use the [Create thread](https://www.canva.dev/docs/connect/api-reference/comments/create-thread/) API instead.

  </Warning>

  <Warning>

  This API is currently provided as a preview. Be aware of the following:

  - There might be unannounced breaking changes.
  - Any breaking changes to preview APIs won't produce a new [API version](https://www.canva.dev/docs/connect/versions/).
  - Public integrations that use preview APIs will not pass the review process, and can't be made available to all Canva users.

  </Warning>

  Create a new top-level comment on a design.
  For information on comments and how they're used in the Canva UI, see the
  [Canva Help Center](https://www.canva.com/help/comments/). A design can have a maximum
  of 1000 comments.

### Resource `designs`:

- `create_designs` (`write`): Creates a new Canva design. To create a new design, you can either:

  - Use a preset design type.
  - Set height and width dimensions for a custom design.

  Additionally, you can also provide the `asset_id` of an asset in the user's [projects](https://www.canva.com/help/find-designs-and-folders/) to add to the new design. Currently, this only supports image assets. To list the assets in a folder in the user's projects, use the [List folder items API](https://www.canva.dev/docs/connect/api-reference/folders/list-folder-items/).

  NOTE: Blank designs created with this API are automatically deleted if they're not edited within 7 days. These blank designs bypass the user's Canva trash and are permanently deleted.

- `retrieve_designs` (`read`): Gets the metadata for a design. This includes owner information, URLs for editing and viewing, and thumbnail information.
- `list_designs` (`read`): Lists metadata for all the designs in a Canva user's
  [projects](https://www.canva.com/help/find-designs-and-folders/). You can also:

  - Use search terms to filter the listed designs.
  - Show designs either created by, or shared with the user.
  - Sort the results.

### Resource `designs.comments`:

- `create_designs_comments` (`write`): <Warning>
  This API is currently provided as a preview. Be aware of the following:

  - There might be unannounced breaking changes.
  - Any breaking changes to preview APIs won't produce a new [API version](https://www.canva.dev/docs/connect/versions/).
  - Public integrations that use preview APIs will not pass the review process, and can't be made available to all Canva users.
    </Warning>

  Creates a new comment thread on a design.
  For information on comments and how they're used in the Canva UI, see the
  [Canva Help Center](https://www.canva.com/help/comments/).

- `retrieve_designs_comments` (`read`): <Warning>

  This API is currently provided as a preview. Be aware of the following:

  - There might be unannounced breaking changes.
  - Any breaking changes to preview APIs won't produce a new [API version](https://www.canva.dev/docs/connect/versions/).
  - Public integrations that use preview APIs will not pass the review process, and can't be made available to all Canva users.

  </Warning>

  Gets a comment or suggestion thread on a design.
  To retrieve a reply to a comment thread, use the [Get reply](https://www.canva.dev/docs/connect/api-reference/comments/get-reply/) API.
  For information on comments and how they're used in the Canva UI, see the
  [Canva Help Center](https://www.canva.com/help/comments/).

### Resource `designs.comments.replies`:

- `create_comments_designs_replies` (`write`): <Warning>

  This API is currently provided as a preview. Be aware of the following:

  - There might be unannounced breaking changes.
  - Any breaking changes to preview APIs won't produce a new [API version](https://www.canva.dev/docs/connect/versions/).
  - Public integrations that use preview APIs will not pass the review process, and can't be made available to all Canva users.

  </Warning>

  Creates a reply to a comment or suggestion thread on a design.
  To reply to an existing thread, you must provide the ID of the thread
  which is returned when a thread is created, or from the `thread_id` value
  of an existing reply in the thread. Each thread can
  have a maximum of 100 replies created for it.

  For information on comments and how they're used in the Canva UI, see the
  [Canva Help Center](https://www.canva.com/help/comments/).

- `retrieve_comments_designs_replies` (`read`): <Warning>

  This API is currently provided as a preview. Be aware of the following:

  - There might be unannounced breaking changes.
  - Any breaking changes to preview APIs won't produce a new [API version](https://www.canva.dev/docs/connect/versions/).
  - Public integrations that use preview APIs will not pass the review process, and can't be made available to all Canva users.

  </Warning>

  Gets a reply to a comment or suggestion thread on a design.
  For information on comments and how they're used in the Canva UI, see the
  [Canva Help Center](https://www.canva.com/help/comments/).

- `list_comments_designs_replies` (`read`): <Warning>
  This API is currently provided as a preview. Be aware of the following:

  - There might be unannounced breaking changes.
  - Any breaking changes to preview APIs won't produce a new [API version](https://www.canva.dev/docs/connect/versions/).
  - Public integrations that use preview APIs will not pass the review process, and can't be made available to all Canva users.
    </Warning>

  Retrieves a list of replies for a comment or suggestion thread on a design.

  For information on comments and how they're used in the Canva UI, see the
  [Canva Help Center](https://www.canva.com/help/comments/).

### Resource `designs.pages`:

- `retrieve_designs_pages` (`read`): <Warning>

  This API is currently provided as a preview. Be aware of the following:

  - There might be unannounced breaking changes.
  - Any breaking changes to preview APIs won't produce a new [API version](https://www.canva.dev/docs/connect/versions/).
  - Public integrations that use preview APIs will not pass the review process, and can't be made available to all Canva users.

  </Warning>

  Lists metadata for pages in a design, such as page-specific thumbnails.

  For the specified design, you can provide `offset` and `limit` values to specify the range of pages to return.

  NOTE: Some design types don't have pages (for example, Canva docs).

### Resource `designs.export_formats`:

- `retrieve_designs_export_formats` (`read`): <Warning>

  This API is currently provided as a preview. Be aware of the following:

  - There might be unannounced breaking changes.
  - Any breaking changes to preview APIs won't produce a new [API version](https://www.canva.dev/docs/connect/versions/).
  - Public integrations that use preview APIs will not pass the review process, and can't be made available to all Canva users.

  </Warning>

  Lists the available file formats for [exporting a design](https://www.canva.dev/docs/connect/api-reference/exports/create-design-export-job/).

### Resource `connect`:

- `retrieve_keys_connect` (`read`): <Warning>

  This API is currently provided as a preview. Be aware of the following:

  - There might be unannounced breaking changes.
  - Any breaking changes to preview APIs won't produce a new [API version](https://www.canva.dev/docs/connect/versions/).
  - Public integrations that use preview APIs will not pass the review process, and can't be made available to all Canva users.

  </Warning>

  The Keys API (`connect/keys`) is a security measure you can use to verify the authenticity
  of webhooks you receive from Canva Connect. The Keys API returns a
  [JSON Web Key (JWK)](https://www.rfc-editor.org/rfc/rfc7517#section-2), which you can use to
  decrypt the webhook signature and verify it came from Canva and not a potentially malicious
  actor. This helps to protect your systems from
  [Replay attacks](https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/).

  The keys returned by the Keys API can rotate. We recommend you cache the keys you receive
  from this API where possible, and only access this API when you receive a webhook signed
  with an unrecognized key. This allows you to verify webhooks quicker than accessing this API
  every time you receive a webhook.

### Resource `imports`:

- `create_imports` (`write`): Starts a new [asynchronous job](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints) to import an external file as a new design in Canva.

  The request format for this endpoint has an `application/octet-stream` body of bytes,
  and the information about the import is provided using an `Import-Metadata` header.

  Supported file types for imports are listed in [Design imports overview](https://www.canva.dev/docs/connect/api-reference/design-imports/#supported-file-types).

  <Note>

  For more information on the workflow for using asynchronous jobs, see [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints). You can check the status and get the results of design import jobs created with this API using the [Get design import job API](https://www.canva.dev/docs/connect/api-reference/design-imports/get-design-import-job/).

  </Note>

- `retrieve_imports` (`read`): Gets the result of a design import job created using the [Create design import job API](https://www.canva.dev/docs/connect/api-reference/design-imports/create-design-import-job/).

  You might need to make multiple requests to this endpoint until you get a `success` or `failed` status. For more information on the workflow for using asynchronous jobs, see [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints).

### Resource `url_imports`:

- `create_url_imports` (`write`): Starts a new [asynchronous job](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints) to import an external file from a URL as a new design in Canva.

  Supported file types for imports are listed in [Design imports overview](https://www.canva.dev/docs/connect/api-reference/design-imports/#supported-file-types).

  <Note>

  For more information on the workflow for using asynchronous jobs, see [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints). You can check the status and get the results of design import jobs created with this API using the [Get URL import job API](https://www.canva.dev/docs/connect/api-reference/design-imports/get-url-import-job/).

  </Note>

- `retrieve_url_imports` (`read`): Gets the result of a URL import job created using the [Create URL import job API](https://www.canva.dev/docs/connect/api-reference/design-imports/create-url-import-job/).

  You might need to make multiple requests to this endpoint until you get a `success` or `failed` status. For more information on the workflow for using asynchronous jobs, see [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints).

### Resource `exports`:

- `create_exports` (`write`): Starts a new [asynchronous job](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints) to export a file from Canva. Once the exported file is generated, you can download
  it using the URL(s) provided. The download URLs are only valid for 24 hours.

  The request requires the design ID and the exported file format type.

  Supported file formats (and export file type values): PDF (`pdf`), JPG (`jpg`), PNG (`png`), GIF (`gif`), Microsoft PowerPoint (`pptx`), and MP4 (`mp4`).

  <Note>

  For more information on the workflow for using asynchronous jobs, see [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints). You can check the status and get the results of export jobs created with this API using the [Get design export job API](https://www.canva.dev/docs/connect/api-reference/exports/get-design-export-job/).

  </Note>

- `retrieve_exports` (`read`): Gets the result of a design export job that was created using the [Create design export job API](https://www.canva.dev/docs/connect/api-reference/exports/create-design-export-job/).

  If the job is successful, the response includes an array
  of download URLs. Depending on the design type and export format, there is a download URL for each page in the design. The download URLs are only valid for 24 hours.

  You might need to make multiple requests to this endpoint until you get a `success` or `failed` status. For more information on the workflow for using asynchronous jobs, see [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints).

### Resource `folders`:

- `create_folders` (`write`): Creates a folder in one of the following locations:

  - The top level of a Canva user's [projects](https://www.canva.com/help/find-designs-and-folders/) (using the ID `root`),
  - The user's Uploads folder (using the ID `uploads`),
  - Another folder (using the parent folder's ID).

  When a folder is successfully created, the
  endpoint returns its folder ID, along with other information.

- `retrieve_folders` (`read`): Gets the name and other details of a folder using a folder's `folderID`.
- `update_folders` (`write`): Updates a folder's details using its `folderID`.
  Currently, you can only update a folder's name.
- `delete_folders` (`write`): Deletes a folder with the specified `folderID`.
  Deleting a folder moves the user's content in the folder to the
  [Trash](https://www.canva.com/help/deleted-designs/) and content owned by
  other users is moved to the top level of the owner's
  [projects](https://www.canva.com/help/find-designs-and-folders/).
- `list_items_folders` (`read`): Lists the items in a folder, including each item's `type`.

  Folders can contain:

  - Other folders.
  - Designs, such as Instagram posts, Presentations, and Documents ([Canva Docs](https://www.canva.com/create/documents/)).
  - Image assets.

  Currently, video assets are not returned in the response.

- `move_item_folders` (`write`): Moves an item to another folder. You must specify the folder ID of the destination folder, as well as the ID of the item you want to move.

  NOTE: In some situations, a single item can exist in multiple folders. If you attempt to move an item that exists in multiple folders, the API returns an `item_in_multiple_folders` error. In this case, you must use the Canva UI to move the item to another folder.

### Resource `oauth`:

- `create_token_oauth` (`write`): This endpoint implements the OAuth 2.0 `token` endpoint, as part of the Authorization Code flow with Proof Key for Code Exchange (PKCE). For more information, see [Authentication](https://www.canva.dev/docs/connect/authentication/).

  To generate an access token, you must provide one of the following:

  - An authorization code
  - A refresh token

  Generating a token using either an authorization code or a refresh token allows your integration to act on behalf of a user. You must first [obtain user authorization and get an authorization code](https://www.canva.dev/docs/connect/authentication/#obtain-user-authorization).

  Access tokens may be up to 4 KB in size, and are only valid for a specified period of time. The expiry time (currently 4 hours) is shown in the endpoint response and is subject to change.

  **Endpoint authentication**

  Requests to this endpoint require authentication with your client ID and client secret, using _one_ of the following methods:

  - **Basic access authentication** (Recommended): For [basic access authentication](https://en.wikipedia.org/wiki/Basic_access_authentication), the `{credentials}` string must be a Base64 encoded value of `{client id}:{client secret}`.
  - **Body parameters**: Provide your integration's credentials using the `client_id` and `client_secret` body parameters.

  This endpoint can't be called from a user's web-browser client because it uses client authentication with client secrets. Requests must come from your integration's backend, otherwise they'll be blocked by Canva's [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) policy.

  **Generate an access token using an authorization code**

  To generate an access token with an authorization code, you must:

  - Set `grant_type` to `authorization_code`.
  - Provide the `code_verifier` value that you generated when creating the user authorization URL.
  - Provide the authorization code you received after the user authorized the integration.

  **Generate an access token using a refresh token**

  Using the `refresh_token` value from a previous user token request, you can get a new access token with the same or smaller scope as the previous one, but with a refreshed expiry time. You will also receive a new refresh token that you can use to refresh the access token again.

  To refresh an existing access token, you must:

  - Set `grant_type` to `refresh_token`.
  - Provide the `refresh_token` from a previous token request.

- `introspect_token_oauth` (`write`): Introspect an access token to see whether it is valid and active. You can also verify some token properties, such as its claims, scopes, and validity times.

  Requests to this endpoint require authentication with your client ID and client secret, using _one_ of the following methods:

  - **Basic access authentication** (Recommended): For [basic access authentication](https://en.wikipedia.org/wiki/Basic_access_authentication), the `{credentials}` string must be a Base64 encoded value of `{client id}:{client secret}`.
  - **Body parameters**: Provide your integration's credentials using the `client_id` and `client_secret` body parameters.

  This endpoint can't be called from a user's web-browser client because it uses client authentication with client secrets. Requests must come from your integration's backend, otherwise they'll be blocked by Canva's [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) policy.

- `revoke_token_oauth` (`write`): Revoke an access token or a refresh token.

  If you revoke a _refresh token_, be aware that:

  - The refresh token's lineage is also revoked. This means that access tokens created from that refresh token are also revoked.
  - The user's consent for your integration is also revoked. This means that the user must go through the OAuth process again to use your integration.

  Requests to this endpoint require authentication with your client ID and client secret, using _one_ of the following methods:

  - **Basic access authentication** (Recommended): For [basic access authentication](https://en.wikipedia.org/wiki/Basic_access_authentication), the `{credentials}` string must be a Base64 encoded value of `{client id}:{client secret}`.
  - **Body parameters**: Provide your integration's credentials using the `client_id` and `client_secret` body parameters.

  This endpoint can't be called from a user's web-browser client because it uses client authentication with client secrets. Requests must come from your integration's backend, otherwise they'll be blocked by Canva's [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) policy.

### Resource `resizes`:

- `create_resizes` (`write`): <Note>

  To use this API, your integration must act on behalf of a user that's on a Canva plan with premium features (such as Canva Pro).

  </Note>

  Starts a new [asynchronous job](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints)
  to create a resized copy of a design. The new resized design is
  added to the top level of the user's
  [projects](https://www.canva.com/help/find-designs-and-folders/) (`root` folder).

  To resize a design into a new design, you can either:

  - Use a preset design type.
  - Set height and width dimensions for a custom design.

  Note the following behaviors and restrictions when resizing designs:

  - Designs can be resized to a maximum area of 25,000,000 pixels squared.
  - Resizing designs using the Connect API always creates a new design. In-place resizing is currently not available in the Connect API, but can be done in the Canva UI.
  - Resizing a multi-page design results in all pages of the design being resized. Resizing a section of a design is only available in the Canva UI.
  - [Canva docs](https://www.canva.com/create/documents/) can't be resized, and other design types can't be resized to a Canva doc.
  - Canva Code designs can't be resized, and other design types can't be resized to a Canva Code design.

  <Note>
  For more information on the workflow for using asynchronous jobs,
  see [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints).
  You can check the status and get the results of resize jobs created with this API using the
  [Get design resize job API](https://www.canva.dev/docs/connect/api-reference/resizes/get-design-resize-job/).
  </Note>

- `retrieve_resizes` (`read`): <Note>

  To use this API, your integration must act on behalf of a user that's on a Canva plan with premium features (such as Canva Pro).

  </Note>

  Gets the result of a design resize job that was created using the [Create design resize
  job API](https://www.canva.dev/docs/connect/api-reference/resizes/create-design-resize-job/).

  If the job is successful, the response includes a summary of the new resized design, including its metadata.

  You might need to make multiple requests to this endpoint until you get a `success` or `failed` status.
  For more information on the workflow for using asynchronous jobs,
  see [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints).

### Resource `users.me`:

- `retrieve_users_me` (`read`): Returns the User ID and Team ID of the user
  account associated with the provided access token.
- `list_capabilities_users_me` (`read`): Lists the API capabilities for the user account associated with the provided access token. For more information, see [Capabilities](https://www.canva.dev/docs/connect/capabilities/).
- `retrieve_profile_users_me` (`read`): Currently, this returns the display name of the user account associated with the provided access token. More user information is expected to be included in the future.

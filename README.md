# BlogBabel Action

Translate your blog posts to multiple languages.

## Inputs

### `source`

Choose a provider where to find the blog posts to translate. This input is required.

### `sourceId`

The ID of the blog to translate. This input is required.

### `destination`

Choose a provider where to save the translated blog posts. This input is required.

## Outputs

### `url`

The URL of the translated blog.

## Example usage

```yaml
uses: TsuyoshiUshio/blogbabel-action@version
with:
  source: 'source-provider'
  sourceId: 'source-id'
  destination: 'destination-provider'
  
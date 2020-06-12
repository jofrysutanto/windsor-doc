# Clone fields

Clone fields allow you to mirror fields from other field groups. Similar to [Conditional Fields](/guides/conditional), you can simply refer to other registered fields by using the `key` field.

:::: tabs :options="{ useUrlFragment: false }"

::: tab index.yaml
``` yaml
fields:
  - page-banner.acf.yaml
pages:
  - page-default.acf.yaml
```
:::

::: tab page-banner.acf.yaml
``` yaml
title: 'Page Banner'
key: 'page_banner'
position: 'acf_after_title'
location: null
fields:
  banner_heading:
    type: text
    label: Banner Heading
  banner_image:
    label: Banner Image
    type: "image"
    preview_size: 'full'
```
:::

::: tab page-default.acf.yaml
``` yaml
title: 'Page - Default'
key: 'page_default'
position: 'acf_after_title'
location:
  -
    -
      param: page_template
      operator: '=='
      value: 'default'
fields:
  banner:
    label: Banner
    type: "clone"
    display: "group"
    prefix_label: false
    prefix_name: false
    clone:
      - "page_banner"
```
:::

::::

When cloning specific fields within other field groups, use [fully expanded field keys](/guides/basic#field-keys):

:::: tabs :options="{ useUrlFragment: false }"

::: tab index.yaml
``` yaml
fields:
  - page-banner.acf.yaml
pages:
  - page-default.acf.yaml
```
:::

::: tab page-banner.acf.yaml
``` yaml
title: 'Page Banner'
key: 'page_banner'
position: 'acf_after_title'
location: null
fields:
  banner_heading:
    type: text
    label: Banner Heading
  banner_image:
    label: Banner Image
    type: "image"
    preview_size: 'full'
```
:::

::: tab page-default.acf.yaml
``` yaml
title: 'Page - Default'
key: 'page_default'
position: 'acf_after_title'
location:
  -
    -
      param: page_template
      operator: '=='
      value: 'default'
fields:
  banner:
    label: Banner
    type: "clone"
    display: "group"
    prefix_label: false
    prefix_name: false
    clone:
      - "page_banner_banner_heading"
```
:::

::::

If you are not comfortable using fully expanded keys to clone fields, you might be interested to check out [Blueprints](/blueprints).

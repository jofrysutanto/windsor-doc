# Blueprints

## What are blueprints?

Unlike other field types, Blueprint is a custom field type introduced by Windsor, and not by ACF. Blueprints share some similarities with Clone fields, which lets you re-use your fields, but offer a few more advantages in that:

- it lets you modify each cloned fields attributes
- it is easier to resolve the right field names to use
- it provides an easier way to include/exclude and re-order cloned fields

## Getting started with a blueprint

To use blueprints, start by creating a blueprint file within your `acf-yaml` directory:
```yaml
# banner.acf.yaml
fields:
  banner_heading:
    type: text
    label: Banner Heading
  banner_description:
    label: Banner Description
    type: 'textarea'
    new_lines: 'br'
  banner_image:
    label: Banner Image
    type: "image"
    preview_size: 'large'
```

Register your new blueprint within the blueprints section of `index.yaml`:
```yaml
fields:
  # ..your fields
pages:
  # ..your fields
blueprints:
  - banner.acf.yaml
```

Once registered you may now refer to the blueprint anywhere in your custom fields:
```yaml
title: 'Default Template'
key: 'default_template'
location:
  -
    -
      param: page_template
      operator: '=='
      value: 'default'
fields:
  banner:
    label: Banner
    type: "blueprint"
    source: "banner"
    prefix: false
    prefix_label: false
```

There are a couple of things to note here:
- To indicate the use of blueprint, use `type: blueprint`
- The `source` refers to the *name of your blueprint file*. If you name your blueprint as `banner-fields.acf.yaml` then your source is `banner-fields`
- The `prefix` and `prefix_label` works similarly to clone fields, allowing you automatically prepend the field name (using `prefix`) or field label (using `prefix_label`) to the copied fields.

## Filtering blueprint fields

You can also specify which fields you would like to take from the blueprint in two ways, using `only` or `excludes`:

```yaml
fields:
  banner:
    label: First Banner
    type: "blueprint"
    source: "banner"
    prefix: false
    prefix_label: false
    only: # Only takes selected fields
      - banner_image
  banner_2:
    label: Second Banner
    type: "blueprint"
    source: "banner"
    prefix: false
    prefix_label: false
    excludes: # Remove specified fields, take the rest
      - banner_image
```

## Merging and updating blueprint fields layouts

You can also overwrite copied fields configuration using the `merge` keyword:
```yaml
fields:
  banner:
    label: Banner
    type: "blueprint"
    source: "banner"
    prefix: false
    prefix_label: false
    merge:
      banner_image:
        instructions: "Some instructions"
        max_size: 5
```
Using `merge` you are free for further customise individual copied fields; it will automatically merge the existing properties of copied fields.

Windsor also provides a convenient helper to let you re-arrange the fields, including adjusting the width of each field to give you even more precise control over how these fields are rendered.

For example, consider this scenario:
- we would like to render a new color picker field to set the background of the banner section
- we don't need the `description` field
- we would want `heading` and color picker to be displayed side by side before the banner image

You can achieve this by using `layout` property:
```yaml
fields:
  banner:
    label: Banner
    type: "blueprint"
    source: "banner"
    prefix: false
    prefix_label: false
    excludes:
      - banner_description
    merge:
      banner_background:
        label: Banner Background
        type: "color_picker"
        default_value: "#FFFFFF"
    layout:
      - banner_heading@50
      - banner_background@50
      - banner_image
```

In this example, we use `merge` to create an additional field which doesn't exist in our blueprint. The reason for doing so is to allow us to mix this field into our `layout` arrangement.

The `layout` property takes an array of fields, following these simple rules:
- The order of items in the array is the order fields display when rendered
- Within each line of item, you can optionally use `@` to overwrite the wrapper width of the referred field

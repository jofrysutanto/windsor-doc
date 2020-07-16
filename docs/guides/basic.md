# Anatomy of YAML files

## Entry `index.yaml`
Your entry file serve as a registry of all registered fields, separated to multiple sections:
```yaml
fields:
  - 'global.acf.yaml'
pages:
  - 'blog-post.acf.yaml'
  - 'page-contact.acf.yaml'
blueprints:
  - 'banner.acf.yaml'
blocks:
  - 'my-gutenberg-block.acf.yaml'
```

YAML files within `fields` are registered before `pages`, this lets you prioritise some files by putting them in `fields` section. For example, you might have a field group called `slider.acf.yaml` which is used for cloning; you should be registering this field under `fields`.

Blueprints are a unique feature in Windsor, which lets you re-use collection fields without sacrificing flexibility. For more information, refer to [Blueprints](/blueprints) section.

Finally, `blocks` section lets you define [ACF Blocks](https://www.advancedcustomfields.com/resources/blocks/). Refer to the [Blocks](./blocks) section for more information about how to configure your custom blocks.

## Fields

All files containing custom fields definition should end in `.acf.yaml` extension. Within these files, you have the freedom to register custom fields following ACF's `acf_add_local_field_group` [documentation](https://www.advancedcustomfields.com/resources/register-fields-via-php/).

Basic example:
```yaml
title: 'Default Template'
key: 'default_template'
position: 'acf_after_title'
hide_on_screen: ['the_content']
location:
  -
    -
      param: page_template
      operator: '=='
      value: 'default'
fields:
  banner_heading:
    type: text
    wrapper_width: 50
    label: Banner Heading
  banner_description:
    label: Banner Description
    type: 'textarea'
    wrapper_width: 50
    new_lines: 'br'
    rows: 4
```

As you can see above, you simply declare fields by following ACF's structure. Because it can get quite challenging to figure out the right attribute names for each type of fields, Windsor has provided a JSON schema which can be [integrated to your IDE](/ide).

### Field Keys

All fields declaration requires `key`, which is used in ACF to uniquely identify each field. Using ACF interface, these keys are generated for you. For your fields to work correctly all of these keys *must be globally unique*.

::: tip
Don't confuse `key` with `name`. You can have multiple fields sharing the same `name`.
:::

Fortunately with Windsor, you only need to declare a single `key` field at the root of your YAML field group file. The remaining keys are generated for you automatically. To ensure uniqueness, these keys are all namespaced based on their parents.

Let's take a look at an example:
```yaml
title: 'Default Template'
key: 'default_template'
fields:
  banner_heading:
    # ...
  authors:
    # ...
    type: "repeater"
    sub_fields:
      name:
        # ...
      role:
        # ...
```

When Windsor registers the fields seen above, the following keys are generated:
- The field group will be assigned with the key: `default_template` which is declared at the root of the YAML file.
- `banner_heading` field will be assigned `banner_heading` as the `name` of the field, and `default_template_banner_heading` as the key.
- The `role` field within the `authors` repeater will be assigned `role` as the `name` of the field, and `default_template_authors_role` as the key.

It is important to follow these simple rules above whenever you need access to the `key` value of any registered fields, for example when using [Conditional Rules](/guides/conditional) or [Clone](/guides/clone) fields.


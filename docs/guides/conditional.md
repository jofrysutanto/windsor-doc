# Conditional fields

Similar to defining conditional logic in ACF, you can declare conditional fields in your fields in the same way, however it does have some special treatments to the referred `field`

In the case where you are referring to other fields in the same level, you can directly use the field name:
```yaml
title: 'Default Template'
key: 'default_template'
fields:
  show_image:
    label: Show Image
    type: "true_false"
  image:
    label: Image
    type: "image"
    preview_size: 'large'
    conditional_logic:
      -  # This level represents 'OR' group
        - # This level represents 'AND' group
          field: show_image # This works as expected
          operator: '=='
          value: true
```

If you are referring to fields in different group (that is, not at the same level), you can use the absolute key name as a reference, by prepending the `field` with `~`:
```yaml
title: 'Default Template'
key: 'default_template'
fields:
  show_image:
    label: Show Image
    type: "true_false"
    ui: true
    default: true
  my_images:
    label: My Images
    type: "repeater"
    sub_fields:
      image:
        label: Image
        type: "image"
        preview_size: 'large'
        conditional_logic:
          -
            -
              # Use fully-expanded field key value
              field: ~default_template_show_image
              operator: '=='
              value: true
```

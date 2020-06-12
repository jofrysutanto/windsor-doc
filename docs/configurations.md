# Configurations

To configure Windsor's behaviour, you may use the `acf-windsor/config` filter. For example:
```php
function modify_windsor_config($config) {
  return array_merge($config, [
    // Change the location of YAML files
    'path' => get_stylesheet_directory() . '/custom-path',
  ]);
}
add_filter('acf-windsor/config', 'modify_windsor_config');
```

`$config` is an array holding configuration values as explained below.

### debug
Boolean flag to enable debug mode. This is useful during development when troubleshooting issues.

Defaults to `false`

### path
Windsor will attempt to find the entry file, and all other YAML files in this location.

Defaults to `acf-fields` directly under your active theme directory.

### entry
The name of the entry file where fields registration happens.

Defaults to `index.yaml`

### parser
Instantiable parser class, used to read each fields definition file.

Defaults to `\Windsor\Parser\YamlParser`

### rules
Array of transformation rules when transforming `fields` and `groups`.
You may also use `acf-windsor/config/rules` filter to modify only these rules, if preferred.

For more information, refer to [Transformation Rules](/rules)


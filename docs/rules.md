# Transformation Rules

At its core, Windsor parses YAML files and apply various transformation rules on each field and field groups; the results of these transformations are then passed on to ACF for registration.

Windsor lets you tap into these transformation rules, allowing you to make changes to these rules, including removing or adding your own; this is the key to truly supercharge your ACF building workflow.

::: warning In Progress
More in-depth explanations to be added
:::

### Creating your own rule

Let's say you want to create your own transformation rule. For example adding percentage-based 'full', 'half', '1/3', '2/3' value to `width`:
```yaml
fields:
  banner_heading:
    type: text
    label: Banner Heading
    wrapper:
      width: '1/3'
  banner_description:
    type: text
    label: Banner Heading
    wrapper:
      width: '2/3'
  banner_image:
    type: text
    label: Banner Heading
    wrapper:
      width: 'full'
```

Start by creating a PHP class which will apply this transformation for us. This only method that this class needs to implement is `process`:

```php
use Tightenco\Collect\Support\Arr;

class CustomWidthRule
{
    /**
     * Process this rule
     *
     * @param \Windsor\Capsule\FieldGroup $group
     * @param string $key
     * @param array $acf
     * @return array
     */
    public function process($group, $key, array $acf): array
    {
        $width = Arr::get($acf, 'wrapper.width');
        if (!$width) {
            return $acf;
        }
        $newWidth = null;
        switch ($width) {
            case 'full':
                $newWidth = 100;
                break;
            case 'half':
                $newWidth = 50;
                break;
            case '1/3':
                $newWidth = 33;
                break;
            case '2/3':
                $newWidth = 67;
                break;
            default:
                break;
        }
        if ($newWidth) {
            Arr::set($acf, 'wrapper.width', $newWidth);
        }
        return $acf;
    }
}
```

With the class declared, make sure you have included this class in your PHP. If you are using Composer, ensure it is has been auto-loaded. If not, you can use `require` to include this class.

You will then have to override Windsor settings as explained in [Configurations](/configurations) section:

```php
add_filter('acf-windsor/config/rules', function ($rules) {
    $rules['fields'][] = CustomWidthRule::class;
    return $rules;
});
```

That's all! With the new rule registered, you can use those new width values in any of your fields. While this is only a very simple example, it really is up to you how you want to construct these rules.

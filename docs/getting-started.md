# Getting Started

- Install ACF Windsor via composer in your theme:
```
composer require jofrysutanto/windsor "^0.9"
```
- If you are using VSCode, be sure to add the Schema file to your configuration.
- Ensure you have included composer auto-loader file. If you're not sure, add the following line into your `functions.php` file:
```php
require_once __DIR__ . '/vendor/autoload.php';
```
- Create YAML entry file at `[your-active-theme]/acf-fields/index.yaml`, where `[your-active-theme]` refers to your currently active Wordpress theme directory. At minimum, your entry file should contain:
```yaml
fields: []
pages: []
```
- Test your installation:
  - Create your first custom field YAML, for example create a file `your-theme/acf-fields/page-default.acf.yaml`:
  ::: warning Convention for files extension
  Other than the entry file `index.yaml`, all other files must have `.acf.yaml` extension.
  :::
  ```yaml
  title: 'Page Default'
  key: 'page_default'
  position: 'acf_after_title'
  hide_on_screen: []
  location:
    -
      -
        param: 'page_template'
        operator: '=='
        value: 'default'
  fields:
    heading:
      type: text
      label: Heading
  ```
  - Register this new ACF file in your index:
  ```yaml
  fields: []
  pages:
    - page-default.acf.yaml
  ```
  - You have successfully registered a new field group which will be made available when creating a new default page.
  - For more in-depth guide, check out the [guides](/guides/basic) section


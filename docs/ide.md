# IDE Integration

::: warning Work in progress
Only VSCode integration is available at the moment.
:::

![VSCode GIF](./vscode-min.gif)

To enable autocompletion and useful snippets, follow the installation steps below:
- If not already installed, download and enable [YAML language server](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) extension.
- Update your VSCode settings (i.e. `settings.json`):
```json
"yaml.schemas": {
    "https://windsor-docs.netlify.app/schema.json": "*.acf.yaml"
}
```

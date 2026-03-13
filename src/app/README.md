# SAMPLE-PLUGIN Readme Example

## Adding a Readme File to Your Plugin

Follow these steps to include a readme file in your plugin:

1. Add the `readmePath` property to the `exports` array in your `cumulocity.config.ts` file.
2. Place the readme file in the same folder as your `index.ts` file.

### Example

```ts
exports: [
  {
    name: 'Example sample plugin view',
    module: 'samplePluginWidgetProviders',
    path: './src/app/index.ts',
    readmePath: './src/app/README.md',
    description: 'Adds a custom widget and navigator node to the shell application'
  }
];
```

### What Happens When You Build?

When you build your plugin (e.g., by running `ng build sample-plugin`), the generated zip file will include the readme file. It will be placed in a folder named after your module, such as `SamplePluginModule` or `samplePluginWidgetProviders`.

# IoT Cumulocity Advanced Map Widget plugin
Cumulocity module federation plugin containing the advanced map widget. 

Displays a map with position markers for selected devices. Draw lines based on location update events or by free hand.
Goal: Support for configuration of additional layers and custom markers.

## Sample images

Draw lines freehand:
![alt Create track example](/docs/create-track.png)

Draw line from c8y_Position events:
![alt Draw track from c8y_Position events example](/docs/load-coordinates.png)

Manage your lines:
![alt Widget config example](/docs/widget-config.png)

Widget in action:
![alt Widget in action example](/docs/widget-in-action.png)

## Recommended versions
node v 14.x
npm v 6.x

## Plugin versions
Angular v 14.x
WebSDK v 1016.0.x

# Cumulocity widget plugin

This is the Cumulocity module federation plugin. Plugins can be developed like any Cumulocity application, but can be used at runtime by other applications. Therefore, they export an Angular module which can then be imported by any other application. The exports are defined in `package.json`.

**How to start**
Change the target tenant and application you want to run this plugin on in the `package.json`.

```
c8ycli server -u https://{{your-tenant}}.cumulocity.com/ --shell {{cockpit}}
```
Keep in mind that this plugin needs to have an app (e.g. cockpit) running with at least the same version as this plugin. if your tenant contains an older version, use the c8ycli to create a cockpit clone running with at least v 1016.0.59! Upload this clone to the target tenant (e.g. cockpit-1016) and reference this name in the --shell command.

The widget plugin can be locally tested via the start script:

```
npm start
```

In the Module Federation terminology, `widget` plugin is called `remote` and the `cokpit` is called `shell`. Modules provided by this `widget` will be loaded by the `cockpit` application at the runtime. This plugin provides a basic custom widget that can be accessed through the `Add widget` menu.

> Note that the `--shell` flag creates a proxy to the cockpit application and provides` AdvancedMapWidgetModule` as an `remote` via URL options.

Also deploying needs no special handling and can be simply done via `npm run deploy`. As soon as the application has exports it will be uploaded as a plugin.

------------------------------
These tools are provided as-is and without warranty or support. They do not constitute part of the Software AG product suite. Users are free to use, fork and modify them, subject to the license agreement. While Software AG welcomes contributions, we cannot guarantee to include every contribution in the master project.
_____________________
For more information you can Ask a Question in the [TECHcommunity Forums](http://tech.forums.softwareag.com/techjforum/forums/list.page?product=cumulocity).
You can find additional information in the [Software AG TECHcommunity](http://techcommunity.softwareag.com/home/-/product/name/cumulocity).

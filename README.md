# IoT Cumulocity Advanced Map Widget plugin
Cumulocity module federation plugin containing the Advanced Map widget. By installing this plugin to a cockpit application, the user can choose this widget from the catalog.

Displays a map with position markers for devices with c8y_Position fragments. The user can create multiple layers using different queries:
- fragment and value layer, e.g. show all devices with type = c8y_MQTTDevice
- inventory query layer, e.g. show all devices with critical alarm count greater 0 and having custom fragment xyz
- alarm query layer, show all devices for that at least one alarm exists matching the alarm query you create
- event query layer, show all devices for that at least one event exists matching the event query you create

The map widget is designed to scale well also with higher count of devices. Position updates and changes regarding the layers are polled using bulk requests.
Markers can be configured to show different icons. If alarms exist, different colors will be shown depending on the highest alarm.
Alarm details can be found in the popover of the device. The popover is built to be easily extended/ replaced in code.


## Sample images

Create
![alt Create device fragment layer example](/docs/create-device-fragment-layer.png)

Manage you existing layers in the config (by editing or deleting)
![alt Manage layers](/docs/widget-config.png)

Layers can be selected and deselected on the map later. You can also choose whether or not layers should be selected by default.
![alt Layers](/docs/layers.png)

Powerful queries can be created with a simple UI which let's you create the query parameters for a layer. Only devices matching your query will be shown for that layer.
![alt Alarm query layer example](/docs/edit-alarm-layer.png)

Popovers show alarm counts. These can easily be extended in code.
![alt Popover example](/docs/popover-example.png)

## Features to come

- pick color for markers
- configurable polling intervals
- latest value queries, (e.g. only show devices where latest event states that the machine is in a specific state)
- extra layer for drawings
- clustering of markers

## Recommended versions
node v 14.x
npm v 6.x

## Plugin versions
Angular v 14.x
WebSDK v 1016.0.x

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

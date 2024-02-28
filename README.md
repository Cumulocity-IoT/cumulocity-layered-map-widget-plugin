# IoT Cumulocity Layered Map Widget plugin
Cumulocity module federation plugin containing the Layered Map widget. By installing this plugin to a cockpit application, the user can choose this widget from the catalog.

Displays a map with position markers for devices with c8y_Position fragments. The user can create multiple layers using different queries:
- fragment and value layer, e.g. show all devices with type = c8y_MQTTDevice
- inventory query layer, e.g. show all devices with critical alarm count greater 0 and having custom fragment xyz
- alarm query layer, show all devices for that at least one alarm exists matching the alarm query you create
- event query layer, show all devices for that at least one event exists matching the event query you create

The map widget is designed to scale well also with higher count of devices. Position updates and changes regarding the layers are polled using bulk requests.
Markers can be configured to show different icons. If alarms exist, different colors will be shown depending on the highest alarm.
Alarm details can be found in the popover of the device. The popover is built to be easily extended/ replaced in code.

## New features of version 3.0.0
- Upgraded to WebSDK version 1018

### General settings
- Configure which bounds the map should show at startup
![](/docs/center-map.png)
Either let the map calculate the best fit for all markers, or manually set the maps bounds.

- By clicking on the crosshair icon on the right, you can open a modal to help you find the best latitude and longitude:
![](/docs/center-map-modal.png)
Here you can e.g. use geocoding and e.g. enter a city name in order to let the map fly to these coordinates, can configure the zoom level and what exactly should be shown.
Or you click on the arrow on the right and grant access to your current location.

- Configure location update polling
You want to monitor some wind farm? Then disable location update polling. You want to see vehicles moving? Enable polling and configure an interval of 3 seconds.

### Layer settings
- You can now configure to access Web Map Services (WMS)
![](/docs/wms-example.png)
You want to add an additional layer to your map via a WMS? This is now possible! Just add the base url of your WMS and configure the (WMS-)layers you want to show.
Optionally, you can also configure basic authentication. Be aware that an additional Microservice is required, if credentials are provided.
If you want to learn more about that topic, make sure to check out https://leafletjs.com/examples/wms/wms.html and get in contact with me (hendrik.naether@softwareag.com).

- Specify a color for a marker
Style your markers do that they are distinct of markers from other layers!
 ![](/docs/color-marker-config.png)
 Markers now also have an outline to see better where markers overlap. Not supported for WMS and Alarm Layer. 
 Alarm layer will have a color configuration per Alarm-Severity in the future.

- Configure polling interval per layer
You can now decide if the layer needs a frequent update polling or not.
![](/docs/layer-polling-config.png)


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

## Useful query samples
Filter for all assets having a position and type test
`$filter=(has(c8y_Position) and type eq 'test')`

Filter for all assets having a position and belonging to group with id 123456
`$filter=(has(c8y_Position) and bygroupid(123456))`

Filter for all assets having a position and at least one active alarm
`$filter=(has(c8y_Position) and ((c8y_ActiveAlarmsStatus.minor gt 0) or (c8y_ActiveAlarmsStatus.major gt 0) or (c8y_ActiveAlarmsStatus.warning gt 0) or (c8y_ActiveAlarmsStatus.critical gt 0))`

Filter for all assets having a position and being connected and active
`$filter=(has(c8y_Position) and c8y_Connection.status eq 'CONNECTED' and c8y_Availability.status eq 'AVAILABLE')`

## Bugs and mitigations
- The color picker click action is unprecise. Mitigation: Just click on the color label this always opens the color selector.
- The Icon picker won't load properly. Mitigation: You can still input the icon name. Check out https://styleguide.cumulocity.com/apps/codex/#/icons/icons/overview and just copy paste the icon name into the field.


## Features to come
- pick color for specific alarm severities (AlarmQueryLayer)
- latest value queries, (e.g. only show devices where latest event states that the machine is in a specific state)
- extra layer for drawings
- clustering of markers

## Plugin versions
v 3.0.x of the plugin uses:
Angular v 14.x
WebSDK v 1018.0.x
node v 16.x
npm v 8.x

v 2.x of the plugin uses:
Angular v 14.x
WebSDK v 1017.0.x
node v 14.x
npm v 6.x

v 1.x of the plugin uses:
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

> Note that the `--shell` flag creates a proxy to the cockpit application and provides` LayeredMapWidgetModule` as an `remote` via URL options.

Also deploying needs no special handling and can be simply done via `npm run deploy`. As soon as the application has exports it will be uploaded as a plugin.

## Useful links 

📘 Explore the Knowledge Base   
Dive into a wealth of Cumulocity IoT tutorials and articles in our [Tech Community Knowledge Base](https://tech.forums.softwareag.com/tags/c/knowledge-base/6/cumulocity-iot).  

💡 Get Expert Answers    
Stuck or just curious? Ask the Cumulocity IoT experts directly on our [Forum](https://tech.forums.softwareag.com/tags/c/forum/1/Cumulocity-IoT).   

🚀 Try Cumulocity IoT    
See Cumulocity IoT in action with a [Free Trial](https://techcommunity.softwareag.com/en_en/downloads.html).   

✍️ Share Your Feedback    
Your input drives our innovation. If you find a bug, please create an issue in the repository. If you’d like to share your ideas or feedback, please post them [here](https://tech.forums.softwareag.com/c/feedback/2). 

More to discover
* [Cumulocity IoT Web Development Tutorial - Part 1: Start your journey](https://tech.forums.softwareag.com/t/cumulocity-iot-web-development-tutorial-part-1-start-your-journey/259613)  
* [How to install a Microfrontend Plugin on a tenant and use it in an app?](https://tech.forums.softwareag.com/t/how-to-install-a-microfrontend-plugin-on-a-tenant-and-use-it-in-an-app/268981)  
* [The power of micro frontends – How to dynamically extend Cumulocity IoT Frontends](https://tech.forums.softwareag.com/t/the-power-of-micro-frontends-how-to-dynamically-extend-cumulocity-iot-frontends/266665)  
------------------------------
These tools are provided as-is and without warranty or support. They do not constitute part of the Software AG product suite. Users are free to use, fork and modify them, subject to the license agreement. While Software AG welcomes contributions, we cannot guarantee to include every contribution in the master project.

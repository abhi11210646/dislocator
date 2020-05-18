## Service Locator pattern - Deno

[Service Locator Design Pattern](https://en.wikipedia.org/wiki/Service_locator_pattern)

### Usage

##### Register services

```
// serviceLocator.ts

import ServiceLocator from "https://deno.land/x/dislocator/mod.ts";

const serviceLocator = new ServiceLocator();

serviceLocator.register("config", { key: "SECRET" });

serviceLocator.register("loadConfig", (serviceLocator: ServiceLocator) => {
  const config = serviceLocator.get("config");
  return () => {
    return `Loading credential for ${config.key}`;
  };
});
```
##### Use registerd services
```
// Otherfile.js
// import serviceLocator from serviceLocator.ts file

function loadconfiguration(serviceLocator: ServiceLocator) {
  const loadConfig = serviceLocator.get("loadConfig");
  console.log(loadConfig());
}
loadconfiguration(serviceLocator); // logs: Loading credential for SECRET

```

## Service Locator pattern - Deno

[Service Locator Design Pattern](https://en.wikipedia.org/wiki/Service_locator_pattern)

### Usage

##### Register services

```
// File: serviceLocator.ts

import ServiceLocator from "https://deno.land/x/dislocator/mod.ts";

const serviceLocator = new ServiceLocator();

serviceLocator.register("config", { key: "SECRET" }); // assign object to config key

serviceLocator.register("configService", (serviceLocator: ServiceLocator) => {
  const config = serviceLocator.get("config");
  return () => {
    return `Loading credential for ${config.key}`;   //assign function to configService key
  };
});

export default serviceLocator;
```
##### Use registered services
```
// File: Otherfile.ts
// import serviceLocator from serviceLocator.ts file

function loadconfiguration(serviceLocator: ServiceLocator) {
  const loadConfig = serviceLocator.get("configService");
  console.log(loadConfig());
}
loadconfiguration(serviceLocator); // logs: Loading credential for SECRET

```

#### Modularize Service registration
###### Register modules
```
// File: serviceLocator.ts

import ServiceLocator from "https://deno.land/x/dislocator/mod.ts";

const serviceLocator = new ServiceLocator();

serviceLocator.register('config', myConfigObject);
 
serviceLocator.use(require('./services/Services1'));
serviceLocator.use(require('./services/Services2'));

export default serviceLocator;

```
###### Services1
```
// File: services/Services1.ts

export default function myServiceProvider1(serviceLocator) {
  serviceLocator.register('myService1', () => {
    return {name:"service1"};
  });
};
```
###### Services2
```
// File: services/Services2.ts
// import Service from service.ts file
export default function myServiceProvider2(serviceLocator) {
  serviceLocator.register('myService2', () => {
    return {name:"service2"};
  });
   serviceLocator.register('myService21', () => { 
    return new Service(); // assign my service to myService21 key
  });
};

```


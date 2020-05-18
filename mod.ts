const nameWhitelist = new RegExp("^[a-z0-9]+$", "i");

export default class Dislocator {
  private registry: any = new Map();
  private instances: any = new Map();
  private loading: any[] = [];

  register(name: string, callback: any) {
    if (!nameWhitelist.test(name)) {
      throw new Error(`Invalid service name: "${name}"`);
    }
    if (this.isRegistered(name)) {
      throw new Error(`A service called "${name}" is already registered.`);
    }
    this.registry.set(name, callback);
    return this;
  }

  use(providerFn: Function) {
    providerFn(this);
    return this;
  }

  unregister(name: string) {
    if (!this.isRegistered(name)) {
      throw new Error(`No registration named "${name}"`);
    }
    this.registry.delete(name);
    this.instances.delete(name);
    return this;
  }

  isRegistered(name: string) {
    return !!this.registry.get(name);
  }

  get(name: string) {
    if (this.loading.indexOf(name) !== -1) {
      const chain = this.loading.reduce((str: string, name: string) =>
        `${str} -> ${name}`
      );
      throw new Error(`Circular dependency detected (${chain} -> ${name})`);
    }

    this.loading.push(name);

    if (!this.isRegistered(name)) {
      throw new Error(`No registration named "${name}"`);
    }

    if (!(this.instances.has(name))) {
      if (typeof this.registry.get(name) === "function") {
        this.instances.set(name, this.registry.get(name)(this));
      } else {
        this.instances.set(name, this.registry.get(name));
      }
    }

    this.loading.pop();

    return this.instances.get(name);
  }
}

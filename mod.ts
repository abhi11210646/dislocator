const nameWhitelist = new RegExp("^[a-z0-9]+$", "i");

export default class Dislocator {
  _registry: any = new Map();
  _instances: any = new Map();
  _loading: any[] = [];

  register(name: string, callback: any) {
    if (!nameWhitelist.test(name)) {
      throw new Error(`Invalid service name: "${name}"`);
    }
    if (this.isRegistered(name)) {
      throw new Error(`A service called "${name}" is already registered.`);
    }
    this._registry.set(name, callback);
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
    this._registry.delete(name);
    this._instances.delete(name);
    return this;
  }

  isRegistered(name: string) {
    return !!this._registry.get(name);
  }

  get(name: string) {
    if (this._loading.indexOf(name) !== -1) {
      const chain = this._loading.reduce((str: string, name: string) =>
        `${str} -> ${name}`
      );
      throw new Error(`Circular dependency detected (${chain} -> ${name})`);
    }

    this._loading.push(name);

    if (!this.isRegistered(name)) {
      throw new Error(`No registration named "${name}"`);
    }

    if (!(this._instances.has(name))) {
      if (typeof this._registry.get(name) === "function") {
        this._instances.set(name, this._registry.get(name)(this));
      } else {
        this._instances.set(name, this._registry.get(name));
      }
    }

    this._loading.pop();

    return this._instances.get(name);
  }
}

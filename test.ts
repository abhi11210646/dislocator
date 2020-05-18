import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import ServiceLocator from "./mod.ts";

Deno.test("[register]: Service registered successfully", () => {
  const serviceLocator = new ServiceLocator();
  serviceLocator.register("config", { key: "SECRET" });
  assertEquals(serviceLocator.get("config").key, "SECRET");
});

Deno.test("[unregister]: Service unregistered successfully", () => {
  const serviceLocator = new ServiceLocator();
  serviceLocator.register("config", { key: "SECRET" });
  serviceLocator.unregister("config");
  assertEquals(serviceLocator.isRegistered("config"), false);
});
Deno.test("[unregister]: Throw error if service not registered", () => {
  const serviceLocator = new ServiceLocator();
  assertThrows((): void => {
    serviceLocator.unregister("config");
  });
});

Deno.test("[register]: Duplicate Service Failed to register", () => {
  const serviceLocator = new ServiceLocator();
  assertThrows((): void => {
    serviceLocator.register("config", { key: "SECRET" });
    serviceLocator.register("config", { key: "SECRET2" });
  });
});

Deno.test("[get]: Throw error if service not registered", () => {
  const serviceLocator = new ServiceLocator();
  assertThrows((): void => {
    serviceLocator.get("config");
  });
});
Deno.test("[register]: Throw error if service name is not valid", () => {
  const serviceLocator = new ServiceLocator();
  assertThrows((): void => {
    serviceLocator.register("con-fig", {});
  });
});

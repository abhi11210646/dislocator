import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import ServiceLocator from "./mod.ts";
const serviceLocator = new ServiceLocator();

Deno.test("Service registered successfully", () => {
  serviceLocator.register("config", { key: "SECRET" }); 
  assertEquals(serviceLocator.get("config").key, "SECRET");
});

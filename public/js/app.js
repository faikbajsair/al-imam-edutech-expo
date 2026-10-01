/**
 * Al-Imam EduTech Virtual Expo - Application Entry Point
 * app.js - Initializes MVC components (Model, View, Controller)
 */

import { ProductModel } from "./models/ProductModel.js";
import { ExpoView } from "./views/ExpoView.js";
import { ExpoController } from "./controllers/ExpoController.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Model
  const model = new ProductModel();

  // 2. Initialize View
  const view = new ExpoView();

  // 3. Initialize Controller
  const controller = new ExpoController(model, view);

  // 4. Boot Application
  controller.init();

  console.info("✨ Al-Imam EduTech Virtual Expo Initialized Successfully in MVC Architecture.");
});

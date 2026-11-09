import { createGameLayout } from './UI/game/layout.js';
import { createSettingsLayout } from './UI/settings/layout.js';

const main = document.querySelector('main');

if (main) {
  main.append(createSettingsLayout());
  main.append(createGameLayout());
}

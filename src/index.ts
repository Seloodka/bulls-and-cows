import { createSettingsLayout } from './UI/settings/layout.js';

const main = document.querySelector('main');

if (main) {
  main.append(createSettingsLayout());
}

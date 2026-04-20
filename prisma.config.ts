import { defineConfig } from '@prisma/config';

const config = defineConfig({
  datasource: {
    url: 'file:./prisma/dev.db',
  },
});

export default config; // Ensure this line is exactly like this
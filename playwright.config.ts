import {defineConfig,devices} from "@playwright/test";
export default defineConfig({testDir:"./tests/browser",fullyParallel:false,workers:1,reporter:[["list"],["html",{open:"never"}]],use:{baseURL:process.env.TEST_BASE_URL||"http://127.0.0.1:3000",trace:"retain-on-failure"},projects:[{name:"desktop",use:{...devices["Desktop Chrome"],channel:process.env.PLAYWRIGHT_CHANNEL||"msedge"}}]});

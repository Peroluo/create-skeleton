const ppteer = require('@all-in-js/fast-install-puppeteer');
const { log } = require('./utils');

const devices = {
  mobile: [
    375,
    667,
    'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
  ],
  ipad: [
    768,
    1024,
    'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
  ],
  pc: [
    1000,
    1200,
    'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
  ],
};

async function pp({ device = 'mobile' }) {
  const browser = await ppteer.launch({ headless: true });

  async function openPage(url) {
    const page = await browser.newPage();
    try {
      let deviceSet = devices[device];
      page.setUserAgent(deviceSet[2]);
      page.setViewport({ width: deviceSet[0], height: deviceSet[1] });

      await page.goto(url, {
        timeout: 2 * 60 * 1000,
        waitUntil: 'networkidle0',
      });
      await page.waitFor(1000);
    } catch (e) {
      console.log('\n');
      log.error(e.message);
    }
    return page;
  }
  return {
    browser,
    openPage,
  };
}

module.exports = pp;

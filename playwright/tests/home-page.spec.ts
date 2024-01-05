import { test, expect } from '@playwright/test';

test.use({
  storageState: 'auth.json'
});

test('test', async ({ page }) => {
  await page.goto('https://minisass.sta.do.kartoza.com/#/');
  await expect(page.getByRole('img', { name: 'minisasstextOne' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'minisasslogoOne' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Home' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'intrestedcitize' })).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^Explore the map$/ }).first()).toBeVisible();
  await expect(page.getByRole('img', { name: 'bxmapalt' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'crab_placeholder' }).first()).toBeVisible();
  await expect(page.getByText('Explore the map')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^How to do miniSASS$/ }).first()).toBeVisible();
  await expect(page.getByRole('img', { name: 'bxbookreader' })).toBeVisible();
  await expect(page.getByText('How to do miniSASS')).toBeVisible();
  await expect(page.getByRole('img', { name: 'crab_placeholder' }).nth(1)).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^Submit results$/ }).first()).toBeVisible();
  await expect(page.getByRole('img', { name: 'crab_placeholder' }).nth(2)).toBeVisible();
  await expect(page.getByRole('img', { name: 'bxbong' })).toBeVisible();
  await expect(page.getByText('Submit results')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^Resources;$/ }).first()).toBeVisible();
  await expect(page.getByRole('img', { name: 'bxclouddownload' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Resources' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'crab_placeholder' }).nth(3)).toBeVisible();
  await expect(page.locator('#root')).toContainText('What is miniSASS?');
  await expect(page.frameLocator('iframe[title="miniSASS"]').locator('.ytp-cued-thumbnail-overlay-image')).toBeVisible();
  await expect(page.locator('#root')).toContainText('Recent Observations');
  await expect(page.getByText('losothoUsername: KetanBOrganisation: KartozaDate added: 27 December 2023view detailsScore:')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^6\.00$/ }).locator('path').nth(1)).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^9\.50$/ }).locator('[data-test-id="CircularProgressbar"]')).toBeVisible();
  await expect(page.getByText('Touch and goUsername: kartoza_adminOrganisation: test_organisationDate added: 20 December 2023view detailsScore:')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^0\.00$/ }).locator('[data-test-id="CircularProgressbar"]')).toBeVisible();
  await expect(page.getByText('Amy test 5Username: kartoza_adminOrganisation: test_organisationDate added: 18 December 2023view detailsScore:')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^3\.33$/ }).locator('[data-test-id="CircularProgressbar"]')).toBeVisible();
  await expect(page.locator('div:nth-child(4) > .bg-blue-900')).toBeVisible();
  await expect(page.locator('#root')).toContainText('miniSASS Map');
  await expect(page.getByRole('img', { name: 'rectangleSix' })).toBeVisible();
  await expect(page.locator('#root')).toContainText('See the map');
  await expect(page.getByRole('link', { name: 'Ground Truth' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Unicef' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'CGIAR' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'IWMI' })).toBeVisible();
  await expect(page.locator('footer > div > div:nth-child(2)')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Water Research Commission' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Amazon' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Wildlife and Environment' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Kartoza' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'minisasstextLogo' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'How to' })).toBeVisible();
  await expect(page.getByRole('list').getByText('Map')).toBeVisible();
  await expect(page.locator('a').filter({ hasText: 'Contact us' })).toBeVisible();
  await expect(page.getByText('How toMapContact us© 2023')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Download miniSASS App' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'formkitwordpres', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'riyoutubefill', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'icbaselinefaceb', exact: true })).toBeVisible();
});
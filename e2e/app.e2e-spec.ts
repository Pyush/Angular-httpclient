import { AngularHttpclientPage } from './app.po';

describe('angular-httpclient App', () => {
  let page: AngularHttpclientPage;

  beforeEach(() => {
    page = new AngularHttpclientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

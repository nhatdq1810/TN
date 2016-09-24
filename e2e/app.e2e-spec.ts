import { TNPage } from './app.po';

describe('tn App', function() {
  let page: TNPage;

  beforeEach(() => {
    page = new TNPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

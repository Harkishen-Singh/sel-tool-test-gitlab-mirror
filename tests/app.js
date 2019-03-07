const webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    By = webdriver.By,
    logging = webdriver.logging,
    domains = require('./domains'),
    assert = require('assert'),
    firefox = require('selenium-webdriver/firefox');
    { describe, it, after, before } require('selenium-webdriver/testing')
require('chromedriver');
require('geckodriver');
// var domainsName = domains;

var options = new chrome.Options();
options.addArguments("headless");
options.addArguments("--no-sandbox");
options.addArguments("--load-extension=../../../Aossie/MindTheWord_downloads_opts/MindTheWord_opts/dist/");

var optionsFireFox = new firefox.Options();
optionsFireFox.addArguments("--headless");
optionsFireFox.addArguments("--no-sandbox");
optionsFireFox.addArguments("--enable-addon-debugging");
optionsFireFox.addArguments("--load-extension=../../../Aossie/MindTheWord_downloads_opts/MindTheWord_opts/dist/manifest.json");

let driver;

describe('Test Execution in Chrome Environments', function() {
    this.timeout(70000);

    describe('Creating browser instances', () => {
        it('launching chrome instance', (done) => {
            driver = new webdriver.Builder().setChromeOptions(options).forBrowser('chrome').build();
            driver.then(() => {
                done();
            });
            // driver.manage().logs()
        });
    });

    describe('Google Home Page tests', function() {
        this.timeout(20000);

        it('Opening google.co.in page in headless browser', (done) => {
            driver.get('http://www.google.co.in').then(() => {
                // var logs = driver.manage().logs().get("browser");
                // console.warn("logs below")
                // logs.then(res => {
                //     console.warn(logs)
                // })
                console.warn('console below')
                // console.warn(
                    // driver.manage().logs().get(logging.Type.BROWSER).then(er => {
                    //     console.log(er)
                    // })
                    // )
                console.warn('Something return statements');
                driver.executeScript('console.log("Hi")').then((returnedVals) => {
                    console.warn(returnedVals);
                });
                done();
            });
        });

        it('Quering Search words', function(done){
            driver.findElements(By.xpath('//*[@id="tsf"]/div[2]/div/div[1]/div/div[1]/input')).then(r => {
                r[0].sendKeys('harkishensingh github')
                assert.notEqual(r.length, 0, "received result does not exist");
                done();
            });
        });

        it('Post Query / results', (done) => {
            driver.findElement(By.xpath('//*[@id="tsf"]/div[2]/div/div[3]/center/input[1]')).click().then(rr => {
                driver.sleep(5000);
                driver.findElement(By.className('LC20lb')).then(elements => {
                    // driver.quit();
                    done();
                });
            });
        });
    });

    describe('Preparing Extension', () => {
        this.timeout(40000);

        let extensionID;
        it('Opening Extensions Page', (done) => {
            //open extension
            driver.get('chrome-extension://kfebdlhdaacofncoeiklbbcoiocpbgfd/views/options.html').then(() => {
            done();
            driver.quit();
            })
            // driver.get('chrome-extension://<the extension identity>/views/options.html');

        })
    });
});

describe('Test Execution in Firefox Environments', function() {
    this.timeout(70000);

    describe('Creating browser instances', () => {
        it('launching firefox instance', (done) => {
            driver = new webdriver.Builder().setFirefoxOptions(optionsFireFox).forBrowser('firefox').build();
            driver.then(() => {
                done();
            });
        });
    });

    describe('Google Home Page tests', function() {
        this.timeout(20000);

        it('Opening google.co.in page in headless browser', (done) => {
            driver.get('http://www.google.co.in').then(() => {
                done();
            });
        });

        it('Quering Search words', function(done){
            driver.findElements(By.xpath('//*[@id="tsf"]/div[2]/div/div[1]/div/div[1]/input')).then(r => {
                r[0].sendKeys('harkishensingh github')
                assert.notEqual(r.length, 0, "received result does not exist");
                done();
            });
        });

        it('Post Query / results', (done) => {
            driver.findElement(By.xpath('//*[@id="tsf"]/div[2]/div/div[3]/center/input[1]')).click().then(rr => {
                driver.sleep(5000);
                driver.findElement(By.className('LC20lb')).then(elements => {
                    // driver.quit();
                    done();
                });
            });
        });
    });
});


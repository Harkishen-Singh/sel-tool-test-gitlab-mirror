const webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    actionSequence = webdriver.ActionSequence,
    key = require('selenium-webdriver').Key,
    By = webdriver.By,
    logging = webdriver.logging,
    domains = require('./domains'),
    assert = require('assert'),
    yandex_api_key = process.env.yandex_key,
    firefox = require('selenium-webdriver/firefox');
    { describe, it, after, before } require('selenium-webdriver/testing')
require('chromedriver');
require('geckodriver');
// var domainsName = domains;

const { exec } = require('child_process');
const cmd = `
    cd $HOME/.config/google-chrome/Default/
`;

// const webExtensionsGeckoDriver = require('webextensions-geckodriver');
// const webExtension = webExtensionsGeckoDriver('../dist/manifest.json');

var options = new chrome.Options();
options.addArguments("--headless");
options.addArguments("--no-sandbox");
options.addArguments("--disable-dev-shm-usage");
options.addArguments("--disable-gpu");
// options.addArguments("--app-id=kfebdlhdaacofncoeiklbbcoiocpbgfd");
options.addArguments("--load-extension=../dist/");

var optionsFireFox = new firefox.Options();
optionsFireFox.addArguments("--headless");
optionsFireFox.addArguments("--no-sandbox");
optionsFireFox.addArguments("--enable-addon-debugging");

let driver;

describe('Test Execution in Chrome Environments', function() {
    this.timeout(70000);

    describe('Creating browser instances', () => {
        it('launching chrome instance', (done) => {
            driver = new webdriver.Builder().setChromeOptions(options).forBrowser('chrome').build();
            driver.then(() => {
                console.warn('yandexkey is '+yandex_api_key);
                done();
            });
            // driver.manage().logs()
        });
    });

    // describe('Google Home Page tests', function() {
    //     this.timeout(20000);

    //     it('Opening google.co.in page in headless browser', (done) => {
    //         driver.get('https://www.google.com').then(() => {
    //             done();
    //         });
    //     });

    //     it('Quering Search words', function(done){
    //         driver.findElements(By.xpath('//*[@id="tsf"]/div[2]/div/div[1]/div/div[1]/input')).then(r => {
    //             console.log('before send keys');
    //             r[0].sendKeys('harkishensingh github');
    //             console.log('after send keys');
    //             assert.notEqual(r.length, 0, "received result does not exist");
    //             done();
    //         });
    //     });

    //     it('Post Query / results', (done) => {
    //         driver.findElement(By.xpath('//*[@id="tsf"]/div[2]/div/div[3]/center/input[1]')).click().then(rr => {
    //             driver.sleep(5000);
    //             driver.findElement(By.className('LC20lb')).then(elements => {
    //                 // driver.quit();
    //                 done();
    //             });
    //         });
    //     });
    // });

    describe('Preparing Extension', function() {
        this.timeout(40000);

        let extensionID;
        it('Opening Extensions Page', function(done) {
            //open extension
            driver.get('chrome-extension://fdokjffohfedmcnnoooamebpaobmblmf/views/options.html').then(() => {
                done();
            })
        });

        describe('Bootstrap Touring', function() {
            this.timeout(30000);

            it('Welcome screen', function(done) {
                driver.findElement(By.xpath('//*[@id="step-0"]/div[3]/div/button[2]')).click().then((e) => {
                    done();
                });
            });

            it('Translation Setting Tab', function(done) {
                setTimeout(() => {
                    driver.findElement(By.xpath('//*[@id="step-1"]/div[3]/div/button[2]')).click().then((e) => {
                        done();
                    });
                }, 500);
            });

            it('Setting up Translator Keys', function(done) {
                setTimeout(() => {
                    driver.findElement(By.xpath('//*[@id="step-2"]/div[3]/div/button[2]')).click().then((e) => {
                        done();
                    });
                }, 500);
            });

            it('Creating a new language pattern', function(done) {
                setTimeout(() => {
                    driver.findElement(By.xpath('//*[@id="step-3"]/div[3]/div/button[2]')).click().then((e) => {
                        done();
                    });
                }, 500);
            });

            it('Managing language patterns', function(done) {
                setTimeout(() => {
                    driver.findElement(By.xpath('//*[@id="step-4"]/div[3]/button')).click().then((e) => {
                        done();
                    });
                }, 500);
            });
        });
    });

    describe('Translation Pattern Operations', function() {
        this.timeout(20000);

        it('Create Yandex, Azure, Google Keys', function(done) {

            // generate random keys
            let yandexKey = 'randomyandexkeytest',
                azureKey = 'randomazurekeytest',
                googleKey = 'randomgooglekeytest';

            driver.findElement(By.xpath('//*[@id="translator-keys"]/div[2]/div[1]/input')).then(field => {
                field.sendKeys(yandexKey);
                driver.findElement(By.xpath('//*[@id="translator-keys"]/div[2]/div[2]/input')).then(field2 => {
                    field2.sendKeys(azureKey);
                    driver.findElement(By.xpath('//*[@id="translator-keys"]/div[2]/div[3]/input')).then(field3 => {
                        field3.sendKeys(googleKey);
                        done();
                    });
                });
            });
        });

        it('Creating translation patterns', function(done) {
            driver.manage().window().maximize();
            driver.findElement(By.xpath('//*[@id="translator"]')).sendKeys('Yandex').then(() => {
                driver.findElement(By.xpath('//*[@id="percentage"]')).sendKeys('70').then(() => {
                    driver.findElement(By.xpath('//*[@id="srcLang"]')).sendKeys('English').then(() => {
                        driver.findElement(By.xpath('//*[@id="targetLang"]')).sendKeys('Hindi').then(() => {
                            // driver.wait(() => {
                                driver.findElement(By.xpath('//*[@id="createPatterns"]')).click().then(() => {
                                    done();
                                });
                            // }, 2000);
                        });
                    });
                });
            });
        });
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

        // let geckodriver2 = webExtension.geckodriver;
        // use geckodriver for loading pages. using driver for loading will again use chrome only. refer to 
        // https://www.npmjs.com/package/webextensions-geckodriver#example
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


/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        //test to make sure that th allFeeds variable has been defined
        //and is not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //test that loops through each feed in the allFeeds object
        //and ensures it has a URL defined and that the URL is not empty
        it('feed had a URL defined and is not empty', function() {
            allFeeds.forEach((index) => {
                expect(index.url).toBeDefined();
                expect(index.url).not.toBe(0);
            })
        })

         //test that loops through each feed in the allFeeds object
         //and ensures it has a name defined and that the name is not empty
        it('feed has a name defined and is not empty', function() {
            allFeeds.forEach((index) => {
                expect(index.name).toBeDefined();
                expect(index.name).not.toBe(0);
            })
        })
    });

    describe('The menu', function() {
        //test to check if the menu is hidden by default
        it('Menu is hidden by default', function() {
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });

        //test to ensure the menu changes visibility when the menu icon is clicked
        it('Menu displays/hides on click', function() {
            const menu = document.querySelector('.menu-icon-link');
            //perform a click
            menu.click();
            //expects to be visible
            expect(document.body.classList.contains('menu-hidden')).toBe(false);
            menu.click();
            //expects to be hidden
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        })
    })

    describe('Initial Entries', function() {
        //deal with asynchronous functionality
        beforeEach(function(done) {
            loadFeed(0, () => {
                done();
            });
        });

        //test to make sure that there is at least a single .entry element
        //within the .feed container
        it('.feed container has at least one .entry element', function(done) {
            const entriesArr = document.querySelector('.feed').getElementsByClassName('entry');
            expect(entriesArr.length >= 1).toBeTruthy();
            done();
        })
    })


    describe('New Feed Selection', function() {
        let previousFeed, newFeed;
        //deal with asynchronous functionality
        beforeEach(function(done) {
            loadFeed(0, () => {
                previousFeed = document.querySelector('.feed').innerHTML;
                loadFeed(1, () => {
                    newFeed = document.querySelector('.feed').innerHTML;
                    done();
                })
            });
        });

        //test to ensure that the feed content actually changes
        it('new feed is loaded', function(done) {
            expect(newFeed).not.toBe(previousFeed);
            done();
        })

    })
}());

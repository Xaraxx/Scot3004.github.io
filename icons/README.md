
    Install cli-real-favicon:

    npm install -g cli-real-favicon

    Create a file named faviconDescription.json and populate it with:
    In the code above, replace TODO: Path to your master picture with the path of your master picture. For example, assets/images/master_picture.png.
    Generate your icons:

    mkdir outputDir
    real-favicon generate faviconDescription.json faviconData.json outputDir

    Inject the HTML code in your pages:

    real-favicon inject faviconData.json outputDir htmlFiles/*.html

    Check for updates (to be run from time to time, ideally by your continuous integration system):

    real-favicon check-for-update --fail-on-update faviconData.json


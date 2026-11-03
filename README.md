This project for automation testing using playwright for CURA Health Service and still need improve for any module but for this time I wanna share for 3 module, that is Login, Logout and Make Appoinment. This testing adopted *Data-Driven Testing* methode using file input CSV and *Page Object Model (POM)*.

# Main Feature
* Page Object Model (POM)
* Data-Driven Testing (CSV Input): Running scenarios using dynamic data from file CSV.
* Smart Date Handling: Using manipulation texting (`pressSequentially`) for date component.

# Steps Instalation
    1. Prasyarat
        - Node.js(https://nodejs.org) (Versi 16 or latest)
        - Text Editor [Visual Studio Code]
    2. Inisiation Project & Install Playwright
        - npm init playwright@latest
        - Language: `TypeScript` or `JavaScript`
        - Where to put your end-to-end tests?: press enter (`tests`)
        - Add a GitHub Actions workflow?: Choose `false` (or `true` if need)
        - Install Playwright browsers?: Choose `true` (Y/Enter)

# Structur Folder Project
healthcura
├── locators/
│   └── makeAppointmentLocators.js  
|   └── loginlogout.js  
├── pages/
│   └── loginpage.js  
│   └── logoutpage.js  
│   └── makeappoinmentpage.js          
├── data/
│   └── makeappoinment.csv
│   └── user.csv        
├── tests/
│   └── login.spec.js
│   └── logout.spec.js
│   └── makeappointment.spec.js  
├── screenshoots/
│   └── login
│   └── logout
│   └── make-appointment       
├── playwright.config.js  
├── package-lock.json
├── package.json            
└── README.md                      

# Execute Syntax
    1. Headless
        - npx playwright test

    2. Headed
        - npx playwright test tests/login.spec.js --headed

    3. HTML Report
        - npx playwright show-report
        
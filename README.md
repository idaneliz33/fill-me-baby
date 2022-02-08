# Fill me baby
Automated script to fill missing hours in Hilanet hours reporting system by Cypress.io tool.

#### Pre conditions:
- Node js 14+ 
- npm 8+ 

#### Instructions:

1. Clone this repo  to your local machine
2. Use `npm i` to install project deps
3. Create local secrets file that called `.env` in the root location for your personal credentials
4. Inside `.env` insert the env vars below:
    ```
    USER_ID={{YOUR USER ID}}
    PASSWORD={{YOUR PASSWORD}}
    ```
5. In your terminal use `npm run fill-me-baby` to fill your missing hours.

    You can also use `npm run fill-me-baby:open` to see the automated script running in the browser by Cypress runner tool.
    
The defaults hours are 9:00 - 18:00, to change this value edit the `startHour` and `endHour` inside `cypress.json` configuration file in the root location.

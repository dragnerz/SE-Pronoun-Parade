# Pronoun Parade Widget
StreamElements widget for a Pronoun Parade Redemption

written by Ky/dragnerz

This is a widget that causes chat messages containing pronouns sent in Twitch chat to float up the screen for some amount of time. It is tied to a channel point redemption of your choosing (just enter the name of the redemption).

There are also !paradeon and !paradeoff commands for testing or if you want to manually control it!

## Instructions
1. Create a new overlay on StreamElements
2. Create a Custom Widget (under Static/Custom)
3. Copy/Paste the code blocks found below for HTML, CSS, JS, and JSON/Fields code in their respective tabs (replacing anything there by default)

## ComfyJS Setup
This widget requires the use of ComfyJS in order to connect to Twitch Chat and read redemptions. The main requirement is that you need to generate an OUATH key, but to obtain this, you will need to create an app in the Twitch Developers website.

### STEP-BY-STEP:
1. Go to this website and log in (this is an official Twitch website): https://dev.twitch.tv/
2. Go to "Your Console" at the top right
3. Click "Register Your Application"
4. Name the application however you wish
5. Enter this address under OAuth Redirect URLs: https://twitchapps.com/tokengen/
6. Choose "Chat Bot" for Category, and click Create
7. Click "Manage" to enter your app
8. Copy the Client ID string
9. Go to https://twitchapps.com/tokengen/ and enter your Client ID in the first box
10. Enter this under "Scopes": channel:manage:redemptions channel:read:redemptions user:read:email chat:edit chat:read
11. Press Connect. You will be given an OAuth key
12. Paste the OAuth key in the Pronoun Parade Widget settings (under OAuth Key), and enter your channel name, and the channel redemption you want this tied to.
You're done! This should now be connected!

NOTE: 
Every few months Twitch will require re-authorization of these keys. If the bot stops working after some time, you likely need to repeat this process


READ COMFYJS DOCUMENTATION HERE:
https://github.com/instafluff/ComfyJS#channel-point-reward-redemptions
